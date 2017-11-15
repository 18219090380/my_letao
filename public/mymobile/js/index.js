/**
 * Created by Administrator on 2017/11/13.
 */
//功能1:滚动控制初始化
mui('.mui-scroll-wrapper').scroll({
    indicators: false, //是否显示滚动条
});

//功能2:获得slider插件对象,初始化轮播图
var gallery = mui('.mui-slider');
gallery.slider({
    interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});