var g_awardFansScene;
//领奖场景
var AwardFansScene = cc.Scene.extend({

	_score:0,
	
	onEnter:function () {
		this._super();
		this._score = resultScore;
		g_awardFansScene = this;
		cc.log("<AwardFansScene> onEnter()");
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
		
		var tips = new cc.Sprite(res.fans_tips);
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

		layer.addChild(tips);
		
		var fansLayer = new AwardFansLayer(resultScore);
		this.addChild(fansLayer);
	}
});







