//weather.js
var app = getApp();//获取当前小程序实例，方便使用全局方法和属性
Page({
  //1、页面数据部分
  data:{cur_id:app.curid,basic:"",now:"",suggestion:""},
  onShow:function(){
    var that = this;
    wx.showToast({title: '加载中',icon: 'loading',duration: 10000})
    that.getnow(function(d){
      wx.hideToast();
      // d.now.cond.src="http://files.heweather.com/cond_icon/"+d.now.cond.code+".png";
      that.setData({basic:d.basic,now:d.now})//更新数据，视图将同步更新
    })
    that.getsuggestion(function(d){
      that.setData({suggestion:d.suggestion})//更新数据
    })},
  //3、自定义页面方法：获取当前天气API
  getnow:function(fn){
    wx.request({
      url: 'https://www.xiaoguge.cn/api/wxtest/now.php', 
      data: {city:app.curid,key:'01a7798b060b468abdad006ea3de4713'},
      header: {'Content-Type': 'application/json'},
      success: function(res) {fn(res.data.HeWeather5[0]);}
    })
  },
  
  getsuggestion:function(fn){
    wx.request({
      url: 'https://www.xiaoguge.cn/api/wxtest/suggestion.php', 
      data: {city:app.curid,key:'01a7798b060b468abdad006ea3de4713'},
      header: {'Content-Type': 'application/json'},
      success: function(res) {fn(res.data.HeWeather5[0]);}
    })
  },
  
  bindViewTap:function(){wx.switchTab({url: '../city/city'})} 
})

