// http://blog.chenqiushi.com/2014/03/31/chrome插件开发入门（二）-消息传递机制/
// https://developer.chrome.com/extensions/messaging#simple
// http://open.chrome.360.cn/extension_dev/samples.html#contextMenus

function genericOnClick(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {what: "get"}, function(response) {
            if (response.imgUrl) {
                chrome.tabs.create({ url: response.imgUrl });
            } else {
                console.log('Not Found Image Url.');
            }
        });
    });
}
chrome.contextMenus.removeAll();
chrome.contextMenus.create({
    title: 'Get Bing Wallpaper',
    contexts: ['page'],
    onclick: genericOnClick,
    documentUrlPatterns: ['*://*.bing.com/*']
});
