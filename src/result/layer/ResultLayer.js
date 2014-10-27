var ResultLayer = cc.Layer.extend({
	
	_resultPanelSprite : null,
	_resultScore : null,
	_networkTips : null,
	_rankList: null,
	
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
		this.initTitle();
		// 排行榜
		this.initRankList();
		
		this._networkTips = new cc.LabelTTF("读取中,请稍候... ", "微软雅黑", 20,cc.size(200, 100), cc.TEXT_ALIGNMENT_CENTER);
		this._networkTips.attr({
			anchorX: 0.5,
			anchorY: 0.5,
			x: cc.winSize.width/2,
			y: cc.winSize.height - 150
		});
		this._networkTips.color = cc.color(227, 5, 18);
		this.addChild(this._networkTips);

		this._resultPanelSprite = new ResultPanelSprite(gameScore);
		this._resultPanelSprite.attr({
			anchorX: 0.5,
			anchorY: 0,
			x: cc.winSize.width/2,
			y: 0
		});
		/*this._resultPanelSprite.x = cc.winSize.width/2;
		this._resultPanelSprite.y = 0;*/
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
	
	initTitle:function() {
		var title = new cc.Sprite(res.result_title);
		title.attr({
			anchorX : 0.5,
			anchorY : 0.5,
			x : cc.winSize.width/2,
			y : cc.winSize.height - 50
		});
		this.addChild(title);
	},

	initRankList:function() {
		var winsize = cc.director.getWinSize();
		var listW = 300;
		var listH = 250;
		var listView = new ccui.ListView();
		// set list view ex direction
		listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
		listView.setTouchEnabled(false);
		listView.setBounceEnabled(false);
		//listView.setBackGroundImage(res.img_king);
		//listView.setBackGroundImageScale9Enabled(true);
		listView.setContentSize(cc.size(listW, listH));
		listView.x = 20;
		listView.y = winsize.height - listH - 70;
		//listView.addEventListener(this.selectedItemEvent, this);
		
		// set model
		//listView.setItemModel(rankLabel);
		var color = cc.color(227, 5, 18);
		var fontSize = 16;
		var cellHeight = 40;
		var labelHeight = 20;
		var avatarSize = 30;
		var positionY = 0;
		for (var i = 0; i < 4; i++) {
			var rankLabel = new cc.LabelTTF("No:123231", "微软雅黑", fontSize,cc.size(100, labelHeight), cc.TEXT_ALIGNMENT_LEFT);
			rankLabel.attr({
				anchorX: 0,
				anchorY: 0,
				x: 0,
				y: positionY
			});
			rankLabel.color = color;
				
			var nickLabel = new cc.LabelTTF("游客游客游客游客 ", "微软雅黑", fontSize,cc.size(80, labelHeight), cc.TEXT_ALIGNMENT_LEFT);
			nickLabel.attr({
				anchorX: 0,
				anchorY: 0,
				x: 120,
				y: positionY
			});
			nickLabel.color = color;

			var scoreLabel = new cc.LabelTTF("100000分 ", "微软雅黑", fontSize,cc.size(80, labelHeight), cc.TEXT_ALIGNMENT_RIGHT);
			scoreLabel.attr({
				anchorX: 0,
				anchorY: 0,
				x: 205,
				y: positionY
			});
			scoreLabel.color = color;
			
			var line = new cc.Sprite(res.result_line);
			line.attr({
				anchorX: 0,
				anchorY: 0,
				x: 0,
				y: positionY - 8
			});
			line.setScaleX(280/line.getContentSize().width);
			line.setScaleY(2/line.getContentSize().height);
			line.setContentSize(cc.size(280, 2));
			
			var avatar = new cc.Sprite(res.default_avatar);
			avatar.attr({
				anchorX: 0,
				anchorY: 0,
				x: 85,
				y: -3
			});
			avatar.setScaleX(avatarSize/avatar.getContentSize().width);
			avatar.setScaleY(avatarSize/avatar.getContentSize().height);
			avatar.setContentSize(cc.size(avatarSize, avatarSize));
			
			var cell = new ccui.Layout();
			cell.setContentSize(cc.size(listW, cellHeight));
			cell.addChild(rankLabel);
			cell.addChild(nickLabel);
			cell.addChild(scoreLabel);
			cell.addChild(avatar);
			cell.addChild(line);
			listView.pushBackCustomItem(cell);
			
			
			
			
			
			/*cc.loader.loadImg(res.default_avatar, {isCrossOrigin : false }, function(err, img){
				cc.textureCache.addImage(res.default_avatar);
				var texture2d = new cc.Texture2D();
				texture2d.initWithElement(img);
				texture2d.handleLoadedTexture();
				var avatar = new cc.Sprite();
				avatar.initWithTexture(texture2d);
				cell.addChild(avatar);
			});
			*/
			
		}
		this._rankList = listView;
		this.addChild(this._rankList);
	}

});
