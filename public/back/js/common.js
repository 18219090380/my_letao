/**
 * Created by Administrator on 2017/11/8.
 */
/*
* 公共部分js
* */
/**
 * Created by Administrator on 2017/11/8.
 */
//功能需求1.左边报表显示
// 基于准备好的dom，初始化echarts实例
//var myChart = echarts.init(document.getElementById('main'));
//alert("已经导入index.js");
var myChart = echarts.init(document.querySelector(".left_echarts"));
//console.log(myChart);

// 指定图表的配置项和数据
var option = {
    title: {
        text: '2017年注册人数'
    },
    tooltip: {},
    legend: {
        data:['人数']
    },
    xAxis: {
        data: ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis: {},
    series: [{
        name: '人数',
        type: 'bar',
        data: [980, 1005, 2006, 1000, 1830, 2520]
    }]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

//功能需求2:右边报表显示
// 基于准备好的dom，初始化echarts实例
var myChart_pie = echarts.init(document.querySelector(".right_echarts"));
var option2 = {
    title : {
        text: '热门品牌销售',
        subtext: '2017年6月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['阿迪','耐克','李宁','乔丹','安踏']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'阿迪'},
                {value:310, name:'耐克'},
                {value:234, name:'李宁'},
                {value:135, name:'乔丹'},
                {value:1548, name:'安踏'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
// 使用刚指定的配置项和数据显示图表。
myChart_pie.setOption(option2);

//功能需求3:鼠标点击左边,左边侧边栏隐藏(右边通过设置一个类,点击时候,隐藏左边,同时把这个类设置给右边)
$('.toggle_sh').on("click",function(){
    //左边栏隐藏
    $('.lt_aside').toggleClass("now");
    //改变右边栏中的样式(把padding-left改成0)
    $('.rt_main').toggleClass('now');
})

//功能需求4:鼠标点击右边,弹出模太框
$(".bomb_box").on('click',function(){
    //显示模态框(看bootstrap用法--->javascript插件--->模态框)
    $('.tankuang').modal('toggle');
})

//功能需求5:弹出模态框之后,点击确定的时候,发送ajax请求(根据点击确定返回来的成功或者失败,进行页面的跳转)
//5.1给模态框确定按钮注册点击事件
$(".btn_confirm").on('click',function(){
    //5.2发送ajax请求,根据返回的结果,是否进行页面的跳转
    $.ajax({
        url:"/employee/employeeLogout",
        type:'get',
        success:function(data){
            //console.log(data);
            //5.3根据这个返回来的数据,可以通过这个对象.属性获取
            if(data.success){
                //5.4如果是true,那么说明了用户点击了确定,可以进行页面的跳转(打回登录页面)
                window.location.href = "login.html";
            }
        }
    })
})

//功能需求6:由于退出了登录系统,但是,通过url栏直接输入首页url,也会自动跳转到首页,那么,我们可以控制一下登录之前不给其跳转
//6.1为了控制初始状态,没登录之前,直接让其在登录页面,不能进其他页面(可以通过开始发送ajax请求,如果是真,那么可以让其跳转)
//$.ajax({
//    //7.2通过这个,可以判断管理员登录的状态
//    url:"/employee/checkRootLogin",
//    type:"get",
//    success:function(data){
//        console.log(data);
//    }
//})
//6.2由于上面的一直发ajax请求,不可以;那么,可以判断只要不存在登录页面,都发送一次ajax请求
if(window.location.href.indexOf('login.html') == -1){
    $.ajax({
        //7.2通过这个,可以判断管理员登录的状态
        url:"/employee/checkRootLogin",
        type:"get",
        success:function(data){
            //console.log(data);
            //7.3如果不在登录页面的时候,发送了ajax请求,出现状态错误为400,那么就直接打回登录页面
            if(data.error === 400){
                window.location.href = "login.html";
            }
        }
    })
}




//功能需求7:点击分类管理,切换一级分类和二级分类上拉下拉
//7.1给分类管理注入点击事件
$('.sort_manage').on('click',function(){
    //6.2分类管理的下一个元素对象下拉显示,再次点击上拉
    $(this).next().stop().slideToggle();
})

//功能需求8:导航栏点击每一个li标签,左边框都会有3px的边框线显示,并且,背景颜色也变


//8.每次加载页面的时候,都显示一个进度条

NProgress.start();
NProgress.done();




