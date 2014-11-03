var FlyerManager = cc.Class.extend({
	// 加载分数道具
	loadScoreFlyer:function() {
		return this.loadFlyer(FlyerType[Math.floor(Math.random() * 8)]);
	},
	
	// 加载加时器道具
	loadTimeFlyer:function() {	
		return this.loadFlyer(FlyerType[Math.random() > 0.3 ? 8 : 9]);
	},
	
	// 加载炸弹
	loadBombFlyer:function() {
		return this.loadFlyer(FlyerType[10]);
	},

	// 添加飞行物
	loadFlyer:function(flyerType){
		var flyer = FlyerSprite.getOrCreateFlyer(flyerType);
		return flyer;
	}
});