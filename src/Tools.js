function getQueryString(name) {     
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");     
	var r = window.location.search.substr(1).match(reg);     
	if (r != null)
		return decodeURIComponent(r[2]);     
	return null; 
};

function request(url, params, isPost, callback, errorcallback){  
	cc.log("<Tools> request():" + url + " " + params + " " + isPost);
	if(url == null || url == '')         
		return;               
	var xhr = cc.loader.getXMLHttpRequest();     
	if(isPost){         
		xhr.open("POST",url);     
	}else{         
		xhr.open("GET",url);    
	}   

	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	xhr.onreadystatechange = function () {         
		if(xhr.readyState == 4 && xhr.status == 200){            
			var response = xhr.responseText;             
			if(callback)                 
				callback(response);         
		}else if(xhr.readyState == 4 && xhr.status != 200){             
			var response = xhr.responseText;             
			if(errorcallback)                 
				errorcallback(response);         
		}     
	};       
	if(params == null || params == ""){         
		xhr.send();     
	}else{         
		xhr.send(params);     
	} 
};

String.prototype.format = function(args) {
	var result = this;
	if (arguments.length > 0) {    
		if (arguments.length == 1 && typeof (args) == "object") {
			for (var key in args) {
				if(args[key]!=undefined){
					var reg = new RegExp("({" + key + "})", "g");
					result = result.replace(reg, args[key]);
				}
			}
		}
		else {
			for (var i = 0; i < arguments.length; i++) {
				if (arguments[i] != undefined) {
					var reg = new RegExp("({[" + i + "]})", "g");
					result = result.replace(reg, arguments[i]);
				}
			}
		}
	}
	return result;
}

function initWX (desc,type) {
	WeixinApi.ready(function(Api) {
		// 微信分享的数据
		var wxData = {
				"appId": "", // 服务号可以填写appId
				"imgUrl" : 'http://112.65.246.168/images/avatar.png',
				"link" : 'http://112.65.246.168/',
				//"desc" : '简直不敢相信，我共接到了' + resultScore + '分宝藏,你敢来挑战吗？',
				"desc" : desc,
				"title" : "怡万家-国王的宝藏"
		};

		// 分享的回调
		var wxCallbacks = {
				// 分享操作开始之前
				ready : function() {
					// 你可以在这里对分享的数据进行重组
				},
				// 分享被用户自动取消
				cancel : function(resp) {
					// 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
				},
				// 分享失败了
				fail : function(resp) {
					// 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
					alert("分享失败，msg=" + resp.err_msg);
				},
				// 分享成功
				confirm : function(resp) {
					// 分享成功了，我们是不是可以做一些分享统计呢？
					if(type == CONFIG.WX_SHARD_AWARD) {
						CONFIG.SHARE_SUCCESS = true;
					}
				},
				// 整个分享过程结束
				all : function(resp,shareTo) {
					// 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
					//alert("分享" + (shareTo ? "到" + shareTo : "") + "结束，msg=" + resp.err_msg);
				}    
		};

		// 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
		Api.shareToFriend(wxData, wxCallbacks);

		// 点击分享到朋友圈，会执行下面这个代码
		Api.shareToTimeline(wxData, wxCallbacks);

		// 点击分享到腾讯微博，会执行下面这个代码
		//Api.shareToWeibo(wxData, wxCallbacks);

		// iOS上，可以直接调用这个API进行分享，一句话搞定
		//Api.generalShare(wxData,wxCallbacks);

		/*			// 有可能用户是直接用微信“扫一扫”打开的，这个情况下，optionMenu、toolbar都是off状态
		// 为了方便用户测试，我先来trigger show一下
		// optionMenu
		var elOptionMenu = document.getElementById('optionMenu');
		elOptionMenu.click(); // 先隐藏
		elOptionMenu.click(); // 再显示
		// toolbar
		var elToolbar = document.getElementById('toolbar');
		elToolbar.click(); // 先隐藏
		elToolbar.click(); // 再显示
		 */		});
}

function initWX2(desc,helpUrl) {
	WeixinApi.ready(function(Api) {
		// 微信分享的数据
		var wxData = {
				"appId": "", // 服务号可以填写appId
				"imgUrl" : 'http://112.65.246.168/images/avatar.png',
				"link" : helpUrl,
				//"desc" : '简直不敢相信，我共接到了' + resultScore + '分宝藏,你敢来挑战吗？',
				"desc" : desc,
				"title" : "怡万家-国王的宝藏"
		};

		// 分享的回调
		var wxCallbacks = {
				// 分享操作开始之前
				ready : function() {
					// 你可以在这里对分享的数据进行重组
					alert(helpUrl);
				},
				// 分享被用户自动取消
				cancel : function(resp) {
					// 你可以在你的页面上给用户一个小Tip，为什么要取消呢？

				},
				// 分享失败了
				fail : function(resp) {
					// 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
					alert("分享失败，msg=" + resp.err_msg);
				},
				// 分享成功
				confirm : function(resp) {
					// 分享成功了，我们是不是可以做一些分享统计呢？

				},
				// 整个分享过程结束
				all : function(resp,shareTo) {
					// 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
					//alert("分享" + (shareTo ? "到" + shareTo : "") + "结束，msg=" + resp.err_msg);
				}    
		};

		// 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
		Api.shareToFriend(wxData, wxCallbacks);

		// 点击分享到朋友圈，会执行下面这个代码
		Api.shareToTimeline(wxData, wxCallbacks);

		// 点击分享到腾讯微博，会执行下面这个代码
		//Api.shareToWeibo(wxData, wxCallbacks);

		// iOS上，可以直接调用这个API进行分享，一句话搞定
		//Api.generalShare(wxData,wxCallbacks);

		/*			// 有可能用户是直接用微信“扫一扫”打开的，这个情况下，optionMenu、toolbar都是off状态
		// 为了方便用户测试，我先来trigger show一下
		// optionMenu
		var elOptionMenu = document.getElementById('optionMenu');
		elOptionMenu.click(); // 先隐藏
		elOptionMenu.click(); // 再显示
		// toolbar
		var elToolbar = document.getElementById('toolbar');
		elToolbar.click(); // 先隐藏
		elToolbar.click(); // 再显示
		 */		});
}
