var ShareLayer = cc.LayerColor.extend({

	ctor:function (type) {
		this._super(cc.color(0, 0, 0, 200), cc.winSize.width, cc.winSize.height);
	
		
		var arrow = new cc.Sprite(res.img_arrow);
		arrow.anchorX = 1;
		arrow.anchorY = 1;
		arrow.x = cc.winSize.width - 15;
		arrow.y = cc.winSize.height - 5;
		this.addChild(arrow);

		if (type == 0) {
			var label = new cc.LabelTTF(CONFIG.SHARE_STR1, "微软雅黑", 25, cc.size(cc.winSize.width*0.7, 250), cc.TEXT_ALIGNMENT_CENTER);
			label.x = cc.winSize.width/2;
			label.y = cc.winSize.height - 100;
			label.anchorY = 1;
			this.addChild(label);
		} else if(type == 1) {
			var img = new cc.Sprite(res.share_1);
			img.x = cc.winSize.width/2;
			img.y = cc.winSize.height - 100;
			img.anchorY = 1;
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
