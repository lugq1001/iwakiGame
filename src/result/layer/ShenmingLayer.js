var ShenmingLayer = cc.LayerColor.extend({

	ctor:function () {
		this._super(cc.color(0, 0, 0, 200), cc.winSize.width, cc.winSize.height);
		var bg = new cc.Sprite(res.shenming);
		bg.attr({
			anchorX : 0.5,
			anchorY : 0.5,
			x : cc.winSize.width/2,
			y : cc.winSize.height/2
		});
		this.addChild(bg);


	},

	onEnter: function () {
		this._super();
		
	}

});