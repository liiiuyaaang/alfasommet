import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['Male', 'Female'],
    index : 0,
    fname:'',
    lname:'',
  },

  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  onChangeFname(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      fname:event.detail
    })
  },

  onChangeLname(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      lname: event.detail
    })
  },


  nextClick:function () {
    wx.navigateTo({
      url: '../signupa/signupa',
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
    
  },

  backClick: function () {
    wx.navigateBack({
      delta: 1,
    })
  }
})