//领奖场景
var AwardGuestScene = cc.Scene.extend({
	
	onEnter:function () {
		this._super();
		cc.log("<AwardGuestScene> onEnter()");

		var bg = new cc.Sprite(res.award_guest);
		bg.attr({
			anchorX : 0.5,
			anchorY : 0.5,
			x : cc.winSize.width/2,
			y : cc.winSize.height/2
		});
		this.addChild(bg);

		var layer = new AwardFansLayer();
		this.addChild(layer);
	},
	
});