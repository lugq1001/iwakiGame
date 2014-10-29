
var g_sharedAwardFansLayer;
var AwardSprite = cc.Sprite.extend({
	
	_count:0,
	_hasAward:false,
	_award:null,
	
	ctor : function(awardFansLayer) {
		this._super(res.F0);
		g_sharedAwardFansLayer = awardFansLayer;
		cc.log("<AwardSprite> ctor()");
		this.schedule(this.changeRes, 0.1);// 分数道具
	},
	
	changeRes:function() {
		this.setTexture(AwardType[Math.floor(Math.random() * 5)].res);
		this._count ++;
		if(this._count > 30 && this._hasAward) {
			this.unscheduleAllCallbacks();
			this.setTexture(AwardType[this._award.level - 1].res);
			g_sharedAwardFansLayer.updateUI(this._award);
		}
	},
	
	stopAnim:function(award) {
		this._award = award;
		this._hasAward = true;
	}

});










