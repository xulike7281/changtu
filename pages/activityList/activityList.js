// pages/activityList/activityList.js
const Request = require("../../utils/request.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList: []

  },
  selectFn(e) {
    let id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/share/share?pro_type_id=' + id,
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    let ct_userInfo = wx.getStorageSync("ct_userInfo")
    console.log("ct_userInfo", ct_userInfo)
    if (ct_userInfo) {
      this.setData({
        userid: ct_userInfo.userid,
        unique_id: ct_userInfo.unique_id
      })
    }
    this.setData(options);
    console.log("活动列表页接收的参数",options)
    Request.postFn("/api/list.php", {
        pro_type_id: _this.data.pro_type_id
      },
      (res) => {
        console.log("success", res)
        let data = res.data;
        if (data.state == "true") {
          _this.setData({
            activityList: data.list
          })
        }
      },
      (err) => {
        console.log("fail", err)
      }
    )
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
 
})