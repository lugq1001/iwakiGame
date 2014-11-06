var ShareLayer = cc.LayerColor.extend({

	_label2: null,
	
	ctor:function (type) {
		this._super(cc.color(0, 0, 0, 230), cc.winSize.width, cc.winSize.height);
	
		var winsize = cc.director.getWinSize();
		var arrow = new cc.Sprite(res.img_arrow);
		arrow.anchorX = 1;
		arrow.anchorY = 1;
		arrow.x = cc.winSize.width - 15;
		arrow.y = cc.winSize.height - 5;
		arrow.setScaleX(0.5);
		arrow.setScaleY(0.5);
		this.addChild(arrow);

		if (type == 0) {// 低调领奖
			var label = new cc.LabelTTF(CONFIG.SHARE_STR1, "微软雅黑", 16, cc.size(cc.winSize.width*0.7, 100), cc.TEXT_ALIGNMENT_CENTER);
			label.x = cc.winSize.width/2;
			label.y = cc.winSize.height - 80;
			label.anchorY = 1;
			this.addChild(label);
			var img = new cc.Sprite(res.award_6);
			img.anchorY = 1;
			img.x = cc.winSize.width/2;
			img.y = cc.winSize.height - 160;
			this.addChild(img);
			
			var shenmingNormal = new cc.Sprite(res.btn_shenming);
			var shenmingSelected = new cc.Sprite(res.btn_shenming);
			var shenmingDisabled = new cc.Sprite(res.btn_shenming);
			var shenming = new cc.MenuItemSprite(shenmingNormal, shenmingSelected, shenmingDisabled, function() {
				var layer = new GuestShenmingLayer();
				this.addChild(layer);
			}, this);
			
			
			
			var menu = new cc.Menu(shenming);
			menu.attr({
				anchorX: 0.5,
				anchorY: 1,
				x: cc.winSize.width/2,
				y: 30
			});
			this.addChild(menu);
			
			var label2 = new cc.LabelTTF("分享后即可领取", "微软雅黑", 16, cc.size(cc.winSize.width*0.7, 100), cc.TEXT_ALIGNMENT_CENTER);
			label2.x = cc.winSize.width/2;
			label2.y = cc.winSize.height - 300;
			label2.anchorY = 1;
			this.addChild(label2);
			
			/*var label3 = new cc.LabelTTF(CONFIG.SHENMING, "微软雅黑", 3, cc.size(cc.winSize.width*0.95, 300), cc.TEXT_ALIGNMENT_CENTER);
			label3.x = cc.winSize.width/2;
			label3.y = cc.winSize.height - 200;
			label3.anchorY = 1;
			this.addChild(label3);*/
		} else if(type == 1) { // 高调炫耀
			var img = new cc.Sprite(res.share_1);
			img.x = cc.winSize.width/2;
			img.y = cc.winSize.height - 100;
			img.anchorY = 1;
			var per = winsize.width/img.getContentSize().width;
			img.setScaleX(0.5);
			img.setScaleY(0.5);
			this.addChild(img);
		} else {
			var label = new cc.LabelTTF(CONFIG.SHARE_STR2, "微软雅黑", 25, cc.size(cc.winSize.width*0.7, 250), cc.TEXT_ALIGNMENT_CENTER);
			label.x = cc.winSize.width/2;
			label.y = cc.winSize.height - 100;
			label.anchorY = 1;
			this.addChild(label);
		}
		

	},
	
	onEnter: function () {
		this._super();
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches:true,
			onTouchBegan: function (touch, event) {
				return true;
			},
			onTouchEnded:function(t, event){
				event.getCurrentTarget().removeFromParent();
			}
		}, this);
	}

});
