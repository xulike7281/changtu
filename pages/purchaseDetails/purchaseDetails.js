// pages/purchaseDetails/purchaseDetails.js
const Request = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShade:false,
    purchaseList: [
      {
        pro_logo: "../../static/img/shop.png", pro_name: "商品名称1", pro_real_price: "99", pro_file: "1", pro_num: 5, payStatus: "已支付", real_mny: "80", ddbh:"2222018",id:"1"
      }
    ]
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
    let parmas =JSON.parse(options.data)
    console.log(parmas)
    this.setData(parmas)
    Request.postFn("/api/order_detail.php",{
      userid:this.data.userid,
      ddbh: this.data.ddbh
    },
    res=>{
      let data = res.data;

      console.log("订单详情",res)

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
  onShareAppMessage: function () {
  
  }
})