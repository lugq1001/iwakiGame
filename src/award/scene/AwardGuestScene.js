//领奖场景
var AwardGuestScene = cc.Scene.extend({
	
	onEnter:function () {
		this._super();
		cc.log("<AwardGuestScene> onEnter()");
		var layer = new cc.Layer();
		this.addChild(layer);
		var bg = new cc.Sprite(app_bg);
		bg.attr({
			anchorX : 0.5,
			anchorY : 0.5,
			x : cc.winSize.width/2,
			y : cc.winSize.height/2
		});
		layer.addChild(bg);
		
		var tips = new cc.Sprite(res.guest_tips);
		tips.attr({
			anchorX : 0.5,
			anchorY : 0,
			x : cc.winSize.width/2,
			y : 10
		});
		if (cc.director.getWinSize().width <= CONFIG.SCALE_WIDTH) {
			tips.setScaleX(0.5);
			tips.setScaleY(0.5);
		}
		
		this.addChild(tips);

		var layer = new AwardGuestLayer();
		this.addChild(layer);
	},
	
});