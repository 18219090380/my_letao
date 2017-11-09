/**
 * Created by Administrator on 2017/11/8.
 */
$(function() {

//一.需求:登录表单校验
    //1.1用户名不能为空
    //1.2密码不能为空
    //1.3密码长度为6-12位


    //1.获取表单元素
    var $form = $('.form-horizontal');
    //2.使用表单校验插件(初始化表单校验插件)
    $form.bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        // excluded: [':disabled', ':hidden', ':not(:visible)'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //3.1校验用户名，对应name表单的name属性
            username: {
                //3.2在这个对象中写所有的校验规则
                validators: {
                    //不能为空(在输入框下所要提示的内容)
                    notEmpty: {
                        message: '用户名不能为空'
                    },

                    //自定义一个普通校验
                    callback:{
                        message:'用户名错误'
                    },

                    ////长度校验
                    //stringLength: {
                    //    min: 6,
                    //    max: 12,
                    //    message: '用户名长度必须在6到30之间'
                    //},
                    //正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名由数字字母下划线和.组成'
                    }
                }
            },

            //3.3校验密码(对应name表单中的name属性名)
            password:{
                //3.4在这个密码表单中的方法下写所有的校验规则
                validators:{
                    //3.5校验密码不能为空
                    notEmpty:{
                        message:"密码不能为空"
                    },

                    //3.6自定义一个密码校验失败
                    callback:{
                        message:'密码错误'
                    },

                    //3.6校验密码长度为6-12位
                    stringLength:{
                        min:6,
                        max:12,
                        message:"密码长度是6-12位"
                    }
                }
            }
        }
    });

    //4.为了校验成功之后,不让表单自动提交过去,那么,可以在校验成功之后进行点击,防止提交表单(禁用);同时,
    //(不能用submit提交,因为这个要跳转,如果跳转了,页面返回,要重新再写,但是用ajax提交,如果不成功,那么,就一直待在这个页面)

    //5.给表单注册校验成功事件;由于表单校验成功之后,会触发一个事件(success.form.bv)--->点击提交,可以阻止默认行为(不能用retrun flase-->后面代码不能执行)
    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        //console.log('校验成功,点击之后,但页面不跳转,没提交表单数据,那么,可以用ajax提交');
        //使用ajax提交逻辑()
        //5.1获取表单中的用户名框中的值
        //var usernameVal = $("#username").val();
        //var passwordVal = $('#password').val();
        //console.log(usernameVal);
        //console.log(passwordVal);
        $.ajax({
            url:"/employee/employeeLogin",
            type:"post",
            //data:{
            //    username:usernameVal,
            //    password:passwordVal
            //},

            //通过表单.serialize()方法获取表单中的每一个值
            data:$form.serialize(),
            success:function(data){
                console.log(data.error);
                //console.log(data.success);
                //6.返回来的数据,如果是返回的是成功,那么就跳转到首页
                if(data.success){
                    window.location.href = "index.html";
                }
                if(data.error === 1000){
                    //7.如果提交返回的数据是1000,那么,就是用户名错误(由于该提示太过low)
                    //alert('用户名错误');
                    //8.使用updateStatus方法,主动把username这个字段变成校验失败(第一个参数:让谁提示)
                    var validator = $form.data('bootstrapValidator');
                    validator.updateStatus("username",'INVALID','callback');
                }
                if(data.error === 1001){
                    //7.如果提交返回的数据是1001,那么,就是用户名错误(由于该提示太过low)
                    //alert('密码错误');

                    //9..使用updateStatus方法,主动把password这个字段变成校验失败(第一个参数:让谁提示)
                    $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
                }
            }
        });
    });


    //二.需求:点击重置的时候,把当前的validator插件设置好的样式和图标清除掉
    //1.获取重置按钮
    var reset_btn = $(".reset_btn");
    //2.给重置按钮设置点击事件
    reset_btn.on("click",function(){
        //3.初始化表单校验插件(表单.方法),表单校验的validator实例
        var validator = $form.data('bootstrapValidator');
        //4.调用表单校验实例的方法(重置表单方法---把当前的图片和样式清除)
        validator.resetForm();
    })
})


