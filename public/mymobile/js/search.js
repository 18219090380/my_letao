/**
 * Created by Administrator on 2017/11/15.
 */

$(function () {
    //功能1:滚动控制初始化
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //是否显示滚动条
    });


//功能2:查询功能--查询本地服务器,渲染到页面上(页面一加载渲染一次)

    renderStorageData();

    //封装函数:获取本地服务器数据,渲染模板
    function renderStorageData(){
        //2.1获取到本地服务器的值(字符串)--模拟('["张三","李四"]')
        var history = localStorage.getItem('lt_search_history') || '[]';

        //2.2把字符串转换成数组
        var arr = JSON.parse(history);

        //2.3给当前数组赋值一个属性值,便于遍历
        var arr1 ={rows:arr};
        //console.log(arr1);//rows:[]

        //2.4获取到的数据,转换成对象,作为数据,生成模板渲染
        var html = template('tpl',arr1);

        //2.5追加到history_record类中
        $('.history_record ul').html(html);
    }

//功能3:清空功能(点击清空记录)--把全部的历史记录删除
    $('.del_history').on('click', function () {
        //3.1弹出提示框(回调函数----点击取消或者确定时候触发)
        mui.confirm('你确定要清空历史记录吗?','温馨提示',['取消','确定'], function (e) {
            //console.log('呵呵呵');

            //3.4但是,是否删除数据取决于用户的决定(0或者1)
            if(e.index === 1){
                //3.2删除存储到本地服务器的数据(通过删除存储数据的名字进行删除)
                localStorage.removeItem('lt_search_history');

                //3.3重新渲染数据
                renderStorageData();
            }
        })
    });

//功能4:删除功能:点击叉叉按钮,把当前这条数据删除(事件委托)
    $('.history_record').on('click','.btn_del', function () {
        //4.4保存一下当前的this
        var $this = $(this);

        //4.1弹出提示框
        mui.confirm('您确定要删除这条历史记录吗?','温馨提示',['否','是'], function (e) {

            //4.2假设点击了确定按钮
            if(e.index === 1){

                //4.3获取下标(作为数据的下标进行删除---数据和下标对应)
                //var index = $('.btn_del').data('id');
                //console.log(index);//每次都是0;说明数据拿不到,每次都是0
                var index = $this.data('id');
                //console.log(index);

                //4.5获取本地的数据,并转换成数组
                var arr = localStorage.getItem('lt_search_history');
                var arr1 = JSON.parse(arr);
                //console.log(arr1);

                //4.6删除数组对应的下标数据(从第index个,删除1个--->会改变元素)
                // pop()：删除最后一个   shift():删除第一个
                // slice() 截取数组（不会改变数组）
                arr1.splice(index,1);
                //console.log(arr1);

                //4.7删除了当条数据,那么就把这整个arr1数据重新放回去
                localStorage.setItem('lt_search_history',JSON.stringify(arr1));

                //4.8重新渲染模板(拿数据-->转换成数组-->根据数组数据遍历模板,动态生成数据)
                renderStorageData();
            }
        })
    });

//功能5:增加功能:点击搜索按钮,获取搜索关键字中的文本值
    $('.search_btn').on('click', function () {
        //5.1获取搜索关键字的文本值
        var keyVal = $('.search_key').val();
        console.log(keyVal);
    })

});

