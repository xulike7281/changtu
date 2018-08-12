// pages/shareRecords/shareRecords.js
const Request = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    shareList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  console.log(options)
  let _this = this;
    Request.postFn("/api/get_share_log.php",{
      userid:options.userid
    },
    res=>{
      let data =res.data;
      if(data.state=="true"){
        console.log(data)
        for(let i = 0;i<data.share.length;i++){
          let  item = data.share[i];
          if (item.type==1){
            item.msg = "您已免费获得优惠券一张"
          } else if (item.type == 2){
            item.msg = "您已获得"+item.mny +"礼金"
          }
        }
        _this.setData({
          shareList:data.share
        }
        )
      }
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