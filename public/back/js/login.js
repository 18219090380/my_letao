/**
 * Created by Administrator on 2017/11/8.
 */
$(function(){

//1.需求:登录表单校验
    //1.1用户名不能为空
    //1.2密码不能为空
    //1.3密码长度为6-12位

    //2.调用bootstrapValidator()方法初始化validator插件
    $("form").bootstrapValidator({
        //配置校验时的小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //规则:用户名和密码校验
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: 'The username is required'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: 'The password is required'
                    }
                }
            }
        }
    });
})


