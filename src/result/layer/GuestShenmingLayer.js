var GuestShenmingLayer = cc.LayerColor.extend({

	ctor:function () {
		this._super(cc.color(0, 0, 0, 200), cc.winSize.width, cc.winSize.height);
		var bg = new cc.Sprite(res.bg);
		bg.attr({
			anchorX : 0.5,
			anchorY : 0.5,
			x : cc.winSize.width/2,
			y : cc.winSize.height/2
		});
		this.addChild(bg);

		var label = new cc.LabelTTF(CONFIG.SHENMING, "微软雅黑", 10, cc.size(cc.winSize.width*0.9, 480), cc.TEXT_ALIGNMENT_LEFT);
		label.x = cc.winSize.width/2;
		label.y = cc.winSize.height - 10;
		label.anchorY = 1;
		this.addChild(label);
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches:true,
			onTouchBegan: function (touch, event) {
				return true;
			},
			onTouchEnded:function(t, event){
				event.getCurrentTarget().removeFromParent();
			}
		}, this);
	},
	
	
});