/**
 * Created by Administrator on 2017/11/10.
 */

$(function(){
    //功能一:一加载页面,直接发送ajax请求,获取数据,渲染到页面

    //1.定义一个变量,记录当前第一页
    var currentPage = 1;
    var pageSize = 5;
    //1.发送ajax请求,获取数据
    $.ajax({
        url:"/user/queryUser",
        type:"get",
        data:{
            page:currentPage,
            pageSize:pageSize,
        },
        success: function (data) {
            //console.log(data);
            //2.数据与模板绑定
            var html = template('tpl',data);
            //3.把模板追加到tbody结构中
            $('tbody').html(html);

            //4.数据回来之后,鼠标点击按钮,发送ajax请求

            //5.显示模态框
            //$('#btn_logoutModal').modal('show');

            //功能二:分页插件(根据获取回来的数据进行分页处理)
            $('#paginator').bootstrapPaginator({
                //2.1指定版本
                bootstrapMajorVersion:3,
                //2.2指定当前页(第一页)
                currentPage:currentPage,
                //2.3指定总页数(根据总数据除以每一页的数据来计算当前显示的总页数)
                totalPages:Math.ceil(data.total/pageSize),
                //2.4分页插件中,点击某一个,获取当前点击的页数
                onPageClicked: function (a,b,c,page) {
                    //2.5当进行点击之后,page表示当前点击的页码,那么修改当前页(2)
                    currentPage  = page;//(可以在当前显示第二页,5条数据)
                    //2.6重新渲染数据
                    $.ajax({
                        url:"/user/queryUser",
                        type:"get",
                        data:{
                            page:currentPage,
                            pageSize:pageSize,
                        },
                        success: function (data) {
                            //console.log(data);
                            //2.数据与模板绑定
                            var html = template('tpl',data);
                            //3.把模板追加到tbody结构中
                            $('tbody').html(html);
                        }
                    })
                }
            })
        }
    })


    //功能二:使用事件委托,给禁用启用按钮注入点击事件(弹出模态框)
    $('tbody').on('click','.btn',function(){
        //2.1弹出模态框(弹出看插件用法)
        $("#btn_logoutModal").modal('show');
        //2.2通过确定发送ajax请求(防止确定按钮默认提交)

        //2.3获取当前在点击这栏的数据id,还有状态,那么,就要在上一次生成数据的时候,保存一下数据
        var dataId = $(this).data('id');
        console.log(dataId);
        var isDelete = $(this).data("delete");
        console.log(isDelete);

        //2.4给确定按钮绑定点击事件
        $(".btn_confirm").on('click', function () {
            $.ajax({
                url:"/user/updateUser",
                type:'post',
                data:{
                    id:dataId,
                    isDelete:isDelete
                },
                success:function(data){
                    //console.log(data);
                    if(data.success){
                        $("#btn_logoutModal").modal('hide');
                        //2.4如果是点击当前按钮成功(说明操作成功),那么,修改当前的状态(直接重新查询一次数据)
                        //1.定义一个变量,记录当前第一页
                        $.ajax({
                            url:"/user/queryUser",
                            type:"get",
                            data:{
                                page:currentPage,
                                pageSize:pageSize,
                            },
                            success: function (data) {
                                console.log(data);
                                //2.数据与模板绑定
                                var html = template('tpl',data);
                                //3.把模板追加到tbody结构中
                                $('tbody').html(html);
                            }

                        })
                    }
                }
            });
        })

    })


})