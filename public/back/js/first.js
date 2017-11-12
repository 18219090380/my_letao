/**
 * Created by Administrator on 2017/11/11.
 */

$(function(){


    //功能一:发送ajax请求,发送数据,模板绑定渲染
    var currentPage = 1;//记录当前页
    var pageSize = 5;//当前页数的数量
    $.ajax({
        url:'/category/queryTopCategoryPaging',
        type:'get',
        data:{
            page:currentPage,
            pageSize:pageSize,
        },
        success: function (data) {
            //console.log(data);
            //2.2绑定模板
            var html = template('tml',data);
            $(".lt_content tbody").html(html);

            //2.3数据分页(调用插件)
            $('.pagination').bootstrapPaginator({
                //2.4指定版本
                bootstrapMajorVersion:3,
                //2.5指定当前页(第一页)
                currentPage:currentPage,
                //2.6指定总页数
                totalPages:Math.ceil(data.total/pageSize),
                //2.7调用方法:分页插件中,点击某一个,获取当前点击的页面
                onPageClicked: function (a,b,c,page) {
                    //2.8获取当前点击的页码,重新在获取当前的页码该显示的数据(把当前的page赋值给currentPage,作为第二页)
                    currentPage = page;
                    //2.9重新发送ajax请求(显示当前点击页码的数,---->模板自动计算从id为6开始)
                    $.ajax({
                        url:'/category/queryTopCategoryPaging',
                        type:'get',
                        data:{
                            page:currentPage,
                            pageSize:pageSize,
                        },
                        success: function (data) {
                            //3.0绑定模板,重新计算获取的数据重新渲染
                            var html = template('tml',data);
                            $(".lt_content tbody").html(html);
                        }
                    })
                }
            })
        }
    })

    //功能二:弹出分类框
    $('#addBtn').on('click',function(){
        //弹出一级分类框
        $('#first_page').modal('show');
    });

    //功能三:弹出分类框之后,给确定按钮设置点击事件,发送ajax请求(弹出分类框之后,进行表单校验-->直接触发校验成功和点击事件)
    //3.1进行表单校验(校验文本框不能为空),校验成功,触发校验成功事件
    $('#first_xiaoyan').bootstrapValidator({
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        /*设置校验属性*/
        fields:{
            //需要校验那个表单name属性名
            categoryName:{
                validators: {
                    notEmpty: {
                        message: '一级分类名称不能为空'
                    }
                }
            }
        }
    })
    //    .on('success.form.bv', function (e) {
    //    console.log('aa');
    //    //3.2阻止默认行为
    //    e.preventDefault();
    //    //3.3发送ajax请求
    //    //3.1获取当前本文框的值
    //    var firstVal = $("#exampleInputEmail3").val();
    //    $.ajax({
    //        url:"/category/addTopCategory",
    //        type:'post',
    //        data:{
    //            categoryName:firstVal,
    //        },
    //        success: function (data) {
    //            console.log(data);
    //            //3.2如果发送成功,那么就自动刷新页面(重新发送ajax---功能二,渲染页面)
    //            if(data.success){
    //                //3.3关闭一级分类模态框
    //                $('#first_page').modal('hide');
    //                //3.5清除 文本框内容
    //                $("#exampleInputEmail3").val('');
    //                //3.4重新渲染页面,发送ajax请求 ,重新获取数据
    //                render();
    //            }
    //        }
    //    })
    //})

    //功能方法二:
    $('.modal-footer .btn_confirm').on('click',function(){
        //3.1获取当前本文框的值
        var firstVal = $("#exampleInputEmail3").val();
        $.ajax({
            url:"/category/addTopCategory",
            type:'post',
            data:{
                categoryName:firstVal,
            },
            success: function (data) {
                //console.log(data);
                //3.2如果发送成功,那么就自动刷新页面(重新发送ajax---功能二,渲染页面)
                if(data.success){
                    //3.3关闭一级分类模态框
                    $('#first_page').modal('hide');
                    //3.5清除 文本框内容
                    $("#exampleInputEmail3").val('');
                    //3.4重新渲染页面,发送ajax请求 ,重新获取数据
                    render();
                }
            }
        })
    });


    //ajax刷新页面 ,发送数据请求函数封装
    function render(){
        $.ajax({
            url:'/category/queryTopCategoryPaging',
            type:'get',
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            success: function (data) {
                //绑定模板
                var html = template('tml',data);
                $(".lt_content tbody").html(html);
            }
        })
    }

});

