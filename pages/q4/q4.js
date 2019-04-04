import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';


const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    answera:'',
    answerb:'',
    answerc:''
  },

  backClick: function () {
    wx.navigateBack({
      delta: 1,
    })
  },

  answerInput1: function (event) {
    console.log(event.detail.value);
    this.setData({ answera: event.detail.value });
  },


  answerInput2: function (event) {
    console.log(event.detail.value);
    this.setData({ answerb: event.detail.value });
  },


  answerInput3: function (event) {
    console.log(event.detail.value);
    this.setData({ answerc: event.detail.value });
  },


  next: function () {
    if(this.data.answera!='' && this.data.answerb != '' && this.data.answerc!= '') {
      var pages = getCurrentPages();
      var prePage = pages[pages.length - 2];
      var preprePage = pages[pages.length - 3];
      var prepreprePage = pages[pages.length - 4];
      wx.request({
        url: app.globalData.alfasommetUrl + '/summit/join',
        data: {
          'code': app.globalData.summitId,
        },
        header: { 'token': app.globalData.token },
        method: 'post',
        responseType: 'text',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      wx.request({
        url: app.globalData.alfasommetUrl +'/summit/questionaire',
        data: {
          summitId: app.globalData.summitId,
          questionaireId: 'qsn0001',
          questions: [
            {
              questionId: '0',
              answer: this.data.answera
            },
            {
              questionId: '1',
              answer: this.data.answerb
            },
            {
              questionId: '2',
              answer: this.data.answerc
            },
            {
              questionId: '3',
              answer: prepreprePage.data.answer1
            },
            {
              questionId: '4',
              answer: preprePage.data.answer2
            },
            {
              questionId: '5',
              answer: prePage.data.answer3
            }
          ]
        },
        header: {
          token: app.globalData.token
        },
        method: 'post',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log(res.statusCode)
          console.log(res.statusCode == "200")
          if (res.statusCode == "200") {
            wx.reLaunch({
              url: '../recommendation/recommendation',
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
          }
          else {
            console.log('=================================')
          }
        },
        fail: function (res) {
          console.log(res)
        },
        complete: function (res) { },
      })
      
    }


    // wx.navigateTo({
    //   url: '../recommendation/recommendation',
    //   success: function (res) { },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })
  },

  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
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