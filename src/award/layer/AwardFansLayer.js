// 粉丝抽奖
var AwardFansLayer = cc.Layer.extend({

	_awardLabel : null,
	_start : false,
	_awardSprite:null,
	_shareUrl:null,
	_level:null,
	_score:0,
	
	ctor:function (score) {
		this._super();
		var self = this;
		this._score = score;
		var pocket = new cc.Sprite(res.award_pocket_fans);
		pocket.attr({
			anchorX : 0.5,
			anchorY : 1,
			x : cc.winSize.width/2,
			y : cc.winSize.height - 40
		});
		if (cc.director.getWinSize().width <= CONFIG.SCALE_WIDTH) {
			pocket.setScaleX(0.5);
			pocket.setScaleY(0.5);
		}
		this.addChild(pocket);
		
		this._awardLabel = new cc.LabelTTF("-点击领奖-", "微软雅黑", 32, cc.size(150, 40), cc.TEXT_ALIGNMENT_CENTER);
		this._awardLabel.color = cc.color(255, 255, 255, 1);
		this._awardLabel.attr({
			anchorX: 0.5,
			anchorY: 0.5,
			x : cc.winSize.width/2,
			y : cc.winSize.height - 140
		});
		this._awardLabel.setScaleX(0.5);
		this._awardLabel.setScaleY(0.5);
		this.addChild(this._awardLabel);
		this._awardLabel.runAction(cc.blink(2, 10).repeatForever());
		
		cc.eventManager.addListener({
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan:function () {
				if (self._start == true) {
					return;
				}
				pocket.removeFromParent();
				self._start = true;
				self._awardLabel.removeFromParent(true);
				self.addAward();
				var callback = function (response) { 
					cc.log(response);
					var jsonData = JSON.parse(response);              
					if(jsonData){ 
						if (!jsonData.result) {
							alert(jsonData.desc);
							return;
						} 
						self._shareUrl = jsonData.helpUrl;
						self._level = jsonData.award.level;
						self.showAward(jsonData.award);
					}
				};
				var errorcallback = function (response) {         
					alert(response);  
				};
				var params = "openid=" + CONFIG.OPENID;
				request(CONFIG.SERVER_URL + CONFIG.SERVER_ACTION_AWARD, params, true, callback, errorcallback);
			}
		}, this._awardLabel);
	},
	
	// 奖品展示
	showAward :function(award) {
		this._awardSprite.stopAnim(award);
	},
	
	addAward:function() {
		var winsize = cc.director.getWinSize();
		this._awardSprite = new AwardSprite(this);
		this._awardSprite.attr({
			anchorX: 0.5,
			anchorY: 1,
			x : winsize.width / 2,
			y : winsize.height - 40
		});
		if (cc.director.getWinSize().width <= CONFIG.SCALE_WIDTH) {
			this._awardSprite.setScaleX(0.5);
			this._awardSprite.setScaleY(0.5);
		}
		this.addChild(this._awardSprite);
	},
	
	// 抽奖结束 更新UI
	updateUI:function(award) {
		var tips = new cc.LabelTTF(award.desc, "微软雅黑", 24, cc.size(600, 80), cc.TEXT_ALIGNMENT_CENTER);
		tips.color = cc.color(255, 252, 219, 1);
		tips.attr({			
			anchorX: 0.5,
			anchorY: 1,
			x : cc.winSize.width/2,
			y : cc.winSize.height - 10
		});
		tips.setScaleX(0.5);
		tips.setScaleY(0.5);
		this.addChild(tips);

		var code = new cc.LabelTTF("兑奖码：" + award.code, "微软雅黑", 40, cc.size(600, 50), cc.TEXT_ALIGNMENT_CENTER);
		code.color = cc.color(255, 252, 219, 1);
		code.attr({
			anchorX: 0.5,
			anchorY: 1,
			x : cc.winSize.width/2,
			y : this._awardSprite.y - this._awardSprite.getContentSize().height / 2 - 5
		});
		code.setScaleX(0.5);
		code.setScaleY(0.5);
		this.addChild(code);
		
		var helpLabel = new cc.LabelTTF("礼品搬不动?请两好友来帮助！！！", "微软雅黑", 28, cc.size(600, 40), cc.TEXT_ALIGNMENT_CENTER);
		helpLabel.color = cc.color(255, 252, 219, 1);
		helpLabel.attr({
			anchorX: 0.5,
			anchorY: 1,
			x : cc.winSize.width/2,
			y : code.y - code.getContentSize().height / 2
		});
		helpLabel.setScaleX(0.5);
		helpLabel.setScaleY(0.5);
		this.addChild(helpLabel);
		
		var helpNormal = new cc.Sprite(res.btn_help);
		var helpSelected = new cc.Sprite(res.btn_help);
		var helpDisabled = new cc.Sprite(res.btn_help);

		var helpBtn = new cc.MenuItemSprite(helpNormal, helpSelected, helpDisabled, this.help, this);
		var helpmenu = new cc.Menu(helpBtn);
		helpmenu.attr({
			anchorX: 0,
			anchorY: 0,
			x : cc.winSize.width/2,
			y : helpLabel.y - helpLabel.getContentSize().height / 2 - 20
		});
		helpmenu.setScaleX(0.5);
		helpmenu.setScaleY(0.5);
		this.addChild(helpmenu,1,2);
	},

	
	// 微信帮助分享
	help:function() {
		var desc = CONFIG.WX_DESC_HELP.format(this._score,this._level);
		initWX2(desc,this._shareUrl);
		var shareLayer = new ShareLayer(2);
		g_awardFansScene.addChild(shareLayer);
	}
});












