var ResultLayer = cc.Layer.extend({
	
	_resultPanelSprite : null,
	_resultScore : null,
	
	ctor:function (resultScore) {
		this._super();
		this._resultScore = resultScore;
		this.init();
	},

	init:function() {
		cc.log("<ResultLayer> init()");
		var winsize = cc.director.getWinSize();
		var gameScore = this._resultScore;
		cc.log("<ResultLayer> gameScore:" + gameScore);

		// 标题
		var title = new cc.Sprite(res.result_title);
		title.attr({
			anchorX : 0.5,
			anchorY : 0.5,
			x : cc.winSize.width/2,
			y : cc.winSize.height - 50
		});
		this.addChild(title);

		var listW = 280;
		var listView = new ccui.ListView();
		// set list view ex direction
		listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
		listView.setTouchEnabled(false);
		listView.setBounceEnabled(false);
		listView.setBackGroundImage(res.img_king);
		listView.setBackGroundImageScale9Enabled(true);
		listView.setContentSize(cc.size(listW, 260));
		listView.x = 20;
		listView.y = winsize.height - 300;
		//listView.addEventListener(this.selectedItemEvent, this);
		
		

		// set model
		//listView.setItemModel(rankLabel);
		for (var i = 0; i < 4; i++) {
			var rankLabel = new cc.LabelTTF("No: ", "微软雅黑", 20);
			rankLabel.attr({
				anchorX: 0,
				anchorY: 0,
				x: 10,
				y: 30
			});
			rankLabel.color = cc.color(227, 5, 18);
			rankLabel.textAlign = cc.TEXT_ALIGNMENT_LEFT;


			var cell = new ccui.Layout();
			cell.setContentSize(cc.size(listW, 30));
			cell.x = 0;
			cell.y = 30;
			cell.addChild(rankLabel);
			listView.pushBackCustomItem(cell);
		}
		this.addChild(listView);



		this._resultPanelSprite = new ResultPanelSprite(gameScore);
		this._resultPanelSprite.x = cc.winSize.width/2;
		this._resultPanelSprite.y = cc.winSize.height/2;
		this.addChild(this._resultPanelSprite);

		/*var callback = function (response) { 
			alert(response);
			var jsonData = JSON.parse(response);              
			if(jsonData){             
				alert(jsonData);             
			}    
		};
		var errorcallback = function (response) {         
			alert(response);  
		};
		var md5 = $.md5(CONFIG.OPENID + CONFIG.AVATAR + CONFIG.MAGICKEY);
		var params = "score=" + gameScore + "&openid=" + CONFIG.OPENID + "&avatar=" + CONFIG.AVATAR + "&nickname=" + CONFIG.NICKNAME + "&sign=" + md5;
		
		// 提交分数
		request(CONFIG.SERVER_URL + CONFIG.SERVER_ACTION_SCORE, params, true, callback, errorcallback);*/
	},

	

});
