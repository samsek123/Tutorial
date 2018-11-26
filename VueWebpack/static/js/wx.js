//////////////////////////////Share Stuff
var url = encodeURIComponent(window.location.href);
var serverLink = "http://clients.atwemine.cn/ust_valentine/api/jssdk.php?url="+url;
$.get(serverLink , function( data ) {
 wx.config({
   debug: false, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
   appId: 'wx650f398bb399f537', // 必填，公众号的唯一标识
   timestamp: data.timestamp, // 必填，生成签名的时间戳
   nonceStr: data.noncestr, // 必填，生成签名的随机串
   signature: data.signature,// 必填，签名，见附录 1
   jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的 JS 接口列表，所有 JS 接口列表见附录 2
 });

 wx.ready(function(){
   wx.onMenuShareTimeline({
     title: '极速投票选出今季最动人的科大爱情故事！！', // 分享标题
     link: 'http://clients.atwemine.cn/ust_valentine/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
     imgUrl: 'http://clients.atwemine.cn/ust_valentine/img/cover_WC.jpg', // 分享图标
     success: function () {
     },
     cancel: function () {
       // 用户取消分享后执行的回调函数
     }
   });

   wx.onMenuShareAppMessage({
     title: '极速投票选出今季最动人的科大爱情故事！！', // 分享标题
     desc: '这个情人节，动动手指，选出你最喜爱的科大爱情故事!', // 分享描述
     link: 'http://clients.atwemine.cn/ust_valentine/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
     imgUrl: 'http://clients.atwemine.cn/ust_valentine/img/cover_WC.jpg', // 分享图标
     type: 'link', // 分享类型,music、video或link，不填默认为link
     dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
     success: function () {
     },
     cancel: function () {
       // 用户取消分享后执行的回调函数
     }
   });
 });
});
