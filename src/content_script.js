/*
 * @Author: fanyong@gmail.com
 * @Date:   2017-07-17
 * @Create by:  FrankFan
 */

var BingHelper = (function() {
  // "url("https://cn.bing.com/az/hprichbg/rb/UmbriaCastelluccio_ZH-CN9645718473_1920x1080.jpg")"
  var REG_BG_IMG = /[a-zA-z]+:\/\/[^\s]*.jpg|.png|.jpeg|.webp$/g
  var getBgImg = function() {
    if (~window.location.host.indexOf('bing.com')) {
      var theDiv = document.getElementById('bgDiv');
      if (!theDiv) {
        console.log("%cNot Found the Element", "color:red;font-weight:bold;");
        return;
      }
      var bgImgStr = window.getComputedStyle(theDiv ,null).getPropertyValue('background-image');
      var arrRes = bgImgStr.match(REG_BG_IMG);
      return (arrRes.length > 0) && arrRes[0];
    } else {
      console.log("%cnot bing.com", "color:red;font-weight:bold;");
    }
  }
  return {
    getBgImg: getBgImg,
  }
})();

var bingLogo = document.querySelector('.hp_sw_logo.hpcLogoWhite');
bingLogo && bingLogo.addEventListener('click', function() {
  BingHelper.getBgImg();
});

(function() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.what == "get") {
      var imgUrl = BingHelper.getBgImg() || '';
      sendResponse({ imgUrl: imgUrl });
    }
  });
})();
