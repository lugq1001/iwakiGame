

// 游戏启动场景
var LaunchScene = cc.Scene.extend({
	
	_startLabel : null,
	
	onEnter:function () {
		this._super();
		cc.log("<LaunchScene> onEnter()");
		cc.audioEngine.stopMusic();
		cc.audioEngine.stopAllEffects();
		
		// 加载背景
		var bg = new cc.Sprite(res.bg_launch);
		var winsize = cc.director.getWinSize();
		var centerpos = cc.p(winsize.width / 2, winsize.height / 2);
		bg.setPosition(centerpos);
		this.addChild(bg);
		cc.log("<LaunchScene> 背景资源加载成功");
		
		//var startLabel = new cc.LabelTTF("-点击屏幕开始游戏- ", "微软雅黑", 16, cc.size(150, 30), cc.TEXT_ALIGNMENT_CENTER);
		//startLabel.color = cc.color(255, 215, 0, 1);
		/*startLabel.color = cc.color(255, 0, 156, 1);
		startLabel.attr({
			anchorX: 0.5,
			anchorY: 0.5,
			x: winsize.width / 2,
			y: winsize.height / 2 - 140
		});
		this.addChild(startLabel);
		startLabel.runAction(cc.blink(2, 10) .repeatForever());*/

		
		var startNormal = new cc.Sprite(res.btn_start);
		var startSelected = new cc.Sprite(res.btn_start);
		var startDisabled = new cc.Sprite(res.btn_start);

		var start = new cc.MenuItemSprite(startNormal, startSelected, startDisabled, this.start, this);

		var menu = new cc.Menu(start);
		menu.alignItemsVerticallyWithPadding(20);
		this.addChild(menu, 1, 2);
		menu.x = winsize.width / 2;
		menu.y = winsize.height / 2 - 140;
		
		
		/*cc.eventManager.addListener({
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: false,
			onTouchBegan:this.onTouchBegan
		}, start);*/
		//var menuLayer = new MenuLayer();
		//this.addChild(menuLayer);
	},
	
	start: function() {
		if (CONFIG.SOUND_ON) {
			// 背景音乐
			cc.audioEngine.setMusicVolume(0.7);
			cc.audioEngine.playMusic(res.m_loop, true);
		}
		cc.director.runScene(new GameScene());
	},

});
