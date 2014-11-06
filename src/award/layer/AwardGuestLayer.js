// 游客抽奖
var AwardGuestLayer = cc.Layer.extend({

	_awardLabel : null,
	
	ctor:function () {
		this._super();
		var self = this;
		var pocket = new cc.Sprite(res.award_package_6);
		pocket.attr({
			anchorX : 0.5,
			anchorY : 1,
			x : cc.winSize.width/2,
			y : cc.winSize.height - 50
		});
		if (cc.director.getWinSize().width <= CONFIG.SCALE_WIDTH) {
			pocket.setScaleX(0.5);
			pocket.setScaleY(0.5);
		}
		this.addChild(pocket);
		
		var tips = new cc.LabelTTF("小贴士:国王陛下托我悄悄告诉你关注iwaki怡万家的公众号后大奖机会更多！", "微软雅黑", 20, cc.size(500, 48), cc.TEXT_ALIGNMENT_CENTER);
		tips.color = cc.color(255, 255, 255, 1);
		tips.attr({
			anchorX: 0.5,
			anchorY: 1,
			x : cc.winSize.width/2,
			y : pocket.y - pocket.getContentSize().height / 2
		});
		tips.setScaleX(0.5);
		tips.setScaleY(0.5);
		this.addChild(tips);
		
		var tips2 = new cc.Sprite(res.guest_award_tips_2);
		tips2.attr({
			anchorX : 0.5,
			anchorY : 1,
			x : cc.winSize.width/2,
			y : tips.y - tips.getContentSize().height / 2
		});
		if (cc.director.getWinSize().width <= CONFIG.SCALE_WIDTH) {
			tips2.setScaleX(0.5);
			tips2.setScaleY(0.5);
		}
		this.addChild(tips2);
		
		this._awardLabel = new cc.LabelTTF("获取兑奖码,请稍候...", "微软雅黑", 32, cc.size(300, 60), cc.TEXT_ALIGNMENT_CENTER);
		this._awardLabel.color = cc.color(255, 255, 255, 1);
		this._awardLabel.attr({
			anchorX: 0.5,
			anchorY: 1,
			x : cc.winSize.width/2,
			y : cc.winSize.height - 10
		});
		this._awardLabel.setScaleX(0.5);
		this._awardLabel.setScaleY(0.5);
		
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
				var code = jsonData.award.code + "";
				self.showAward(jsonData.award.desc,code);
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
		var tips = new cc.Sprite(res.guest_award_tips);
		tips.attr({			
			anchorX: 0.5,
			anchorY: 1,
			x : cc.winSize.width/2,
			y : cc.winSize.height - 10
		});
		if (cc.director.getWinSize().width <= CONFIG.SCALE_WIDTH) {
			tips.setScaleX(0.5);
			tips.setScaleY(0.5);
		}
		this.addChild(tips);
		
		//var imgs = new Array(res.LV1,res.LV2,res.LV3,res.LV4,res.LV5,res.LV6); 

		var level = new cc.Sprite(res.LV6);
		level.attr({			
			anchorX: 0.5,
			anchorY: 1,
			x : cc.winSize.width/2 + 10,
			y : cc.winSize.height - 8
		});
		if (cc.director.getWinSize().width <= CONFIG.SCALE_WIDTH) {
			level.setScaleX(0.5);
			level.setScaleY(0.5);
		}
		this.addChild(level);
		
		var code = new cc.LabelTTF(code, "微软雅黑", 64, cc.size(600, 70), cc.TEXT_ALIGNMENT_CENTER);
		code.color = cc.color(255, 255, 255, 1);
		code.attr({
			anchorX: 0.5,
			anchorY: 0.5,
			x : cc.winSize.width/2,
			y : cc.winSize.height - 50
		});
		code.setScaleX(0.5);
		code.setScaleY(0.5);
		this.addChild(code);
		
		
	}
});