//index.js
//获取应用实例
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify';
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    summitcode:null,
    questions:[],
    questionFilled:false,
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
    wx.getStorage({
      key: 'token',
      success: function(res) {
        app.globalData.token = res.data;
      },
    });
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        app.globalData.userId = res.data;
      },
    })
  }
,

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

  enterBtnClick:function() {
    if (this.data.summitcode != 'ms0001' && this.data.summitcode != 'ez330'){
      Notify('summit not found')
    }
    else {
      console.log(this.data.summitcode);
      console.log(app.globalData.token);
      var that = this;
      console.log(app.globalData.token)
      if (app.globalData.token != null) {
        wx.request({
          url: app.globalData.alfasommetUrl + '/summit/join',
          data: {
            code: this.data.summitcode,
          },
          header: { 'token': app.globalData.token },
          method: 'post',
          responseType: 'text',
          success: function (res) {
            console.log(res);
            if (res.data != '404') {
              console.log(that.data.summitcode);
              wx.request({
                url: app.globalData.alfasommetUrl + '/summit/questionaire/' + that.data.summitcode + '?',
                header: { 'token': app.globalData.token },
                method: 'GET',
                responseType: 'text',
                success: function (res) {
                  that.setData({
                    // questions: res.data.pages,
                    questionFilled: res.data.questionaireFilled
                  })
                  console.log("summit questionaire api call success");
                  console.log(res);
                  if (res.data.questionaireFilled == true) {
                    wx.redirectTo({
                      url: '../recommendation/recommendation',
                      success: function (res) { },
                      fail: function (res) { },
                      complete: function (res) { },
                    })

                    console.log(res)
                  }
                  else if (res.data.questionaireFilled == false) {
                    wx.redirectTo({
                      url: '../questionaire/questionaire',
                    });
                  }
                  else {
                    Notify('Fail to join');
                  }
                },
                fail: function (res) {
                  Notify('Fail to join');
                },
                complete: function (res) { },
              })
            }
            else {
              Notify('Fail to join');
            }
          }
          ,
          fail: function (res) {
            wx.redirectTo({
              url: '../login/login',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          },
          complete: function (res) { },
        })
      }
      else {
        wx.redirectTo({
          url: '../login/login',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    }
  },

  codeInput:function(event) {
    console.log(event.detail.value);
    this.setData({summitcode:event.detail.value});
    app.globalData.summitId=event.detail.value;
  }

})
