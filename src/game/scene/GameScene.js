var GameScene = cc.Scene.extend({
	
	_bg:null,
	
	onEnter:function () {
		this._super();
		cc.log("<GameScene> onEnter()");
		
		var layer = new cc.Layer();
		this.addChild(layer);
		this._bg = new cc.Sprite(res.bg_game);
		this._bg.attr({
			anchorX : 0.5,
			anchorY : 0.5,
			x : cc.winSize.width/2,
			y : cc.winSize.height/2
		});
		layer.addChild(this._bg);
		
		var gameLayer = new GameLayer(this);
		this.addChild(gameLayer);
		
	}


});

