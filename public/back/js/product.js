/**
 * Created by Administrator on 2017/11/13.
 */
$(function(){

    //记录当前显示的第一页
    var currentPage = 1;
    //记录当前第一页显示多少条数据
    var pageSize = 5;

    //功能一:页面一加载,渲染数据
        //1.页面加载,发送ajax请求,渲染数据
    $.ajax({
        url:'/product/queryProductDetailList',
        type:'get',
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        success: function (data) {
            console.log(data);
            //2.绑定模板,追加数据
            var html = template('tpl',data);
            $('tbody').html(html);

            //3.分页渲染插件
            $('.pagination').bootstrapPaginator({
                //4.指定当前的版本
                bootstrapMajorVersion:3,
                //4.2指定当前页(第一页)
                currentPage:currentPage,
                //4.3指定总页数(根据总数据除以每一页的数据来计算当前显示的总页数)
                totalPages:Math.ceil(data.total/pageSize),
                //4.4分页插件中,点击某一个,获取当前点击的页数
                onPageClicked: function (a,b,c,page) {
                    //4.5当进行点击之后,page表示当前点击的页码,那么修改当前页(2)
                    currentPage  = page;//(可以在当前显示第二页,5条数据)
                    //4.6重新渲染数据
                    render();
                }
            })
        }
    });




    //封装ajax请求
    function render(){
        $.ajax({
            url:'/product/queryProductDetailList',
            type:'get',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success: function (data) {
                console.log(data);
                //2.绑定模板,追加数据
                var html = template('tpl',data);
                $('tbody').html(html);
            }
        })
    }






});