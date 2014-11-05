// 游客抽奖
var AwardGuestLayer = cc.Layer.extend({

	_awardLabel : null,
	
	ctor:function () {
		this._super();
		var self = this;
		var pocket = new cc.Sprite(res.award_pocket);
		pocket.attr({
			anchorX : 0.5,
			anchorY : 0.5,
			x : cc.winSize.width/2,
			y : cc.winSize.height - 150
		});
		this.addChild(pocket);
		this._awardLabel = new cc.LabelTTF("获取兑奖码,请稍候...", "微软雅黑", 16, cc.size(150, 30), cc.TEXT_ALIGNMENT_CENTER);
		this._awardLabel.color = cc.color(255, 255, 255, 1);
		this._awardLabel.attr({
			anchorX: 0.5,
			anchorY: 0.5,
			x : cc.winSize.width/2,
			y : cc.winSize.height - 60
		});
		this.addChild(this._awardLabel);
		var callback = function (response) { 
			cc.log(response);
			var jsonData = JSON.parse(response);              
			if(jsonData){ 
				self._awardLabel.removeFromParent(true);
				if (!jsonData.result) {
					alert(jsonData.desc);
					
					return;
				} 
				self.showAward(jsonData.award.desc,jsonData.award.code);
			}
		};
		var errorcallback = function (response) {         
			alert(response);  
		};
		var params = "openid=" + CONFIG.OPENID;

		// 提交分数
		request(CONFIG.SERVER_URL + CONFIG.SERVER_ACTION_AWARD, params, true, callback, errorcallback);
	},
	
	showAward :function(desc,code) {
		var awardSprite = new cc.Sprite(res.A5);
		awardSprite.attr({
			x : cc.winSize.width / 2,
			y : cc.winSize.height - 165
		});
		this.addChild(awardSprite);
		var tips = new cc.LabelTTF(desc, "微软雅黑", 20, cc.size(300, 80), cc.TEXT_ALIGNMENT_CENTER);
		tips.color = cc.color(255, 255, 255, 1);
		tips.attr({			
			anchorX: 0.5,
			anchorY: 0.5,
			x : cc.winSize.width/2,
			y : cc.winSize.height - 100
		});
		this.addChild(tips);

		var code = new cc.LabelTTF(code, "微软雅黑", 22, cc.size(150, 25), cc.TEXT_ALIGNMENT_CENTER);
		code.color = cc.color(255, 255, 0, 1);
		code.attr({
			anchorX: 0.5,
			anchorY: 0.5,
			x : cc.winSize.width/2,
			y : cc.winSize.height - 230
		});
		this.addChild(code);
	}
});