// pages/user/user.js
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify';

var util = require("../../utils/util.js");
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userdata : null,
    statCode: null,
    senderId:null,
    receiverId:null,
    userId:null,
    toUserId:null,
    array:['invite received','accept','reject','schedule full'],
    index:0,
    chattime:null,
    address:null
  },

  chatClick: function() {
    var that = this;
    wx.request({
      url: app.globalData.alfasommetUrl +'/invitations',
      header: { 
        'token': app.globalData.token 
      },
      method: 'post',
      responseType: 'text',
      data: {
        "senderId":app.globalData.userId,
        "receiverId":this.data.toUserId
      },
      success: function(res) {
        console.log(res);
        if(res.data.stat == 0) {
          that.setData({ statCode: 4 });
        }
        else {
          Notify('Fail to invite');
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var unixtime = options.chatTime;
    var inputTime = parseInt(unixtime);
    console.log("------------------")
    console.log(inputTime)
    var date = new Date(inputTime);
    console.log(date);

    var h = date.getHours();

    var m = date.getMinutes();

    var stringTime = h + ":" + m;
    console.log(stringTime)
    this.setData({
      navH: app.globalData.navHeight
    })
    this.setData({
      statCode:options.statCode,
      senderId:options.senderId,
      receiverId:options.receiverId,
      toUserId:options.toUserId,
      userId:app.globalData.userId,
      chattime:stringTime,
      address:options.address
    });
    // console.log(this.data.navH);
    this.setData({userdata:options});
    console.log(this.data.userdata)
  },




  accept:function() {
    var that = this;
    wx.request({
      url: app.globalData.alfasommetUrl +'/invitations/accept',
      data: {
        "senderId": this.data.senderId,
        "receiverId": this.data.receiverId
      },
      header: {
        'token': app.globalData.token
      },
      method: 'post',
      responseType: 'text',
      success: function (res) {
        console.log('---------------------------');
        console.log(res)
        if (res.data.stat == 1) {
          that.setData({
            statCode: 1
          })
        }
        else {
          Notify('Fail to accept');
        }
      },
      fail: function (res) {
        Notify('Fail to accept');
      },
      complete: function (res) { },
    })
  },


  deny:function() {
    var that = this;
    wx.request({
      url: app.globalData.alfasommetUrl +'/invitations/reject',
      data: {
        "senderId": this.data.senderId,
        "receiverId": this.data.receiverId
      },
      header: {
        'token': app.globalData.token
      },
      method: 'post',
      responseType: 'text',
      success: function (res) {
        console.log('---------------------------');
        console.log(res)
        if (res.data.stat == 2) {
          that.setData({
            statCode: 2
          })
        }
        else {
          Notify('Fail to reject');
        }
      },
      fail: function (res) {
        Notify('Fail to reject');
      },
      complete: function (res) { },
    })
  },




  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if(e.detail.value == 1) {
      var that = this;
      wx.request({
        url: app.globalData.alfasommetUrl +'/invitations/accept',
        data: {
          "senderId": this.data.senderId,
          "receiverId": this.data.receiverId
        },
        header: {
          'token': app.globalData.token 
        },
        method: 'post',
        responseType: 'text',
        success: function(res) {
          console.log('---------------------------');
          console.log(res)
          if(res.data.stat == 1) {
            that.setData({
              statCode: 1
            })
          }
          else {
            Notify('Fail to accept');
          }
        },
        fail: function(res) {
          Notify('Fail to accept');
        },
        complete: function(res) {},
      })
    }

    else if (e.detail.value == 2) {
      var that = this;
      wx.request({
        url: app.globalData.alfasommetUrl +'/invitations/reject',
        data: {
          "senderId": this.data.senderId,
          "receiverId": this.data.receiverId
        },
        header: {
          'token': app.globalData.token
        },
        method: 'post',
        responseType: 'text',
        success: function (res) {
          console.log('---------------------------');
          console.log(res)
          if (res.data.stat == 2) {
            that.setData({
              statCode: 2
            })
          }
          else {
            Notify('Fail to reject');
          }
        },
        fail: function (res) {
          Notify('Fail to reject');
        },
        complete: function (res) { },
      })
    }

    else if (e.detail.value == 3) {
      var that = this;
      wx.request({
        url: app.globalData.alfasommetUrl +'/invitations/reject',
        data: {
          "senderId": this.data.senderId,
          "receiverId": this.data.receiverId
        },
        header: {
          'token': app.globalData.token
        },
        method: 'post',
        responseType: 'text',
        success: function (res) {
          console.log('---------------------------');
          console.log(res)
          if (res.data.stat == 3) {
            that.setData({
              statCode: 3
            })
          }
          else {
            Notify('Fail to schedule full');
          }
        },
        fail: function (res) {
          Notify('Fail to schedule full');
        },
        complete: function (res) { },
      })
    }

    this.setData({
      index: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  backClick: function () {
    wx.navigateBack({
      delta: 1,
    })
  }

})