import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';


const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    answer3:''
  },

  backClick: function () {
    wx.navigateBack({
      delta: 1,
    })
  },

  answerInput: function (event) {
    console.log(event.detail.value);
    this.setData({ answer3: event.detail.value });
  },

  next: function () {
    if(this.data.answer3){
      wx.navigateTo({
        url: '../q4/q4',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
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