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
