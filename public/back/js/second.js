/**
 * Created by Administrator on 2017/11/12.
 */
$(function () {

    //功能一:页面一加载,发送ajax请求,获取数据,渲染页面
    //1.记录当前的页面
    var currentPage = 1;
    //2.记录获取每条数据量
    var pageSize = 5;
    //3.发送ajax请求,获取数据,渲染模板
    $.ajax({
        url:'/category/querySecondCategoryPaging',
        type:'get',
        data:{
            page:currentPage,
            pageSize:pageSize,
        },
        success: function (data) {
            //console.log(data);
            //4.绑定模板,把模板追加到页面中
            $('tbody').html(template('tpl',data));

            //功能二:分页渲染(分页插件bootstrapValidator)
            $('.pagination').bootstrapPaginator({
                bootstrapMajorVersion:3,//版本3.0
                currentPage:currentPage,//指定默认当前页
                totalPages:Math.ceil(data.total/data.size),//计算应该显示多少页数
                onPageClicked: function (a,b,c,page) {
                    //5.page指的是点击的页码,再重新发送ajax请求,重新渲染页面;把当前点击的页码作为传的参数
                    currentPage = page;
                    //6.发送ajax请求,重新渲染数据
                    render();
                }
            })
        }
    });

    //功能三:点击添加分类按钮,弹出二级分类框
    $('#addBtn').on('click', function () {
        //3.1弹出二级分类框
        $('#second_page').modal('show');
    })




    //每次渲染,发送ajax请求,封装数据
    function render(){
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            type:'get',
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            success: function (data) {
                //console.log(data);
                //4.绑定模板,把模板追加到页面中
                $('tbody').html(template('tpl',data));
            }
        });
    }

});
