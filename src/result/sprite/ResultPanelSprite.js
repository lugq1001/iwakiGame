var resultScore;

var ResultPanelSprite = cc.Sprite.extend({

	_score : null,
	
	ctor : function(score) {
		this._super();
		cc.log("<ResultPanelSprite> ctor()");
		
		this._score = score;
		resultScore = score;
		var w = this.width, h = this.height;
		if (WeixinApi.openInWeixin()) {
			WeixinApi.showOptionMenu();
			WeixinApi.showToolbar();
			var desc = CONFIG.WX_DESC_DEFAULT;
			initWX(desc.format(this._score,-1));
		}
		
		/*// 标题
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
		this.addChild(score);*/
		
		var againNormal = new cc.Sprite(res.btn_again);
		var againSelected = new cc.Sprite(res.btn_again);
		var againDisabled = new cc.Sprite(res.btn_again);

		var shareNormal = new cc.Sprite(res.btn_share);
		var shareSelected = new cc.Sprite(res.btn_share);
		var shareDisabled = new cc.Sprite(res.btn_share);
		
		var awardNormal = new cc.Sprite(res.btn_award);
		var awardSelected = new cc.Sprite(res.btn_award);
		var awardDisabled = new cc.Sprite(res.btn_award);

		var again = new cc.MenuItemSprite(againNormal, againSelected, againDisabled, this.playAgain, this);
		var share = new cc.MenuItemSprite(shareNormal, shareSelected, shareDisabled, this.share, this);
		var award = new cc.MenuItemSprite(awardNormal, awardSelected, awardDisabled, this.award, this);

		var menu = new cc.Menu(again, share, award);
		menu.alignItemsVerticallyWithPadding(10);
		menu.attr({
			anchorX: 0.5,
			anchorY: 1,
			x: 0,
			y: 160
		});
		this.addChild(menu, 1, 2);
		
		
		
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
		var desc;
		if (CONFIG.OPENID == "") {
			desc = CONFIG.WX_DESC_GUEST.format(this._score)
		} else {
			desc = CONFIG.WX_DESC_SERVICE.format(this._score)
		}
		initWX(desc,CONFIG.WX_SHARD_AWARD);
		var shareLayer = new ShareLayer(1);
		g_resultScene.addChild(shareLayer);
	},
	
	award: function() {
		if (CONFIG.SHARE_SUCCESS) {
			alert("share success");
			CONFIG.SHARE_SUCCESS = false;
			return;
		}
		
		var desc;
		if (CONFIG.OPENID == "") {
			desc = CONFIG.WX_DESC_GUEST.format(this._score)
		} else {
			desc = CONFIG.WX_DESC_SERVICE.format(this._score)
		}
		initWX(desc,CONFIG.WX_SHARD_AWARD);
		var shareLayer = new ShareLayer(0);
		g_resultScene.addChild(shareLayer);
	},

});

