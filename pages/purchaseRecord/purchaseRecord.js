// pages/purchaseRecord/purchaseRecord.js
const Request = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    purchaseList:[
      
    ]
  },
  selectFn:function(e){
    console.log(e.currentTarget.id)
    let  index = e.currentTarget.id*1
    // let ddbh = this.data.purchaseList[id].ddbh
    
    let retbody={
        userid : this.data.userid,
      ddbh: this.data.purchaseList[index].ddbh
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