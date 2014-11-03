

// 游戏启动场景
var LaunchScene = cc.Scene.extend({
	
	_startLabel : null,
	
	onEnter:function () {
		this._super();
		cc.log("<LaunchScene> onEnter()");
		//cc.audioEngine.stopMusic();
		//cc.audioEngine.stopAllEffects();
		
		// 加载背景
		var bg = new cc.Sprite(res.bg_launch);
		var winsize = cc.director.getWinSize();
		var centerpos = cc.p(winsize.width / 2, winsize.height / 2);
		bg.setPosition(centerpos);
		this.addChild(bg);
		cc.log("<LaunchScene> 背景资源加载成功");
		

		
		var startNormal = new cc.Sprite(res.btn_start);
		var startSelected = new cc.Sprite(res.btn_start);
		var startDisabled = new cc.Sprite(res.btn_start);

		var start = new cc.MenuItemSprite(startNormal, startSelected, startDisabled, this.start, this);

		var menu = new cc.Menu(start);
		menu.alignItemsVerticallyWithPadding(20);
		this.addChild(menu, 1, 2);
		menu.x = winsize.width / 2;
		menu.y = winsize.height / 2 - 140;
	},
	
	start: function() {
		if (CONFIG.SOUND_ON) {
			// 背景音乐
			//cc.audioEngine.setMusicVolume(0.5);
			//cc.audioEngine.playMusic(res.m_loop, true);
		}
		cc.director.runScene(new GameScene());
	},

});
