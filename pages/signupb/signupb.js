// pages/signupb/signupb.js
const app = getApp()
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    email:'',
    phone:'',
    pwd:'',
    genderArray:['M','F']
  },

  backClick: function () {
    wx.navigateBack({
      delta: 1,
    })
  },

  onChangeUsername: function (event) {
    console.log(event.detail);
    this.setData({
      username: event.detail
    })
  },

  onChangeEmail: function (event) {
    console.log(event.detail);
    this.setData({
      email: event.detail
    })
  },

  onChangePhone: function (event) {
    console.log(event.detail);
    this.setData({
      phone: event.detail
    })
  },

  onChangePwd: function (event) {
    console.log(event.detail);
    this.setData({
      pwd: event.detail
    })
  },

  signup:function (event) {
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2];
    var preprePage = pages[pages.length - 3];
    if (preprePage.data.fname != '' && preprePage.data.lname != '' && prePage.data.position != '' && prePage.data.company != '' && this.data.username != '' && this.data.email != '' && this.data.phone != '' && this.data.password != ''){
      wx.request({
        url: app.globalData.alfasommetUrl +'/users/signup',
        data: {
          firstName: preprePage.data.fname,
          lastName: preprePage.data.lname,
          gender: this.data.genderArray[preprePage.data.index],
          position: prePage.data.position,
          company: prePage.data.company,
          username: this.data.username,
          email: this.data.email,
          phone: this.data.phone,
          password: this.data.pwd,
        },

        // data:{
        //   "_id": "5c8b0a04969b262bd64cdb2d",
        //   "username": "proaaa",
        //   "email": "proaaa@qq.com",
        //   "firstName": "pro",
        //   "lastName": "aaa",
        //   "gender": "M",
        //   "company": "beijing",
        //   "position": "beijing",
        //   "phone":"1980909000",
        //   "device": "",
        //   "currentSummit": "ms0001",
        //   "waitForSignUp": false,
        //   "__v": 0
        // },


        header: {},
        method: 'post',
        responseType: 'text',
        success: function (res) {
          console.log(res.statusCode);
          if (res.statusCode == "200") {
            app.globalData.token = res.data.token;
            console.log(res.data);
            app.globalData.userId = res.data.id;

            wx.setStorage({
              key: 'token',
              data: res.data.token,
            })

            wx.setStorage({
              key: 'userId',
              data: res.data.id,
            })
            
            wx.navigateTo({
              url: '../questionaire/questionaire',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
          else {
            Notify('Fail to login');
          }
        },
        fail: function (res) {
          Notify('Fail to login');
        },
        complete: function (res) { },
      })
    }
    else {
      Notify('Fail to signup');
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})