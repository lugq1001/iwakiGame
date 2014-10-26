var resultScore;

var ResultPanelSprite = cc.Sprite.extend({

	_score : null,
	
	ctor : function(score) {
		this._super();
		cc.log("<ResultPanelSprite> ctor()");
		this._score = score;
		resultScore = score;
		var w = this.width, h = this.height;
		
		
		// 标题
		var title = new cc.LabelTTF("游戏结束", "微软雅黑", 40);
		title.x = w/2;
		title.y = h - 50;
		title.textAlign = cc.LabelTTF.TEXT_ALIGNMENT_CENTER;
		title.width = w;
		title.color = cc.color(255, 255, 255);
		this.addChild(title);
		
		// 得分
		var score = new cc.LabelTTF("本次得分:" + this._score, "微软雅黑", 25);
		score.x = w/2;
		score.y = title.y - 50;
		score.textAlign = cc.LabelTTF.TEXT_ALIGNMENT_CENTER;
		score.width = w;
		score.color = cc.color(255, 255, 255);
		this.addChild(score);
		
		var againNormal = new cc.Sprite(res.btn_again);
		var againSelected = new cc.Sprite(res.btn_again);
		var againDisabled = new cc.Sprite(res.btn_again);

		var shareNormal = new cc.Sprite(res.btn_share);
		var shareSelected = new cc.Sprite(res.btn_share);
		var shareDisabled = new cc.Sprite(res.btn_share);

		var again = new cc.MenuItemSprite(againNormal, againSelected, againDisabled, this.playAgain, this);
		var share = new cc.MenuItemSprite(shareNormal, shareSelected, shareDisabled, this.share, this);

		var menu = new cc.Menu(again, share);
		menu.alignItemsVerticallyWithPadding(20);
		this.addChild(menu, 1, 2);
		menu.x = w / 2;
		menu.y = score.y - 100;
		
		if (WeixinApi.openInWeixin()) {
			WeixinApi.showOptionMenu();
			WeixinApi.showToolbar();
			this.initWX();
		}
		
	},
	
	playAgain: function() {
		cc.log("<ResultPanelSprite> playAgain");
		if (WeixinApi.openInWeixin()) {
			WeixinApi.hideOptionMenu();
			WeixinApi.hideToolbar();
		}
		if (CONFIG.SOUND_ON) {
			// 背景音乐
			cc.audioEngine.setMusicVolume(0.7);
			cc.audioEngine.playMusic(res.m_loop, true);
		}
		cc.director.runScene(new GameScene());
	},
	
	share: function() {
		if (!WeixinApi.openInWeixin()) {
			cc.log("share failed, weixin client not found");
			return
		}
		var shareLayer = new ShareLayer();
		g_resultScene.addChild(shareLayer);
	},
	
	initWX: function() {
		WeixinApi.ready(function(Api) {
			// 微信分享的数据
			var wxData = {
					"appId": "gh_0f1001950fad", // 服务号可以填写appId
					"imgUrl" : 'http://www.iwaki-china.com.cn/images/caipu.png',
					"link" : 'weixin://profile/gh_0f1001950fad',
					"desc" : '简直不敢相信，我共接到了' + resultScore + '分宝藏,你敢来挑战吗？',
					"title" : "怡万家-国王的宝藏"
			};

			// 分享的回调
			var wxCallbacks = {
					// 分享操作开始之前
					ready : function() {
						// 你可以在这里对分享的数据进行重组
						alert("准备分享");
					},
					// 分享被用户自动取消
					cancel : function(resp) {
						// 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
						alert("分享被取消，msg=" + resp.err_msg);
					},
					// 分享失败了
					fail : function(resp) {
						// 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
						alert("分享失败，msg=" + resp.err_msg);
					},
					// 分享成功
					confirm : function(resp) {
						// 分享成功了，我们是不是可以做一些分享统计呢？
						alert("分享成功，msg=" + resp.err_msg);
					},
					// 整个分享过程结束
					all : function(resp,shareTo) {
						// 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
						alert("分享" + (shareTo ? "到" + shareTo : "") + "结束，msg=" + resp.err_msg);
					}    
			};

			// 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
			Api.shareToFriend(wxData, wxCallbacks);

			// 点击分享到朋友圈，会执行下面这个代码
			Api.shareToTimeline(wxData, wxCallbacks);

			// 点击分享到腾讯微博，会执行下面这个代码
			Api.shareToWeibo(wxData, wxCallbacks);

			// iOS上，可以直接调用这个API进行分享，一句话搞定
			Api.generalShare(wxData,wxCallbacks);

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
});

