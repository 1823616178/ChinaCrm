//index.js
//获取应用实例
const app = getApp();
import {
  GetUserInfo,
} from '../composen/Login.js'
import {
  OneRequests,
  ApplyBusinessData
} from '../../http/Home/action.js'
import {
  WeChatUserInfo
} from '../../http/Login/index.js'
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    QueryData: {
      page: 1,
      queryData: "",
      queryPeople: "",
      queryStatus: "",
    },
    CardListData: [],
    displayValue1: '请选择',
    SlectStausValue: "",
    SlectStausOption: [{
        title: "未指派",
        value: "0"
      },
      {
        title: "已申请",
        value: "1"
      },
      {
        title: "已指派",
        value: "2"
      }
    ]
  },
  //事件处理函数
  bindViewTapsssss: function($event) {
    console.log($event)
  },
  onLoad: function() {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  onReady() {
    this.getFirmData()
  },

  getFirmData() {
    wx.showLoading({
      title: '加载中...',
    })
    OneRequests(this.data.QueryData).then((res) => {
      this.setData({
        CardListData: res.data.data
      })
      wx.hideLoading()
    })
  },
  onValueChange(e) {
    let arr = {
      queryStatus: e.detail.value,
    }

    this.setData({
      QueryData: Object.assign(this.data.QueryData, arr)
    })
    console.log(this.data.QueryData)
  },
  onConfirm() {
    wx.showLoading({
      title: '正在加载...',
    })
    OneRequests(this.data.QueryData).then(res => {
      this.setData({
        CardListData: res.data.data
      })
      wx.hideLoading()
    })
  },
  ApplyBusiness(data) {
    console.log(data)
    let queryData = {
      company_code: data.currentTarget.dataset.code.company_code
    }
    ApplyBusinessData(queryData).then(res => {
      if (res.data.code == 1) {
        this.getFirmData()
      }
    })
  },
  dialPhone(e) {
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        var data = {
          avatarUrl: res.userInfo.avatarUrl,
          city: res.userInfo.city,
          country: res.userInfo.country,
          nickName: res.userInfo.nickName,
          openid: app.globalData.openid
        }
        WeChatUserInfo(data).then(res => {
          console.log(res)
        })
      }
    })
  }
})