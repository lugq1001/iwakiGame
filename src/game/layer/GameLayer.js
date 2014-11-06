// 碰撞rect
MAX_CONTAINT_WIDTH = 60;
MAX_CONTAINT_HEIGHT = 60;
var g_sharedGameLayer;

// 游戏主界面
var GameLayer = cc.Layer.extend({

	_scoreLabel : null, // 分数文字
	_awardScoreLabel : null,  // 吃到道具分数文字
	_timeLabel : null, // 时间文字
	_kingSprite : null, // 国王
	_time : CONFIG.GAME_TIME, // 游戏时间
	_score : 0, // 分数
	_flyerManager: null,
	_gameScene:null,
	
	ctor:function (scene) {
		this._super();
		this._gameScene = scene;
		this.init();
	},

	init:function() {
		cc.log("<GameLayer> init()");
		g_sharedGameLayer = this;
		
		this.initScoreInfo();
		this.initTimeInfo();
		this.initKing();
		
		this._flyerManager = new FlyerManager();
		this.scheduleUpdate();
		this.schedule(this.timeCount, 1); // 游戏倒计时
		this.schedule(this.scoreFlyer, CONFIG.FLYER_INTERVAL);// 分数道具
		this.schedule(this.timeFlyer, CONFIG.TIME_INTERVAL);// 时间道具
		this.schedule(this.bombFlyer, CONFIG.BOMB_INTERVAL);// 炸弹
	},
	
	update:function (dt) {
		//this._timeLabel.setString("Time: " + this._time);
		//this._scoreLabel.setString("Score: " + this._score);
		
		this.checkCollide(); 
		// 精灵复用
		for (var j = 0; j < CONFIG.CONTAINER.SCROLL_LABEL.length; j++) {
			var label = CONFIG.CONTAINER.SCROLL_LABEL[j];
			if (label.y > CONFIG.KING_Y + 99 && label.visible) {
				label.stopAllActions();
				label.visible = false;
			}
		}
	},
	
	// ***********************************碰撞检测*******************************************
	checkCollide:function(){
		for (var j = 0; j < CONFIG.CONTAINER.FLYER.length; j++) {
			var flyer = CONFIG.CONTAINER.FLYER[j];
			if (flyer.visible == false) {
				continue;
			}
			if (this.collide(flyer, this._kingSprite)) {
				flyer.stopAllActions();
				flyer.visible = false;
				if(flyer._flyerType.type == 8 || flyer._flyerType.type == 9) { // 时钟道具
					if (CONFIG.SOUND_ON)  cc.audioEngine.playEffect(res.m_time);
					var second = flyer._flyerType.scoreValue;//随机增加时间
					this.timeUp(second);
				} else if (flyer._flyerType.type == 10) {// 炸弹
					if (CONFIG.SOUND_ON)  cc.audioEngine.playEffect(res.m_bomb);
					this.timeUp(-flyer._flyerType.scoreValue);
					this.onBomb();
				} else { // 加分道具
					if (CONFIG.SOUND_ON)  cc.audioEngine.playEffect(res.m_collide);
					this.scoreUp(flyer._flyerType.scoreValue);
				}
				
			}
			if (flyer.y < 0) {
				flyer.stopAllActions();
				flyer.visible = false;
			}
		}
	},
	
	collide:function (a, b) {
		var ax = a.x, ay = a.y, bx = b.x, by = b.y;
		if (Math.abs(ax - bx) > MAX_CONTAINT_WIDTH || Math.abs(ay - by) > MAX_CONTAINT_HEIGHT)
			return false;
		var aRect = a.collideRect(ax, ay);
		var bRect = b.collideRect(bx, by);
		return cc.rectIntersectsRect(aRect, bRect);
	},
	
	// 分数label
	initScoreInfo : function () {
		// 人气分
		var winsize = cc.director.getWinSize();
		/*this._awardScoreLabel = new cc.LabelTTF("人气分: " + this._score, "微软雅黑", 18);
		this._awardScoreLabel.attr({
			anchorX: 0,
			anchorY: 0,
			x: 10,
			y: winsize.height - 30
		});
		this._awardScoreLabel.color = cc.color(244, 84, 144);
		this._awardScoreLabel.textAlign = cc.TEXT_ALIGNMENT_RIGHT;
		var tint1 = cc.tintTo(0.2, 255, 0, 0); 
		var tint2 = cc.tintTo(0.2, 255, 255, 0); 
		var tint3 = cc.tintTo(0.2, 0, 255, 0); 
		var tint4 = cc.tintTo(0.2, 0, 255, 255);  
		var tint5 = cc.tintTo(0.2, 0, 0, 255);  
		var tint6 = cc.tintTo(0.2, 255, 0, 255); 
		var tintSequence = cc.sequence(tint1,tint2,tint3,tint4,tint5,tint6); 
		this._awardScoreLabel.runAction(tintSequence).repeatForever(); //文字闪烁
		// 分数
		this.addChild(this._awardScoreLabel, 1000);*/
		this._scoreLabel = new cc.LabelTTF("score: " + this._score, "微软雅黑", 14);
		this._scoreLabel.attr({
			anchorX: 0,
			anchorY: 0,
			x: 10,
			y: winsize.height - 30
		});
		this._scoreLabel.color = cc.color(227, 5, 18);
		this._scoreLabel.textAlign = cc.TEXT_ALIGNMENT_RIGHT;
		this.addChild(this._scoreLabel, 1000);
		cc.log("<GameLayer> 初始化分数label");
	},
	
	// 倒计时label
	initTimeInfo : function () {
		var winsize = cc.director.getWinSize();
		this._timeLabel = new cc.LabelTTF("Time: " + this._time, "微软雅黑", 14);
		this._timeLabel.attr({
			anchorX: 1,
			anchorY: 0,
			x: winsize.width - 10,
			y: winsize.height - 30
		});
		this._timeLabel.color = cc.color(227, 5, 18);
		this._timeLabel.textAlign = cc.TEXT_ALIGNMENT_LEFT;
		this.addChild(this._timeLabel, 1000);
		cc.log("<GameLayer> 初始化倒计时label");
	},
	
	// 国王
	initKing : function () {
		var winsize = cc.director.getWinSize();
		this._kingSprite = new KingSprite();
		this._kingSprite.attr({
			x : winsize.width / 2,
			y : CONFIG.KING_Y
		});
		this.addChild(this._kingSprite,1);
		cc.log("<GameLayer> 初始化国王");
	},
	
	// 倒计时
	timeCount:function() {
		if (this._time <= 0) {// 游戏结束
			this._timeLabel.setString("Time: " + 0);
			cc.log("<GameLayer> 游戏结束");
			this.unscheduleAllCallbacks();
			cc.audioEngine.stopMusic();
			cc.audioEngine.stopAllEffects();
			var resultScene = new ResultScene();
			resultScene._resultScore = this._score;
			GameLoading.preload(g_res_result, function () {
				cc.director.runScene(resultScene);
			}, this);
			return;
		}
		this._time --;
		this._timeLabel.setString("Time: " + this._time);
		//this._scoreLabel.setString("Score: " + this._score);
	},
	
	// 创建凋落物
	scoreFlyer:function() {
		var score = this._flyerManager.loadScoreFlyer();
		//cc.log("<GameLayer> scoreFlyer:" + score._flyerType);
		this.addFlyer(score);
	},
	
	// 创建时间道具
	timeFlyer:function() {
		var time = this._flyerManager.loadTimeFlyer();
		//cc.log("<GameLayer> scoreFlyer:" + time._flyerType);
		this.addFlyer(time);
	},
	
	// 创建炸弹
	bombFlyer:function() {
		var bomb = this._flyerManager.loadBombFlyer();
		//cc.log("<GameLayer> scoreFlyer:" + bomb._flyerType);
		this.addFlyer(bomb);
	},
	
	// 添加加分道具
	addFlyer:function(flyer) {
		var winsize = cc.director.getWinSize();
		flyer.x = 20 + (winsize.width - 40) * Math.random();
		flyer.y = winsize.height + 150;

		var offset, tmpAction;
		offset = cc.p(0, -winsize.height - flyer.height - 200);

		tmpAction = cc.moveBy(flyer._flyerType.speed, offset);
/*		if(this._time <= 40) {
			tmpAction = cc.moveBy(flyer._flyerType.speed / 1.5, offset);
		} 
		if (this._time <= 20) {
			tmpAction = cc.moveBy(flyer._flyerType.speed / 2, offset);
		} */

		flyer.runAction(tmpAction);
		//var actionBy = cc.RotateBy.create(flyer._flyerType.speed * 2, 360);
		//flyer.runAction(cc.RepeatForever.create(actionBy));
	},
	
	// 增加时间
	timeUp:function(second) {
		// 浮出文字提示
		this._time += second;
		var label;
		if(second > 0) {
			label = this.getOrCreateLabel("Time + " + second + "s",cc.color(227, 5, 18, 1));
		} else {
			var s = -second;
			label = this.getOrCreateLabel("Time - " + s + "s",cc.color(227, 5, 18, 1));
		}
		var to = cc.p(label.x, CONFIG.KING_Y + 100);
		var actionTo = cc.moveTo(1.0, to);
		var actiongFadeTo = cc.fadeTo(1.0, 0);
		label.runAction(actionTo);
		label.runAction(actiongFadeTo);
		this._timeLabel.setString("Time: " + this._time);
		//this._scoreLabel.setString("Score: " + this._score);
		//label.runAction(cc.sequence(cc.rotateTo(0.1, -1), cc.rotateTo(0.1,1)).repeatForever()); //左右晃动
	},
	
	// 增加分数
	scoreUp:function(score) {
		this._score += score;
		this._score = this._score < 0 ? 0 : this._score;
		//this._timeLabel.setString("Time: " + this._time);
		this._scoreLabel.setString("Score: " + this._score);
		return;
		
		
		/*var color = score < 0 ? cc.color(227, 5, 18, 1) : cc.color(227, 5, 18, 1);
		var text = score < 0 ? score : "+" + score;
		var label = this.getOrCreateLabel(text,color);
		var to = cc.p(label.x, CONFIG.KING_Y + 100);
		var actionTo = cc.moveTo(1.0, to);
		var actiongFadeTo = cc.fadeTo(1.0, 0);
		label.runAction(actionTo);
		label.runAction(actiongFadeTo);*/
		//label.runAction(cc.sequence(cc.rotateTo(0.1, -2), cc.rotateTo(0.1,2)).repeatForever()); //左右晃动
	},
	
	// 爆炸效果
	onBomb:function() {
		/*this._kingSprite.setTexture(res.img_king_black);
		this._gameScene._bg.setTexture(res.bg_bomb);
		this.schedule(function () {
			this._kingSprite.setTexture(res.img_king);
			this._gameScene._bg.setTexture(res.bg_game);
		}, 0, false, 1);*/
	},


	getOrCreateLabel: function(score, color) {
		var selChild = null;
		for (var j = 0; j < CONFIG.CONTAINER.SCROLL_LABEL.length; j++) {
			selChild = CONFIG.CONTAINER.SCROLL_LABEL[j];

			if (selChild.visible == false) {
				selChild.setString(score);
				selChild.x = this._kingSprite.x;
				selChild.y = CONFIG.KING_Y;
				selChild.color = color;
				selChild.opacity = 255;
				selChild.visible = true;
				return selChild;
			}
		}

		selChild =  new cc.LabelTTF(score, "微软雅黑", 14);
		selChild.attr({
			anchorX: 0.5,
			anchorY: 0.5,
			x: this._kingSprite.x,
			y: CONFIG.KING_Y
		});

		
		
		selChild.color = color;
		selChild.textAlign = cc.TEXT_ALIGNMENT_CENTER;
		CONFIG.CONTAINER.SCROLL_LABEL.push(selChild);
		this.addChild(selChild, 1000);
		return selChild;
	}
});













