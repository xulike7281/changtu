/**
 * 所有API请求都封装在这里面
 */
const app = new getApp()
const API = app.globalData.globalUrl

//GET请求
export function getFn(url, parmas, success, fail, complete) {
  wx.request({
    url: API + url,
    data: parmas,
    method: "GET",
    success(res) {
      success(res)
    },
    fail(res) {
      fail(res)
    },
    complete(res) {
      if (!complete) {
        return
      }
      complete(res)
    }
  })
}
//POST请求
export function postFn(url, parmas, success, fail, complete) {
  wx.request({
    url: API + url,
    data: parmas,
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    method: "POST",
    dataType: "json",
    success: function (res) {
      success(res)
    },
    fail: function (res) {
      fail(res)
    },
    complete: function (res) {
      if (!complete) {
        return
      }
      complete(res)
    },
  })
}
