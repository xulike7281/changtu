// pages/share/share.js
const Request = require("../../utils/request.js")
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pro_type_id: "",
    codebtn: "获取验证码",
    phone: '',
    car_code: "",
    isSecond: true,
    userid: "",
    second: 60,
    unique_id: "",
    _unique_id:"",
    showShade: false, // 立即领取弹窗
    successShade: false, // 领取成功
    haveShare: false, // 已经领取弹窗
    failShare: false, // 活动已结束
    recordsData: [],
    resFlag:true,
    duration:60000,
    _data:"",
    share_title:"养车可以不花钱，我已经领到啦，送你一张",
    share_logo:"../../static/img/share_img.png"
  },

  formSubmit:function(e){
    let  _this = this 
    console.log("form", e.detail.formId)
    Request.postFn("/api/record_formid.php",{
      userid: _this.data.userid,
      formid: e.detail.formId
    },
    res=>{
        console.log("提交formid成功",res)
    },err=>{
      console.log("提交formidfail", err)
    })
  },
  // 返回首页
  backIndex() {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  // 返回我的
  backUser() {
    wx.reLaunch({
      url: '/pages/user/user',
    })
  },
  // 领取 
  getShopBtn: function() {
    let _this = this;
    let is_can_lqParmas = {
      pro_id: _this.data.id,
      userid: _this.data.userid
    }
    console.log("查询领取限制参数", is_can_lqParmas)
    Request.postFn("/api/is_can_lq.php", is_can_lqParmas, res => {
      let data = res.data
      console.log("领取条件", res)
      if (data.state == "true") {
        _this.setData({
          showShade: true,
          token: data.token
        })
      } else {
        if (data.is_special == 1) {
          _this.setData({
            failShare: true
          })
        } else {
          wx.showToast({
            title: data.msg,
            icon: 'none',
            image: '',
            duration: 2000,
            mask: true
          })
          
        }
      }
    })

  },
  // 领取失败
  shareFail: function() {
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
    let  obj = {
      pro_id: this.data.id,
      _unique_id: +this.data._unique_id,
      userid: +this.data.userid,
      share_title: +this.data.share_title,
      share_logo: +this.data.share_logo
    }
    wx.navigateTo({
      url: '/pages/confirmOrder/confirmOrder?pro_id=' + this.data.id + "&_unique_id=" + this.data._unique_id + "&userid=" + this.data.userid + "&share_title=" + this.data.share_title + "&share_logo=" + this.data.share_logo
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
    if (!(/^1[3|5|6|7|8][0-9]\d{8}$/.test(this.data.phone))) {
      console.log("号码格式不正确")
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
        image: '',
        duration: 2000,
        mask: true
      })
      return
    }
    if (_this.data.phone && _this.data.phone.length == 11) {
      if (this.data.codebtn == "获取验证码") {
        wx.showToast({
          title: "发送中",
          icon: 'loading',
          image: '',
          duration: this.data.duration,
          mask: true
        })
        Request.postFn("/api/send_code.php", {
            userid: _this.data.userid,
            sjhm: _this.data.phone
          },
          res => {
            let data = res.data;
            console.log(data)
            if (data.state == "true") {
              _this.setData({
                duration:0
              })
              wx.showToast({
                title: res.data.msg,
                icon: '',
                image: '',
                duration: 2000,
                mask: true
              })
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
                    codebtn: _this.data.second-1
                  })
                }, 1000)

              }
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
   
    if (!_this.data.phone){
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
        image: '',
        duration: 2000,
        mask: true
      })
      return
    }
    if (!_this.data.yzmCode){
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        image: '',
        duration: 2000,
        mask: true
      })
      return
    }
    if (this.data.has_hphm==1){

    
    if (_this.data.car_code.length == "7" || _this.data.car_code.length == "8" || _this.data.car_code.length == "9") {
    }else{
      wx.showToast({
        title: '车牌号格式不正确',
        icon: 'none',
        image: '',
        duration: 2000,
        mask: true
      })
      return
    }
    }
    let free_order = {
      userid: _this.data.userid,
      pro_id: _this.data.pro_type_id,
      token: _this.data.token,
      sjhm: _this.data.phone,
      code: _this.data.yzmCode,
      hphm: _this.data.car_code,
      unique_id: _this.data._unique_id,
      data: _this.data._data
    }
    console.log("立即领取参数", free_order)
      wx.showToast({
        title: "请求中",
        icon: 'loading',
        image: '',
        duration: _this.data.duration,
        mask: true
      })

      if(_this.data.resFlag){
        _this.setData({
          resFlag:false
        })
      Request.postFn("/api/free_order.php", free_order, res => {
        let data = res.data
        if (data.state == "true") {
          console.log("领取成功", res)
          _this.setData({
            showShade: false,
            successShade: true,
            ddbh: data.ddbh,
            _phone: _this.strFn(_this.data.phone)
          })

        } else {
          console.log("领取失败111111", res)
          if (data.is_special == 2) {
            _this.setData({
              haveShare: true
            })
            return
          }
          wx.showToast({
            title: data.msg,
            icon: '',
            image: '../../static/img/icon_error.png',
            duration: 2000,
            mask: true
          })
          return
        
        }
      }, 
      err => {
        _this.setData({
          resFlag: true
        })
        wx.showToast({
          title: '领取异常',
          icon: '',
          image: '../../static/img/icon_error.png',
          duration: 2000,
          mask: true
        })
        console.log("领取失败", err)

      },
      com=>{
        
      }
      )
      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getDetail() {
    let _this = this;
    Request.postFn("/api/detail.php", {
        pro_id: _this.data.pro_type_id,
        userid: _this.data.userid
      },
      res => {
        let data = res.data;
        if (data.state == "true") {
          console.log(data)
          _this.setData(data.detail)
          if(!data.detail.share_logo){
            _this.setData({
              share_title: "养车可以不花钱，我已经领到啦，送你一张",
              share_logo: "../../static/img/share_img.png"
            })
          }
          WxParse.wxParse('article', 'html', data.detail.pro_detail, _this, 5);
          for (let i = 0; i < data.share.length; i++) {
            let item = data.share[i];
            if (item.share_give_type == 1) {
              item.msg = "您已免费获得优惠券一张"

            } else if (item.share_give_type == 2) {

              item.msg = "您已获得" + item.mny + "礼金"
            }
            if (item.is_prize) {
              item.msg2 = "邀请成功"
            } else {
              item.msg2 = "TA还未到店使用"

            }
          }
          _this.setData({
            recordsData: data.share,
            isPage:true
          })
        }
      },
      res => {},
      res => {}
    )
  },
  // 字符串替换
  strFn: function(str) {

    return str.substring(0, 3) + "****" + str.substring(7, 11)
  },
  onLoad: function(options) {
   
    let _this = this;
    this.setData(options)
    console.log("接收的参数", options)
    if (options.unique_id){
      this.setData({
        _unique_id:options.unique_id
      })
    }
    if(options.data){
      this.setData({
       _data: options.data
      })
    }
   


    console.log("登陆参数unique_id", _this.data._unique_id)

      wx.login({
        success: res => {
          let code = res.code;
          Request.postFn("/api/get_wx_userid.php", {
              code: code,
              nick: "",
              tx: "https://ct.jikeyun.net/xcx_img/demo.png",
            unique_id: _this.data._unique_id
            },
            res => {
              let data = res.data;
              console.log("活动详情页获取userid", data)
              if (data.state == "true") {
                wx.setStorage({
                  key: 'ct_userInfo',
                  data: data
                })
                _this.setData({
                  userid: data.userid,
                  unique_id: data.unique_id
                })
                this.getDetail()
              }
            },
            res => {

            })
        }
      })

   



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
    let _this = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }

    return {
      title: this.data.share_title,
      path: 'pages/share/share?pro_type_id=' + this.data.pro_type_id + "&unique_id=" + this.data.unique_id,
      imageUrl: this.data.share_logo,  
      success: function(res) {
        // 转发成功
        Request.postFn("/api/share.php", {
            userid: _this.data.userid,
            pro_id: _this.data.id
          },
          res => {
            let data = res.data
            if (data.state = "true") {

              wx.removeStorage({
                key: 'ct_userInfo',
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
              })
              wx.showToast({
                title: '分享成功',
                icon: '',
                image: '',
                duration: 2000,
                mask: true,
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
              })
            }
          })
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})