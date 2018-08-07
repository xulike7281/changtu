// pages/myReward/myReward.js
const Request = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shadeMsg: "优惠券",
    isShow: true,
    isShade: false,
    isUse: false,
    isCouponUse: false,
    isRewardBUse: false,
    activeList: [],
    rewardList: [],
    couponList: []

  },
  //  去使用btn
  rewardBtn: function() {
    console.log(this.data.isShow)
    if (this.data.isShow) {
      this.setData({
        shadeMsg: "优惠券",
        isShade: !this.data.isShade
      })
    } else {
      this.setData({
        shadeMsg: "礼金",
        isShade: !this.data.isShade
      })
    }

  },
  // 优惠券使用须知
  couponUseBtn: function(e) {

    let activeList = this.data.activeList;
    let index = e.target.id * 1
    if (!activeList[index]) {
        activeList[index] = true;
    }else{
      activeList[index] = false;
    }

    this.setData({
      activeList: activeList
    })

  },

  // 礼金使用规则
  rewardUseBtn: function() {
    this.setData({
      isRewardBUse: !this.data.isRewardBUse
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this  = this;
    let ct_userInfo = wx.getStorageSync("ct_userInfo")
    if (ct_userInfo){
     this.setData(ct_userInfo)
    }

    // 初始化每一条优惠券使用须知的状态
    let activeList = []
    for (let i = 0; i < this.data.couponList.length; i++) {
      activeList.unshift(false)
    }
    this.setData({
      activeList: activeList
    })
    // 查询礼金数据
    Request.postFn("/api/get_prize.php",{
      userid:_this.data.userid,
      type:"1"
    },
    res=>{
      let data = res.data
      console.log("优惠券数据",data)
      if (data.state=="true"){
        _this.setData({
        couponList:data.list
        })
      }
    }
    )
    Request.postFn("/api/get_prize.php", {
      userid: _this.data.userid,
      type: "2"
    },
      res => {
        let data = res.data
        console.log("礼金数据", data)
        if (data.state == "true") {
          _this.setData({
            rewardList: data.list
          })
        }
      }
    )
    
    console.log(activeList)
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

  },
  switchTab: function() {
    this.setData({
      isShow: !this.data.isShow
    })
  },
  useRule: function() {
    this.setData({
      isUse: !this.data.isUse
    })
  },
  shade: function() {
    this.setData({
      isShade: !this.data.isShade
    })
  }
})