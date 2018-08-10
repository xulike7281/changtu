//index.js
//获取应用实例
// const app = getApp()
const Request = require("../../utils/request.js")

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    swiperList: [],
    utilsList: []
  },
  // 点击轮播图
  selectSwiper:function(e){
      console.log(e.target.id)
    wx.navigateTo({
      url: '/pages/share/share?pro_type_id=' + e.target.id,
    })
  },
  //事件处理函数
  selectFn: function (e) {
    console.log(e)
    let id = e.currentTarget.id
      console.log(id)
      wx.navigateTo({
        url: '/pages/activityList/activityList?pro_type_id='+id,
      })
  },
  onLoad: function() {
    let _this = this




    wx.login({
      success: res => {
        let code = res.code;
        Request.postFn("/api/get_wx_userid.php",{
          code: code,
          nick:"",
          tx:"https://ct.jikeyun.net/xcx_img/demo.png",
          unique_id:""
        },
        res=>{
          let data = res.data;
          console.log(data)
          if (data.state == "true") {
            wx.setStorage({
              key: 'ct_userInfo',
              data: data
            })

          }
        },
        res=>{
         
        })

      }
    })

    Request.postFn("/api/get_index.php",{},(res)=>{

      let data = res.data
      console.log("success",data)
      if(data.state=="true"){
        _this.setData({
          utilsList:data.pro_type,
          swiperList:data.banner,
          indexPage:true
        });

      }

    },
    (error)=>{
      console.log("fail", error)
    },
    (res)=>{
      console.log("comm",res)
    })

  
  }
})