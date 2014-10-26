
var g_resultScene;
//游戏结束场景
var ResultScene = cc.Scene.extend({

	_resultScore : null,
	
	onEnter:function () {
		this._super();
		g_resultScene = this;
		cc.log("<ResultScene> onEnter()");
		
		var bg = new cc.Sprite(res.bg_result);
		bg.attr({
			anchorX : 0.5,
			anchorY : 0.5,
			x : cc.winSize.width/2,
			y : cc.winSize.height/2
		});
		this.addChild(bg);
		
		var resultLayer = new ResultLayer(this._resultScore);
		this.addChild(resultLayer);
	}
});