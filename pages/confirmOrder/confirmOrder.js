// pages/confirmOrder/confirmOrder.js
const Request = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeSpec: false,
    sjhm: "",
    hphm: "",
    selectGg:"",
    pro_gg_index:0,
    pro_gg:[]
  },
  changePhone: function(e) {
    console.log(e.detail.value)
    this.setData({
      sjhm: e.detail.value
    })
  },
  changeCarNo: function(e) {
    console.log(e.detail.value)
    this.setData({
      hphm: e.detail.value
    })
  },
  selectSpec: function(e) {
    console.log(e.target.id)
    if (e.target.id == 0) {
      this.setData({
        activeSpec: true,
        pro_gg_index: e.target.id*1
      })
    } else if (e.target.id == 1) {
      this.setData({
        activeSpec: false,
        pro_gg_index: e.target.id*1
      })
    }
  },
  createOeder: function() {
    let _this = this;
    console.log(this.data.sjhm, this.data.hphm)
    //创建订单
    if (!(/^1[3|5|6|7|8][0-9]\d{8}$/.test(this.data.sjhm)) && this.data.has_sjhm) {
      console.log("请输入手机号码")
      wx.showToast({
        title: '请输入手机号码',
        icon: '',
        image: '../../static/img/icon_error.png',
        duration: 2000,
        mask: true
      })
      return
    }
    if (!this.data.hphm && this.data.has_hphm) {
      console.log("请输入车牌号码")
      wx.showToast({
        title: '请输入车牌号码',
        icon: '',
        image: '../../static/img/icon_error.png',
        duration: 2000,
        mask: true
      })
      return
    }
    let o = {
      userid: this.data.userid,
      pro_id: this.data.pro_id*1,
      sjhm: this.data.sjhm,
      pro_gg: this.data.pro_gg[this.data.pro_gg_index],
      hphm: this.data.hphm,
      pro_num: "1",
      unique_id: this.data.unique_id
    }
    console.log("确认订单参数",o)
    Request.postFn("/api/pay_create_order.php",o,
      res => {
        console.log("创建订单", res)
        let data = res.data
        
        if (data.state == "true") {
          _this.setData({
            ddbh: data.ddbh
          })
          console.log("userid", _this.data.userid, "订单编号", data.ddbh)
          Request.postFn("/api/pay_by_wx.php", {
              userid: _this.data.userid,
              ddbh: data.ddbh
            },
            res => {
              console.log("微信支付订单", res)
              let  data = res.data
              wx.requestPayment({
                'timeStamp': data.timeStamp, // 当前的时间戳
                'nonceStr': data.nonceStr, // 随机字符串，长度为32个字符以下。
                'package': data.package, // 统一下单接口返回的 prepay_id 参数值
                'signType': 'MD5', // 签名算法，暂支持 MD5
                'paySign': data.paySign,
                'success': function(res) {
                  console.log("支付成功",res)
                  wx.navigateTo({
                    url: '/pages/paySuccess/paySuccess?data=' + JSON.stringify(_this.data),
                  })
                },
                'fail': function(res) {}
              })
            })

        }
      },
      err => {
        console.log("创建订单失败", err)
      }
    )


  },
  payFn: function() {

    this.createOeder()

 

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    let ct_userInfo = wx.getStorageSync("ct_userInfo")
    if (ct_userInfo) {
      this.setData({
        userid: ct_userInfo.userid,
        unique_id: ct_userInfo.unique_id
      })
    }
    console.log(options)
    this.setData(options)
    Request.postFn("/api/pay_detail.php", {
        userid: _this.data.userid,
        pro_id: _this.data.pro_id
      },
      res => {
        let data = res.data;
        console.log("创建订单详情", data)
        if (data.state == "true") {
          _this.setData(data.detail)
        }

      },
      err => {
        console.log("创建订单fail", err)
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