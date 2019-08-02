//index.js
//获取应用实例
const app = getApp();
import {
  setX_Token
} from '../../utils/requests.js'
import {
  $startWuxRefresher,
  $stopWuxRefresher,
  $stopWuxLoader
} from '../../static/wux/index.js'

import {
  GetUserInfo
} from '../composen/Login.js'
import {
  OneRequests,
  ApplyBusinessData,
  cancleApplyFunc
} from '../../http/Home/action.js'
import {
  WeChatUserInfo,
  WeChatLogin,
  WeChatAllData
} from '../../http/Login/index.js'
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isSuper: "",
    userId: "",
    Token: undefined,
    QueryData: {
      page: 1,
      queryData: "",
      queryPeople: "",
      queryStatus: "",
    },
    CardListData: [],
    displayValue1: '请选择',
    SlectStausValue: "",
    SlectStausPeople: "",
    SlectStausPeopleOption: [],
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
  onRefresh() {
    console.log('onRefresh')
    this.data.QueryData.page = 1
    this.setData({
      QueryData: this.data.QueryData
    })
    this.getFirmData()
    $stopWuxRefresher('#refresherData', this, true)
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
    setX_Token().then(() => {
      this.getFirmData()
    })
  },

  getFirmData() {
    wx.showLoading({
      title: '正在加载...',
    })
    OneRequests(this.data.QueryData).then((res) => {
      this.setData({
        CardListData: res.data.data,
        SlectStausPeopleOption: res.data.queryPeopleList,
        isSuper: res.data.isSuper.isSuper,
        userId: app.globalData.UserAllInfo.id
      })
      wx.hideLoading()
    })
  },
  onReachBottom(e) {
    var page = this.data.QueryData.page
    page += 1
    this.setData({
      ['QueryData.page']: page
    })
    console.log(this.data.QueryData.page)
    wx.showLoading({
      title: '加载中...',
    })
    OneRequests(this.data.QueryData).then((res) => {
      var PageData = this.data.CardListData
      PageData.push(...res.data.data)
      this.setData({
        CardListData: PageData
      })
      wx.hideLoading()
    })
  },
  onValueChange(e) {
    let arr = {
      page: 1,
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
    console.log(this)
    let queryData = {
      company_code: data.currentTarget.dataset.code.company_code
    }
    var that = this
    ApplyBusinessData(queryData).then(res => {
      var user = {}
      if (res.data.code == 1) {
        wx.getStorage({
          key: 'UserAllInfo',
          success: function(res) {
            console.log(res.data)
            user = res.data
          },
          complete() {
            that.data.CardListData[data.currentTarget.dataset.index].status = 1
            that.data.CardListData[data.currentTarget.dataset.index].proposer = user.introduction;
            that.data.CardListData[data.currentTarget.dataset.index].proposerid = user.id
            that.setData({
              CardListData: that.data.CardListData
            })
            console.log(that.data.CardListData[data.currentTarget.dataset.index].proposerId = user.id)
          }
        })
      }
    })
  },
  cancleApply(data) {
    console.log(data)
    console.log(this.data.userId)
    let queryData = {
      id: data.currentTarget.dataset.code.company_code
    }
    if (this.data.userId == data.currentTarget.dataset.code.proposerid) {
      cancleApplyFunc(queryData).then((res) => {
        if (res.data.code == 1) {
          this.data.CardListData[data.currentTarget.dataset.index].status = 0
          this.data.CardListData[data.currentTarget.dataset.index].proposer = null;
          this.data.CardListData[data.currentTarget.dataset.index].proposerId = null
          this.setData({
            CardListData: this.data.CardListData
          })
        }
      })
    } else {
      wx.showToast({
        title: '这不是您申请的',
        image: "../../static/img/lock.png"
      })
    }

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
        wx.setStorage({
          key: 'USER_INFO',
          data: res.userInfo,
        })
        var data = {
          avatarUrl: res.userInfo.avatarUrl,
          city: res.userInfo.city,
          country: res.userInfo.country,
          nickName: res.userInfo.nickName,
          openid: app.globalData.openid
        }
        WeChatUserInfo(data).then(res => {
          wx.login({
            success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              WeChatLogin(res).then((poson) => {
                wx.setStorage({
                  key: 'jwt',
                  data: poson.data.token,
                })
                this.setData({
                  Token: poson.data.token
                })
                setX_Token().then(() => {
                  var that = this
                  WeChatAllData().then((res) => {
                    app.globalData.UserAllInfo = res.data
                    console.log(app.globalData.UserAllInfo)
                    that.onReady()
                  })
                })
              })
            }
          })
        })
      }
    })
  }
})