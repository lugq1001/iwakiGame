//领奖场景
var AwardGuestScene = cc.Scene.extend({
	
	onEnter:function () {
		this._super();
		cc.log("<AwardGuestScene> onEnter()");

		var bg = new cc.Sprite(res.bg);
		bg.attr({
			anchorX : 0.5,
			anchorY : 0.5,
			x : cc.winSize.width/2,
			y : cc.winSize.height/2
		});
		this.addChild(bg);
		
		var tips = new cc.Sprite(res.guest_tips);
		tips.attr({
			anchorX : 0.5,
			anchorY : 0,
			x : cc.winSize.width/2,
			y : 40
		});
		this.addChild(tips);

		var layer = new AwardGuestLayer();
		this.addChild(layer);
	},
	
});