/*
 * @Author: fanyong@gmail.com
 * @Date:   2017-07-17
 * @Create by:  FrankFan
 */

var BingHelper = (function() {
  var getBgImg = function() {
    var imgFullUrl = '';
    if (~window.location.host.indexOf('bing.com')) {
      var theDiv = document.getElementById('bgDiv');
      if (!theDiv) {
        console.log("%cNot Found the Element", "color:red;font-weight:bold;");
        return;
      }
      imgFullUrl = _getBingWallPaperBgImgPath(theDiv);
    } else {
      console.log("%c不在bing.com下", "color:red;font-weight:bold;");
    }
    return imgFullUrl;
  }

  var _getBingWallPaperBgImgPath = function(theDiv) {
    // 获取背景图片的 background-image 属性
    var bgImage = getComputedStyle(theDiv).backgroundImage;
    var regObj = bgImage.match(/url\("(\S*)"\)/);
    return regObj && regObj.length > 1 && regObj[1];
  }

  return {
    getBgImg: getBgImg,
  }
})();

// var bingLogo = document.querySelector('.hp_sw_logo.hpcLogoWhite');
var bingLogo = document.querySelector('#bLogo');
bingLogo && bingLogo.addEventListener('click', function() {
  var bgImgUrl = BingHelper.getBgImg();
  console.log("%c" + bgImgUrl, "color:red;font-weight:bold;");
  window.open(bgImgUrl, '_blank');
});

(function() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.what == "get") {
      var imgUrl = BingHelper.getBgImg() || '';
      sendResponse({ imgUrl: imgUrl });
    }
  });
})();
