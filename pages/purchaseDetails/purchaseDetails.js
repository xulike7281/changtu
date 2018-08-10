// pages/purchaseDetails/purchaseDetails.js
const Request = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShade:false,
    purchaseList: [ ]
  },
  shade:function(){
    this.setData({
      isShade: !this.data.isShade
    })
  },
  btnFn:function(){
    this.setData({
      isShade: !this.data.isShade
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let  _this = this;
    this.setData(JSON.parse(options.data))
    console.log("数据",this.data)
    let ct_userInfo = wx.getStorageSync("ct_userInfo")
    if (ct_userInfo) {
      this.setData({
        userid: ct_userInfo.userid,
        unique_id: ct_userInfo.unique_id
      })
    }

    console.log("请求的参数", this.data.ddbh)
    Request.postFn("/api/order_detail.php",{
      userid: _this.data.userid,
      ddbh: _this.data.ddbh
    },
    res=>{
      let data = res.data;
      if(data.state = "true"){

      console.log("订单详情",res)
      _this.setData(data)
      }
    },
    err=>{

    }
    )

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
 
})