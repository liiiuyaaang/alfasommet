const app=getApp()
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:null,
    password:null
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
    app.globalData.userId = null;
    app.globalData.token = null;
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

  usernameInput: function (e) {
    var uname = e.detail.value;
    if (uname != ''){
      this.setData({ username: uname });
    }
  },

  passwordInput: function (e) {
    var pwd = e.detail.value;
    if(pwd != ''){
      this.setData({ password:pwd });
    }
  },
  signupBtnTap: function (e) {
    wx.navigateTo({
      url: '../signup/signup',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
  ,

  login: function (e) {
    // var pages = getCurrentPages();
    // var pageIndex = pages[pages.length - 2];
    var summitId = app.globalData.summitId;
    wx.request({
      url: app.globalData.alfasommetUrl +'/users/signin',
      data: {
        username:this.data.username,
        password:this.data.password,
      },
      header: {},
      method: 'post',
      responseType: 'text',
      success: function(res) {
        console.log("api call ok!");
        console.log(res.statusCode);
        console.log(res.data.token);
        if(res.statusCode == "200"){
          app.globalData.token = res.data.token;
          console.log(res.data);
          app.globalData.userId = res.data.id;
          wx.setStorage({
            key: 'token',
            data: res.data.token
          })
          wx.setStorage({
            key: 'userId',
            data: res.data.id
          })
          wx.request({
            url: app.globalData.alfasommetUrl +'/summit/questionaire/' + summitId + '?',
            header: { 'token': app.globalData.token },
            method: 'GET',
            responseType: 'text',
            success: function(res) {
              if(res.statusCode==200){
                if (res.data.questionaireFilled == false) {
                  wx.navigateTo({
                    url: '../questionaire/questionaire',
                  })
                }
                else if(res.data.questionaireFilled == true) {
                  wx.navigateTo({
                    url: '../recommendation/recommendation',
                  })
                }

                else {
                  Notify('Fail to login');
                }

              }
            },
            fail: function(res) {
              Notify('Fail to login');
            },
            complete: function(res) {},

          })
        }
        else{
          Notify('Fail to login')
        }
      },
      fail: function(res) {
        Notify('Fail to login')
      },
      complete: function(res) {},
    })
  }

})