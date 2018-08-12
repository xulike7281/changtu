// pages/paySuccess/paySuccess.js
const Request = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  backIndex:function(){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  lookOrder:function(){


    wx.navigateTo({
      url: '/pages/purchaseDetails/purchaseDetails?data='+JSON.stringify(this.data),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData(JSON.parse(options.data))
    console.log("paysuccess",this.data)
    let ct_userInfo = wx.getStorageSync("ct_userInfo")
    if (ct_userInfo) {
      console.log("有用户信息", ct_userInfo)
      this.setData({
        userid: ct_userInfo.userid,
        unique_id: ct_userInfo.unique_id
      })
    } 
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
  
    　　// 设置菜单中的转发按钮触发转发事件时的转发内容
    　　var shareObj = {
        title: '养车可以不花钱，我已经领到啦，送你一张！',
              
        path: 'pages/share/share?pro_type_id=' + this.data.pro_type_id + "&unique_id=" + this.data.unique_id,        // 默认是当前页面，必须是以‘/’开头的完整路径
        imageUrl: '../../static/img/share_img.png',      //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      　　　　success: function (res) {
        　　　　　　// 转发成功之后的回调
        　　　　　　if (res.errMsg == 'shareAppMessage:ok') {
                Request.postFn("/api/share.php", {
                  userid: _this.data.userid,
                  pro_id: _this.data.id
                },
                  res => {
                    let data = res.data
                    if (data.state = "true") {

                      wx.removeStorage({
                        key: 'ct_userInfo',
                        success: function (res) { },
                        fail: function (res) { },
                        complete: function (res) { },
                      })
                      wx.showToast({
                        title: '分享成功',
                        icon: '',
                        image: '',
                        duration: 2000,
                        mask: true,
                        success: function (res) { },
                        fail: function (res) { },
                        complete: function (res) { },
                      })
                    }
                  })

        　　　　　　}
      　　　　},
      　　　　fail: function () {
        　　　　　　// 转发失败之后的回调
        　　　　　　if (res.errMsg == 'shareAppMessage:fail cancel') {
          　　　　　　　　// 用户取消转发
        　　　　　　} else if (res.errMsg == 'shareAppMessage:fail') {
          　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
        　　　　　　}
      　　　　},
      
  　　}
　　return shareObj;
  }
})