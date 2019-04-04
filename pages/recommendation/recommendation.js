import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
const app = getApp()

function sortScore(a,b) {
  return a.score - b.score
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ttoken:null,
    currentUserId:null,
    list:[],
    navH:null,
    invition:false,
    iconColor:"gray",
    itemJson:'',
    invitionStat:['Invite sent','received','accepted','rejected','schedule full']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    this.setData({
      navH:app.globalData.navHeight,
      ttoken:app.globalData.token,
      currentUserId:app.globalData.userId
    });
    console.log(this.data.navH)
    wx.request({
      url: app.globalData.alfasommetUrl +'/recommendations?pageIndex=1&pageSize=2&userId=' + app.globalData.userId,
      data: '',
      header: {"token":app.globalData.token},
      method: 'GET',
      responseType: 'text',
      success: function(res) {
        console.log(res.statusCode);
        console.log(res.data);
        _this.setData({
          list:res.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
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
    var _this = this;
    this.setData({
      navH: app.globalData.navHeight,
      ttoken: app.globalData.token,
      currentUserId: app.globalData.userId
    });
    console.log(this.data.navH)
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
    var that = this;
    wx.request({
      url: app.globalData.alfasommetUrl + '/recommendations?pageIndex=1&pageSize=1000&userId=' + app.globalData.userId,
      data: '',
      header: { "token": app.globalData.token },
      method: 'GET',
      responseType: 'text',
      success: function (res) {
        console.log(res.statusCode)
        console.log(res.data);
        that.setData({
          list: res.data.sort(sortScore)
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
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

  showInvition: function () {
    this.data.invition = !this.data.invition;
    console.log(this.data.invition)
    if(this.data.invition == true) {
      this.setData({
        iconColor:"black"
      });
      var invitationList = [];
      console.log(this.data.list);
      for(var item of this.data.list) {
        console.log(item)
        if(item.invitation != null) {
          invitationList.push(item);
        }
      }
      console.log(invitationList);
      this.setData({
        list:invitationList
      });

    }
    else if(this.data.invition == false){
      this.setData({
        iconColor:"gray"
      });

      var _this = this;
      this.setData({
        navH: app.globalData.navHeight,
        ttoken: app.globalData.token,
        currentUserId: app.globalData.userId
      });
      console.log(this.data.navH)
      wx.request({
        url: app.globalData.alfasommetUrl + '/recommendations?pageIndex=1&pageSize=1000&userId=' + this.data.currentUserId,
        data: '',
        header: { "token": this.data.ttoken },
        method: 'GET',
        responseType: 'text',
        success: function (res) {
          console.log(res.statusCode)
          console.log(res.data);
          _this.setData({
            list: res.data.sort(sortScore)
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })      
    }
  },

  logout:function() {
    Dialog.confirm({
      title: 'Logout',
      message: 'are you sure you want to logout?'
    }).then(() => {
      app.globalData.token = null;
      app.globalData.userId = null;
      wx.clearStorage();
      wx.reLaunch({
        url: '../index/index',
      })
    }).catch(() => {
      // on cancel
    })
  }


})