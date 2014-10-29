var AwardGuestLayer = cc.Layer.extend({

	_awardLabel : null,
	
	ctor:function () {
		this._super();
		var self = this;
		this._awardLabel = new cc.LabelTTF("-点击领奖-", "微软雅黑", 16, cc.size(150, 30), cc.TEXT_ALIGNMENT_CENTER);
		this._awardLabel.color = cc.color(255, 255, 255, 1);
		this._awardLabel.attr({
			anchorX: 0.5,
			anchorY: 0.5,
			x : cc.winSize.width/2,
			y : cc.winSize.height - 180
		});
		this.addChild(this._awardLabel);
		this._awardLabel.runAction(cc.blink(2, 10).repeatForever());

		cc.eventManager.addListener({
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan:function () {
				var str = "抽奖中...";
				if (self._awardLabel.getString() == str) {
					return;
				}
				self._awardLabel.setString("抽奖中...");
				var callback = function (response) { 
					cc.log(response);
					var jsonData = JSON.parse(response);              
					if(jsonData){ 
						if (!jsonData.result) {
							alert(jsonData.desc);
							return;
						} 
						self._awardLabel.removeFromParent(true);
						self.showAward(jsonData.award.desc,jsonData.award.code);
					}
				};
				var errorcallback = function (response) {         
					alert(response);  
				};
				var params = "openid=" + CONFIG.OPENID;

				// 提交分数
				request(CONFIG.SERVER_URL + CONFIG.SERVER_ACTION_AWARD, params, true, callback, errorcallback);
			}
		}, this._awardLabel);
	},
	
	showAward :function(desc,code) {
		var tips = new cc.LabelTTF(desc, "微软雅黑", 20, cc.size(300, 80), cc.TEXT_ALIGNMENT_CENTER);
		tips.color = cc.color(255, 255, 255, 1);
		tips.attr({			
			anchorX: 0.5,
			anchorY: 0.5,
			x : cc.winSize.width/2,
			y : cc.winSize.height - 100
		});
		this.addChild(tips);

		var code = new cc.LabelTTF(code, "微软雅黑", 22, cc.size(150, 25), cc.TEXT_ALIGNMENT_CENTER);
		code.color = cc.color(255, 255, 0, 1);
		code.attr({
			anchorX: 0.5,
			anchorY: 0.5,
			x : cc.winSize.width/2,
			y : cc.winSize.height - 170
		});
		this.addChild(code);
	}
});