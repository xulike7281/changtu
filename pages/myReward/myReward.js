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
    couponList: [],
    codebtn: "获取验证码",
    duration: 60000,
    second: 60

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
    } else {
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
  phoneInput(e) {
    console.log("手机号", e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },
  codeInput(e) {
    console.log("验证码", e.detail.value)
    this.setData({
      code: e.detail.value
    })
    
  },

  // 关闭弹窗
  add_shade:function(){
    this.setData({
      isPhone:false
    })
  },
  // 获取验证码
  getCode: function() {
    let _this = this;

    if (!_this.data.phone) {
      // 手机号码为空
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
                duration: 0
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
                    codebtn: _this.data.second - 1
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
  // 提交手机号码
  submitPhone: function() {
    let _this = this;
    let parmas = {
      sjhm: this.data.phone,
      userid: this.data.userid,
      code:this.data.code
    }
    if (!(/^1[3|5|6|7|8][0-9]\d{8}$/.test(this.data.phone)) ) {
      console.log("请输入手机号码")
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
        image: "",
        duration: 2000,
        mask: true
      })
      return
    }
    if (!this.data.code){
      wx.showToast({
        title: '请输入正确的验证码',
        icon: 'none',
        image: "",
        duration: 2000,
        mask: true
      })
      return
    }

    console.log("提交手机号参数", )
    Request.postFn("/api/record_sjhm.php", parmas,
      res => {
        console.log("请求成功", res)
        let data = res.data;
        if (data.state == "true") {
            _this.getData()
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            image: '',
            duration: 2000,
            mask: true,
            success: function(res) {
              _this.setData({
                isPhone: false
              })
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        }else{
          wx.showToast({
            title: '添加失败',
            icon: 'success',
            image: '',
            duration: 2000,
            mask: true,
            success: function (res) {
              _this.setData({
                isPhone: false
              })
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      },
      err => {
        console.log("提交手机号码fail", err)
      })
  },
  // get data 
  getData:function(){
    let _this = this;
    Request.postFn("/api/get_prize.php", {
      userid: _this.data.userid
    },
      res => {
        let data = res.data
        console.log("优惠券数据", data)
        if (data.state == "true") {
          _this.setData({
            couponList: data.yhq_list,
            rewardList: data.lj_list
          })
        } else {
          if (data.is_special == 1) {
            _this.setData({
              isPhone: true
            })
          }
        }
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    let ct_userInfo = wx.getStorageSync("ct_userInfo")
    if (ct_userInfo) {
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
    _this.getData()

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