// pages/MyClient/MyClient.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    UserInfo: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.GetUserInfo()
  },

  GetUserInfo() {
    var that = this
    wx.getStorage({
      key: 'USER_INFO',
      success: function(res) {
        that.setData({
          UserInfo: res.data
        })
      },
    })
    console.log(this.data.UserInfo)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.GetUserInfo();
  },
  SkipPage() {
    wx.navigateTo({
      url: "../SpecialBuiness/SpecialBuiness",
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
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
  onShareAppMessage: function() {

  }
})