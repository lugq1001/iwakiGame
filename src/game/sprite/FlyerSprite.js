

var FlyerSprite = cc.Sprite.extend({
	
	_flyerType : null,
	ctor:function (flyerType) {
		this._super(flyerType.textureName);
		this._flyerType = flyerType;
	},
	
	// 碰撞范围
	collideRect:function (x, y) {
		var w = this.width, h = this.height;
		return cc.rect(x - w / 2, y - h / 2, w, h / 2);
	}
	
});

FlyerSprite.getOrCreateFlyer = function(flyerType) {
	var selChild = null;
	for (var j = 0; j < CONFIG.CONTAINER.FLYER.length; j++) {
		selChild = CONFIG.CONTAINER.FLYER[j];

		if (selChild.visible == false && selChild._flyerType == flyerType) {
			selChild.visible = true;
			return selChild;
		}
	}

	selChild = new FlyerSprite(flyerType);
	CONFIG.CONTAINER.FLYER.push(selChild);
	g_sharedGameLayer.addChild(selChild, 0);
	return selChild;
};


















