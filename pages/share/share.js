// pages/share/share.js
const Request = require("../../utils/request.js")
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codebtn: "获取验证码",
    phone: '',
    car_code: "",
    isSecond: true,
    userid: "",
    second: 60,
    unique_id: "",
    showShade: false, // 立即领取弹窗
    successShade: false, // 领取成功
    haveShare: false, // 已经领取弹窗
    failShare: false, // 活动已结束
    recordsData: []
  },

  // 领取 
  getShopBtn: function() {
    console.log("领取")
    this.setData({
      showShade: true
    })
  },
  // 领取失败
  shareFail: function() {
    console.log("已经失败,活动已结束")
    this.setData({
      failShare: false
    })
  },
  // 已经领取过
  shareHave: function() {
    console.log("已经领取过")
    this.setData({
      haveShare: false
    })
  },
  // 领取成功
  shadeSuccess: function() {
    this.setData({
      successShade: false
    })
  },
  // 去领取
  shade: function() {
    this.setData({
      showShade: false
    })
  },
  backIndex: function() {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  buyBtn: function() {
    wx.navigateTo({
      url: '/pages/confirmOrder/confirmOrder?id='+this.data.id,
    })
  },
  // 输入手机号码
  phoneNumber: function(e) {
    console.log(e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },
  // 获取验证码
  getCode: function() {
    let _this = this;

    if (!_this.data.phone) {
      // 手机号码为空
      wx.showToast({
        title: '号码不能为空',
        icon: '',
        image: '../../static/img/icon_error.png',
        duration: 2000,
        mask: true
      })
      return
    }
    if (!(/^1[3|5|6|7|8][0-9]\d{8}$/.test(this.data.phone))) {
      console.log("号码格式不正确")
      wx.showToast({
        title: '号码格式错误',
        icon: '',
        image: '../../static/img/icon_error.png',
        duration: 2000,
        mask: true
      })
      return
    }
    if (_this.data.phone && _this.data.phone.length == 11) {
      if (this.data.codebtn == "获取验证码") {
        Request.postFn("/api/send_code.php", {
            userid: _this.data.userid,
            sjhm: _this.data.phone
          },
          res => {
            let data = res.data;
            console.log(data)
            let timer;
            if (_this.data.second == 60) {
              timer = setInterval(function() {
                if (_this.data.second == 0) {
                  clearInterval(timer)
                  console.log("到0 了")
                  _this.setData({
                    second: 60,
                    codebtn: "获取验证码"
                  })

                  return
                }

                _this.setData({
                  second: _this.data.second - 1,
                  codebtn: _this.data.second
                })
              }, 1000)

            }
          },
          res => {
            // fail
          },
          res => {
            setTimeout(function(res) {
              _this.setData({
                _isRequestCnb: false
              })
            }, 500)
          }
        )
      } else {
        console.log("在限制时间内")
      }
    }



  },
  yzmCode: function(e) {
    console.log("输入验证码:", e.detail.value)
    this.setData({
      yzmCode: e.detail.value
    })
  },
  // 车牌号码
  carCode: function(e) {
    console.log("车牌号码:", e.detail.value)
    this.setData({
      car_code: e.detail.value
    })
  },
  //  立即领取
  getFn: function() {
    let _this = this;
    console.log("立即领取")
    if (_this.data.phone)
      Request.postFn("/api/free_order.php", {
        userid: _this.data.userid,
        pro_id: _this.data.pro_type_id,
        sjhm: _this.data.phone,
        code: _this.data.yzmCode,
        hphm: car_code,
        unique_id: _this.data.unique_id,
        data: ""
      })

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
    this.setData(options)
    console.log("参数",_this.data.pro_type_id)
    Request.postFn("/api/detail.php", {
      pro_id: _this.data.pro_type_id,
        userid: _this.data.userid,
        unique_id: _this.data.unique_id,

      },
      res => {
        let data = res.data;
        if (data.state == "true") {
          console.log("share,res",data)
          _this.setData(data.detail)
          WxParse.wxParse('article', 'html', data.detail.pro_detail, _this, 5);
          _this.setData({
            recordsData: data.share,

          })
        }
      },
      res=>{
        console.log(res)
      },
      res=>{
        console.log("111",res)
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
  onShareAppMessage: function(res) {
    console.log("111")
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    
    return {
      title: '自定义转发标ssss题',
      path: 'pages/index/index',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})