// pages/feedback/feedback.js
const Request = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:"",
    valueCount: 0
  },
  feedback: function() {
    Request.postFn("/api/advice.php", {
      userid:this.data.userid,
      con:this.data.value
    }, (res) => {
        console.log("意见反馈",res)
        if(res.data.state == "true"){
          wx.showToast({
            title: '提交成功',
            icon: '',
            image: '',
            duration: 2000,
            mask: true,
            success: function(res) {
              setTimeout(function () {

              wx.reLaunch({
                url: '/pages/user/user',
              })
              }, 2000)
            },
            fail: function(res) {},
            complete: function(res) {},
          })
         
        }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      console.log(options)
      this.setData(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  
  textareaChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      value: e.detail.value,
      valueCount: e.detail.value.length
    })
  }
})