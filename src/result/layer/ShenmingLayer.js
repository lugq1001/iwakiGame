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

		var yesNormal = new cc.Sprite(res.btn_yes);
		var yesSelected = new cc.Sprite(res.btn_yes);
		var yesDisabled = new cc.Sprite(res.btn_yes);

		var noNormal = new cc.Sprite(res.btn_no);
		var noSelected = new cc.Sprite(res.btn_no);
		var noDisabled = new cc.Sprite(res.btn_no);

		var yesBtn = new cc.MenuItemSprite(yesNormal, yesSelected, yesDisabled, this.accept, this);
		var noBtn = new cc.MenuItemSprite(noNormal, noSelected, noDisabled, this.noaccept, this);
		
		var menu = new cc.Menu(yesBtn, noBtn);
		menu.alignItemsHorizontallyWithPadding(50);
		menu.attr({
			anchorX: 0.5,
			anchorY: 0,
			x : cc.winSize.width/2,
			y : 40
		});
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
	
	noaccept: function () {
		this.removeFromParent();
	},

	onEnter: function () {
		this._super();
		
	}

});