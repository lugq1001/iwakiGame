var g_ShenmingLayer;
var ShenmingLayer = cc.LayerColor.extend({

	ctor:function () {
		this._super(cc.color(0, 0, 0, 200), cc.winSize.width, cc.winSize.height);
		var bg = new cc.Sprite(app_bg);
		bg.attr({
			anchorX : 0.5,
			anchorY : 0.5,
			x : cc.winSize.width/2,
			y : cc.winSize.height/2
		});
		this.addChild(bg);

		var title = new cc.LabelTTF("用户申明", "微软雅黑", 30, cc.size(cc.winSize.width*0.9 * 2, 60), cc.TEXT_ALIGNMENT_CENTER);
		title.x = cc.winSize.width/2;
		title.y = cc.winSize.height - 10;
		title.anchorX = 0.5;
		title.anchorY = 1;
		title.setScaleX(0.5);
		title.setScaleY(0.5);
		this.addChild(title);
		
		var label = new cc.LabelTTF(CONFIG.SHENMING, "微软雅黑", 20, cc.size(cc.winSize.width*0.9 * 2, cc.winSize.height * 2), cc.TEXT_ALIGNMENT_LEFT);
		label.x = cc.winSize.width/2;
		label.y = cc.winSize.height - 30;
		label.anchorY = 1;
		label.setScaleX(0.5);
		label.setScaleY(0.5);
		this.addChild(label);
		
		var yesNormal = new cc.Sprite(res.btn_yes);
		var yesSelected = new cc.Sprite(res.btn_yes);
		var yesDisabled = new cc.Sprite(res.btn_yes);

		var noNormal = new cc.Sprite(res.btn_no);
		var noSelected = new cc.Sprite(res.btn_no);
		var noDisabled = new cc.Sprite(res.btn_no);

		var yesBtn = new cc.MenuItemSprite(yesNormal, yesSelected, yesDisabled, this.accept, this);
		var noBtn = new cc.MenuItemSprite(noNormal, noSelected, noDisabled, this.unaccept, this);
		
		var menu = new cc.Menu(yesBtn, noBtn);
		menu.alignItemsHorizontallyWithPadding(100);
		menu.attr({
			anchorX: 0,
			anchorY: 0,
			x : cc.winSize.width/2,
			y : 40
		});
		menu.setScaleX(0.5);
		menu.setScaleY(0.5);
		this.addChild(menu, 1, 2);
	},
	
	accept: function () {
		var callback = function (response) { 
			cc.log(response);
		};
		var errorcallback = function (response) {         
			alert(response);  
		};
		var params = "openid=" + CONFIG.OPENID;

		// 接受条款
		request(CONFIG.SERVER_URL + CONFIG.SERVER_ACTION_ACCEPT, params, true, callback, errorcallback);
		if (CONFIG.OPENID == "") {
			cc.director.runScene(new AwardGuestScene());
		} else {
			cc.director.runScene(new AwardFansScene());
		}
		
	},
	
	unaccept: function () {
		this.removeFromParent();
	},

	onEnter: function () {
		this._super();
		
	}

});