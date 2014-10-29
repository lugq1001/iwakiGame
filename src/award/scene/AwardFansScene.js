//领奖场景
var AwardFansScene = cc.Scene.extend({

	onEnter:function () {
		this._super();
		cc.log("<AwardFansScene> onEnter()");

		var bg = new cc.Sprite(res.award_fans);
		bg.attr({
			anchorX : 0.5,
			anchorY : 0.5,
			x : cc.winSize.width/2,
			y : cc.winSize.height/2
		});
		this.addChild(bg);

	}
});