let Token = ""
export function setX_Token() {
  let promise = new Promise(function(resolve, reject) {
    wx.getStorage({
      key: 'jwt',
      success: function(res) {
        Token = res.data
        resolve(Token)
      },
    })
  })
  return promise
}
let serverPath = "http://118.24.131.216:9527";
let serverPathDev = "http://127.0.0.1"
export function requests(url, data) {
  data = data || {};
  let promise = new Promise(function(resolve, reject) {
    wx.request({
      url: serverPath + url,
      header: {
        "X-Token": Token
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