// pages/SpecialBuiness/SpecialBuiness.js
import {
  SpecialBuinsDataGet,
  reviseContentData,
  AddLogDataList
}
from '../../http/Home/Special.js'
import {
  setX_Token
} from '../../utils/requests.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SpeciaBusData: [],
    QueryData: {
      page: 1
    },
    index: undefined,
    SyncDaigPopul: false,
    EditorLogText: "",
    isEditorStatus: undefined,
    EditorData: {
      Logid: "",
      creatDate: "",
      editorUser: "",
      editorUserId: "",
      firmid: "",
      importRemarks: "",
      tailLog: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    setX_Token().then(() => {
      this.getSpeciaBusData()
    })
  },

  getSpeciaBusData() {
    SpecialBuinsDataGet(this.data.QueryData).then((res) => {
      if (res.data.code == 1) {
        this.setData({
          SpeciaBusData: res.data.data
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
  EditorLog(e) {
    console.log(e)
    this.setData({
      EditorLogText: this.data.EditorData.tailLog,
      SyncDaigPopul: true,
      isEditorStatus: true,
      EditorData: Object.assign(e.currentTarget.dataset.item)
    })
  },
  SyncDaigPopulClose() {
    this.setData({
      SyncDaigPopul: false
    })
  },
  EditorOnChange(e) {
    this.setData({
      'EditorData.tailLog': e.detail.value
    })
  },
  confirmLogData(e) {
    if (this.data.isEditorStatus == true) {
      this.setData({
        SyncDaigPopul: false
      })
      reviseContentData(this.data.EditorData).then((res) => {
        console.log(res)
        this.getSpeciaBusData()
      })
    }
    if (this.data.isEditorStatus == false) {
      var LogData = this.data.SpeciaBusData[this.data.index].UserLog.pop()
      var LoginText = this.data.EditorData.tailLog
      var data = {
        logData: {
          creatDate: LogData.creatDate,
          tailLog: LoginText
        },
        row: {
          firmCode: LogData.firmCode
        }
      };
      AddLogDataList(data).then((res) => {
        if (res.data.code == 1) {
          this.getSpeciaBusData()
          this.setData({
            SyncDaigPopul: false
          })
        }
      })
    }
  },

  InitDate() {
    var date = new Date();
    //年
    var year = date.getFullYear();
    //月
    var month = date.getMonth() + 1;
    //日
    var day = date.getDate();
    //时
    var hh = date.getHours();
    //分
    var mm = date.getMinutes();
    //秒
    var ss = date.getSeconds();
    var rq = year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
    return rq;
  },
  addLogData(e) {
    var index = e.currentTarget.dataset.index
    console.log(e)
    var UserLogArr = e.currentTarget.dataset.alldata.UserLog
    var UserInfo = [];
    wx.getStorage({
      key: 'UserAllInfo',
      success: function(res) {
        UserInfo = res.data
      },
    })
    let LogArr = {
      creatDate: this.InitDate(),
      editorUser: "",
      editorUserId: "",
      firmid: e.currentTarget.dataset.alldata.id,
      importRemarks: "",
      tailLog: "",
      firmCode: e.currentTarget.dataset.alldata.firmCode
    }

    UserLogArr.push(LogArr)
    this.data.SpeciaBusData[index].UserLog = UserLogArr
    this.setData({
      SpeciaBusData: this.data.SpeciaBusData,
      SyncDaigPopul: true,
      isEditorStatus: false,
      index: index
    })
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