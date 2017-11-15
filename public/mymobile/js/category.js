/**
 * Created by Administrator on 2017/11/14.
 * 分类页
 */
$(function(){
    //功能1:滚动控制初始化
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //是否显示滚动条
    });

    //功能2:分类页一级导航数据渲染
    //2.1一级导航--发送ajax请求
    $.ajax({
        url:"/category/queryTopCategory",
        type:'get',
        success: function (data) {
            //console.log(data);
            //2.2绑定模板
            var html = template('tpl',data);
            //2.3把当前绑定模板追加到nav_list中
            $('.nav_list ul').html(html);

            //2.4由于页面一加载需要渲染二级分类(即显示一级分类的第一个数据)
            //2.5根据一级的数据获取第一个一级分类第一个的id,作为参数传递,显示第一个id的数据
            var firstId =data.rows[0].id;//一级分类的第一个id
            renderSecond(firstId);
        }
    })

    //功能3:(事件委托)点击一级分类中的每一个a标签,对应的a标签显示一个now类,同时,二级要根据一级的信息显示对应的信息
    $(".nav_list").on('click',"a", function () {
        $(this).addClass("now").parent().siblings().find("a").removeClass("now");
        //3/1获取当前点击的id
        var id = $(this).data("id");
        //console.log(id);
        //3.2发送ajax请求,获取数据,渲染模板
        $.ajax({
            url:'/category/querySecondCategory',
            type:"get",
            data:{
                id:id,
            },
            success: function (data) {
                //console.log(data);
                //3.3绑定模板
                var html = template('tpl1',data);
                $('.nav_list_content ul').html(html);
            }
        })
    });


    //函数分装:二级分类函数封装
    function renderSecond(id){
        //3.2发送ajax请求,获取数据,渲染模板
        $.ajax({
            url:'/category/querySecondCategory',
            type:"get",
            data:{
                id:id,
            },
            success: function (data) {
                //console.log(data);
                //3.3绑定模板
                var html = template('tpl1',data);
                $('.nav_list_content ul').html(html);
            }
        })
    }

});

