var ResultLayer = cc.Layer.extend({
	
	_resultPanelSprite : null,
	_resultScore : null,
	_networkTips : null,
	_rankList: null,
	_myRank :null,
	_ranks :null,
	_atl : null,
	_title: null,
	
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
		
		this._networkTips = new cc.LabelTTF("读取中,请稍候... ", "微软雅黑", 20,cc.size(200, 100), cc.TEXT_ALIGNMENT_CENTER);
		this._networkTips.attr({
			anchorX: 0.5,
			anchorY: 0.5,
			x: cc.winSize.width/2,
			y: cc.winSize.height - 150
		});
		this._networkTips.color = cc.color(227, 5, 18);
		this.addChild(this._networkTips);
		var self = this;
		var callback = function (response) { 
			cc.log(response);
			var jsonData = JSON.parse(response);              
			if(jsonData){ 
				if (!jsonData.result) {
					alert(jsonData.desc);
					return;
				} 
				self._networkTips.visible = false;
				self._myRank = jsonData.myRank;
				self._atl = jsonData.atl;
				self._ranks = jsonData.ranks;
				// 排行榜
				self.initRankList();
				self._resultPanelSprite = new ResultPanelSprite(gameScore,self._atl);
				self._resultPanelSprite.attr({
					anchorX: 0.5,
					anchorY: 0,
					x: cc.winSize.width/2,
					y: 0
				});
				self.addChild(self._resultPanelSprite);
			} 
		};
		var errorcallback = function (response) {         
			alert(response);  
		};
		var md5 = $.md5(CONFIG.OPENID + CONFIG.AVATAR + CONFIG.MAGICKEY);
		var params = "score=" + gameScore + "&openid=" + CONFIG.OPENID + "&avatar=" + CONFIG.AVATAR + "&nickname=" + CONFIG.NICKNAME + "&sign=" + md5;
		
		// 提交分数
		request(CONFIG.SERVER_URL + CONFIG.SERVER_ACTION_SCORE, params, true, callback, errorcallback);
	},
	
	initTitle:function() {
		var winsize = cc.director.getWinSize();
		this._title = new cc.Sprite(res.result_title);
		this._title.attr({
			anchorX : 0.5,
			anchorY : 1,
			x : cc.winSize.width/2,
			y : cc.winSize.height - 10
		});
		this._title.setScaleX(0.5);
		this._title.setScaleY(0.5);
		this.addChild(this._title);
	},

	initRankList:function() {
		var winsize = cc.director.getWinSize();
		var listW = 300;
		var listH = 250;
		var listView = new cc.Layer();
		listView.attr({
			anchorX : 0.5,
			anchorY : 1,
			x : 20,
			y : cc.winSize.height - this._title._getHeight() / 2
		});
		
		var color = cc.color(227, 5, 18);
		var fontSize = 32;
		var cellHeight = 40;
		var labelHeight = 40;
		var avatarSize = 30;
		var positionY = 0;
		var imgs = new Array(res.NO1,res.NO2,res.NO3); 
		
		for (var i = 0; i < this._ranks.length + 1; i++) {
			var rankLabel;
			var numLabel = null;
			var nickLabel;
			var scoreLabel;
			var avatarX = 75;
			var nickX = 110;
			if (i == this._ranks.length) {
				//rankLabel = new cc.LabelTTF("No:" + this._myRank, "微软雅黑", fontSize,cc.size(100, labelHeight), cc.TEXT_ALIGNMENT_LEFT);
				numLabel = new cc.LabelTTF(this._myRank, "微软雅黑", fontSize,cc.size(100, labelHeight), cc.TEXT_ALIGNMENT_LEFT);
				numLabel.color = color;
				rankLabel = new cc.Sprite(res.NO);
				nickLabel = new cc.LabelTTF("您", "微软雅黑", fontSize,cc.size(160, labelHeight), cc.TEXT_ALIGNMENT_LEFT);
				scoreLabel = new cc.LabelTTF(this._resultScore+ "分", "微软雅黑", fontSize,cc.size(160, labelHeight), cc.TEXT_ALIGNMENT_RIGHT);
			} else {
				rankLabel = new cc.Sprite(imgs[i]);
				nickLabel = new cc.LabelTTF(this._ranks[i].nickname, "微软雅黑", fontSize,cc.size(160, labelHeight), cc.TEXT_ALIGNMENT_LEFT);
				scoreLabel = new cc.LabelTTF(this._ranks[i].score + "分", "微软雅黑", fontSize,cc.size(160, labelHeight), cc.TEXT_ALIGNMENT_RIGHT);
			}
			rankLabel.attr({
				anchorX: 0,
				anchorY: 0,
				x: 20,
				y: positionY
			});
			rankLabel.setScaleX(0.5);
			rankLabel.setScaleY(0.5);
			
			if (numLabel != null) {
				numLabel.attr({
					anchorX: 0,
					anchorY: 0,
					x: 50,
					y: positionY
				});
				numLabel.setScaleX(0.5);
				numLabel.setScaleY(0.5);
			}
			
			
			nickLabel.attr({
				anchorX: 0,
				anchorY: 0,
				x: nickX,
				y: 0
			});
			nickLabel.color = color;
			nickLabel.setScaleX(0.5);
			nickLabel.setScaleY(0.5);
			
			scoreLabel.attr({
				anchorX: 0,
				anchorY: 0,
				x: 170,
				y: positionY
			});
			scoreLabel.color = color;
			scoreLabel.setScaleX(0.5);
			scoreLabel.setScaleY(0.5);
			
			var line = new cc.Sprite(res.result_line);
			line.attr({
				anchorX: 0,
				anchorY: 0,
				x: 20,
				y: positionY - 8
			});
			line.setScaleX(230/line.getContentSize().width);
			line.setScaleY(2/line.getContentSize().height);
			line.setContentSize(cc.size(230, 2));

			var cell = new cc.Layer();
			cell.attr({
				anchorX: 0,
				anchorY: 0,
				x: 0,
				y: -(40 + i * cellHeight)
			});
			//cell.setContentSize(cc.size(listW, cellHeight));
			cell.addChild(rankLabel);
			cell.addChild(nickLabel);
			cell.addChild(scoreLabel);
			if (numLabel != null) {
				cell.addChild(numLabel);
			}
			cell.addChild(line);
			
			if (i == 0) {// 皇冠
				var header = new cc.Sprite(res.result_header);
				header.attr({
					anchorX: 0,
					anchorY: 0,
					x: 32,
					y: positionY +15
				});
				header.setScaleX(0.5);
				header.setScaleY(0.5);
				cell.addChild(header);
			}
			
			if (i == this._ranks.length) {
				if (CONFIG.AVATAR == "") {
					var avatar = new cc.Sprite(res.default_avatar);
					avatar.attr({
						anchorX: 0,
						anchorY: 0,
						x: avatarX,
						y: -3
					});
					avatar.setScaleX(avatarSize/avatar.getContentSize().width);
					avatar.setScaleY(avatarSize/avatar.getContentSize().height);
					avatar.setContentSize(cc.size(avatarSize, avatarSize));
					cell.addChild(avatar);
				} else {
					cc.loader.loadImg(CONFIG.AVATAR, {isCrossOrigin : false }, function(err, img){
						cc.textureCache.addImage(CONFIG.AVATAR);
						var texture2d = new cc.Texture2D();
						texture2d.initWithElement(img);
						texture2d.handleLoadedTexture();
						var avatar = new cc.Sprite();
						avatar.initWithTexture(texture2d);
						avatar.attr({
							anchorX: 0,
							anchorY: 0,
							x: avatarX,
							y: -3
						});
						avatar.setScaleX(avatarSize/avatar.getContentSize().width);
						avatar.setScaleY(avatarSize/avatar.getContentSize().height);
						avatar.setContentSize(cc.size(avatarSize, avatarSize));
						cell.addChild(avatar);
					});
				}
			} else {
				if (this._ranks[i].avatar == "" || this._ranks[i].avatar == null) {
					var avatar = new cc.Sprite(res.default_avatar);
					avatar.attr({
						anchorX: 0,
						anchorY: 0,
						x: avatarX,
						y: -3
					});
					avatar.setScaleX(avatarSize/avatar.getContentSize().width);
					avatar.setScaleY(avatarSize/avatar.getContentSize().height);
					avatar.setContentSize(cc.size(avatarSize, avatarSize));
					cell.addChild(avatar);
				} else {
					cc.loader.loadImg(this._ranks[i].avatar, {isCrossOrigin : false }, function(err, img){
						cc.textureCache.addImage(this._ranks[i].avatar);
						var texture2d = new cc.Texture2D();
						texture2d.initWithElement(img);
						texture2d.handleLoadedTexture();
						var avatar = new cc.Sprite();
						avatar.initWithTexture(texture2d);
						avatar.attr({
							anchorX: 0,
							anchorY: 0,
							x: avatarX,
							y: -3
						});
						avatar.setScaleX(avatarSize/avatar.getContentSize().width);
						avatar.setScaleY(avatarSize/avatar.getContentSize().height);
						avatar.setContentSize(cc.size(avatarSize, avatarSize));
						cell.addChild(avatar);
					});
				}
			}

			listView.addChild(cell);
	
		}
		this._rankList = listView;
		this.addChild(this._rankList);
	}

});
