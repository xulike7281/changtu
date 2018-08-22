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
        for (let i = 0; i < data.share.length;i++){
          let item = data.share[i];
          if (item.share_give_type==1){
            item.msg = "您已免费获得优惠券一张"
          
          } else if (item.share_give_type == 2){

            item.msg = "您已获得"+item.mny +"礼金"
          }

          if (item.is_prize) {
            item.msg2 = "邀请成功"
          } else {
            item.msg2 = "TA还未到店使用"
            item.msg = "朋友到店使用后你可获得奖励"
          }
        }
        _this.setData({
          shareList: data.share
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