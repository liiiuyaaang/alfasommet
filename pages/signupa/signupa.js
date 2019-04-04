// pages/signupa/signupa.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    company:'',
    position:''
  },

  backClick:function () {
    wx.navigateBack({
      delta: 1,
    })
  },

  onChangeCompany(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      company: event.detail
    })
  },

  onChangePosition(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      position: event.detail
    })
  },

  nextClick:function () {
    wx.navigateTo({
      url: '../signupb/signupb',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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