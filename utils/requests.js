let Token=""
wx.getStorage({
  key: 'jwt',
  success: function (res) { 
    Token = res.data
  },
})
let serverPath = "http://127.0.0.1";
export function requests(url, data) {
  data = data || {};
  let promise = new Promise(function(resolve, reject) {
    wx.request({
      url: serverPath + url,
      header: {
        "X-Token":Token
      },
      data: data,
      method: "post",
      success(res) {
        resolve(res)
      },
      fail(res) {
        reject(res)
      },
      complete(res) {
        resolve(res)
      }
    })
  });
  return promise;
}