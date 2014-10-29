var AwardFansLayer = cc.Layer.extend({

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
				self._awardLabel.removeFromParent(true);
				self.showAward();
			}
		}, this._awardLabel);
	},
	
	awardGuest :function(touch, event) {
		event.getCurrentTarget().removeFromParent(true);
		
		this._self.showAward();
		
	},
	
	showAward :function() {
		var tips = new cc.LabelTTF("游客您好！恭喜您获得6等奖哦！", "微软雅黑", 20, cc.size(300, 80), cc.TEXT_ALIGNMENT_CENTER);
		tips.color = cc.color(255, 255, 255, 1);
		tips.attr({			
			anchorX: 0.5,
			anchorY: 0.5,
			x : cc.winSize.width/2,
			y : cc.winSize.height - 100
		});
		this.addChild(tips);

		var code = new cc.LabelTTF("10098", "微软雅黑", 30, cc.size(150, 30), cc.TEXT_ALIGNMENT_CENTER);
		code.color = cc.color(255, 255, 255, 1);
		code.attr({
			anchorX: 0.5,
			anchorY: 0.5,
			x : cc.winSize.width/2,
			y : cc.winSize.height - 180
		});
		this.addChild(code);
	}
});