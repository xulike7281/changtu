// pages/user/user.js
const Request = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnShow: true,
    userid:"",
    unique_id:"",
    nickName:"",
    avatarUrl:"",
    userList: [{
        icon: "../../static/img/jifen_icon.png",
        id: 0,
        msg: "购买记录"
      },
      {
        icon: "../../static/img/feedback_icon.png",
        id: 1,
        msg: "意见反馈"
      },
      {
        icon: "../../static/img/attention_icon.png",
        id: 2,
        msg: "关注畅途"
      }
    ]
  },
  // 
  bindGetUserInfo: function(e) {
    console.log(e)
    let _this = this;
    if (e.detail.errMsg == "getUserInfo:ok") {
      let userInfo = e.detail.userInfo
      console.log(userInfo)

      wx.setStorage({
        key: 'wx_userInfo',
        data: userInfo,
      })
      this.setData({
        btnShow: true,
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName
      })
      wx.login({
        success: res => {
          let code = res.code;
          Request.postFn("/api/get_wx_userid.php", {
              code: code,
              nick: userInfo.nickName,
              tx: userInfo.avatarUrl,
             unique_id: _this.data.unique_id
            },
            res => {
              let data = res.data;
              console.log(data)
              if (data.state == "true") {
                wx.setStorage({
                  key: 'ct_userInfo',
                  data: data
                })
                _this.setData(data)
              }
            }
          )
        }
      })

    }
  },
  myReward: function() {
    wx.navigateTo({
      url: '/pages/myReward/myReward',
    })
  },
  shareRecords: function() {
    
    wx.navigateTo({
      url: '/pages/shareRecords/shareRecords?userid=' + this.data.userid,
    })
  },
  selectFn: function(e) {
    console.log(e.currentTarget.id)
    let index = e.currentTarget.id
    if (index === "0") {
      wx.navigateTo({
        url: '/pages/purchaseRecord/purchaseRecord?userid=' + this.data.userid,
      })
    } else if (index == 1) {
      console.log(this.data.userid)
      wx.navigateTo({
        url: '/pages/feedback/feedback?userid='+this.data.userid,
      })
    } else if (index == 2) {
      wx.navigateTo({
        url: '/pages/attention/attention?userid=' + this.data.userid,
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    let wx_userInfo = wx.getStorageSync("wx_userInfo")
    let ct_userInfo = wx.getStorageSync("ct_userInfo")

    console.log(wx_userInfo, ct_userInfo)
    if (wx_userInfo) {
      _this.setData({
        btnShow: true,
        nickName: wx_userInfo.nickName,
        avatarUrl: wx_userInfo.avatarUrl
      })
    }else{
      _this.setData({
        btnShow: false
      })
    }
    if (ct_userInfo){
     this.setData(ct_userInfo)
    }

    console.log(this.data)

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
  onShareAppMessage: function() {

  }
})