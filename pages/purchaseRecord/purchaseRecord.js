// pages/purchaseRecord/purchaseRecord.js
const Request = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    purchaseList:[
      {
        pro_logo: "../../static/img/shop.png", pro_name: "商品名称1", pro_real_price: "99", pro_num: 5, payStatus: "已支付", real_mny:"80",id:1
      },
      {
        pro_logo: "../../static/img/shop.png", pro_name: "商品名称1", pro_real_price: "99", pro_num: 5, payStatus: "已支付", real_mny: "80", id: 2
      },
      {
        pro_logo: "../../static/img/shop.png", pro_name: "商品名称1", pro_real_price: "99", pro_num: 5, payStatus: "已支付", real_mny: "80", id: 3
      }
    ]
  },
  selectFn:function(e){
    console.log(e.currentTarget.id)
    let  id = e.currentTarget.id*1
    // let ddbh = this.data.purchaseList[id].ddbh
    
    let retbody={
        userid : this.data.userid,
        ddbh:"2222018"
    }
    wx.navigateTo({
      url: '/pages/purchaseDetails/purchaseDetails?data='+JSON.stringify(retbody),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      console.log("商品购买列表",options)
      this.setData(options)
    
    Request.postFn("/api/my_order_list.php", {
      userid: this.data.userid
    },
      res => {
        let data = res.data;
        if(data.state=="true"){
          
          this.setData({
            purchaseList:data.list
          })
        console.log("订单列表", res)
        }

      },
      err => {

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