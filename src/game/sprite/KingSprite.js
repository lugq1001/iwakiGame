
var g_sharedKingSprite;
var KingSprite = cc.Sprite.extend({
	
	_rect : null,
	
	ctor : function() {
		this._super(res.img_king);
		cc.log("<KingSprite> ctor()");
		this._rect = cc.rect(0,0,this.getContentSize().width,this.getContentSize().height);
		g_sharedKingSprite = this;
		// 添加事件
		cc.eventManager.addListener({
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan:this.onTouchBegan,
			onTouchMoved:this.onTouchMoved,
			onTouchEnded:this.onTouchEnded,
			onTouchCancelled:this.onTouchCancelled
		}, this);
		this.runAction(cc.sequence(cc.rotateTo(0.1, -2), cc.rotateTo(0.1,2)).repeatForever()); //左右晃动
		
	},
	
	onTouchBegan: function (touch, event) {
		var target = event.getCurrentTarget();
		if (!target.isTouchInRect(touch)) {
			return false;
		}
		cc.log("<KingSprite> onTouchBegan()");
		
		return true;
	},
	
	onTouchMoved: function (touch, event) {
		cc.log("<KingSprite> onTouchMoved()");
		var target = event.getCurrentTarget();
		target.setPosition(touch.getLocation().x,CONFIG.KING_Y);
	},
	
	onTouchEnded: function (touch, event) {
		cc.log("<KingSprite> onTouchEnded()");
		var target = event.getCurrentTarget();
	},
	
	onTouchCancelled: function (touch, event) {
		cc.log("<KingSprite> onTouchCancelled()");
		var target = event.getCurrentTarget();
	},
	
	// 是否点击到国王
	isTouchInRect: function (touch) {
		var getPoint = touch.getLocation();
		var myRect = this.getRect();
		myRect.x += this.x;
		myRect.y += this.y;
		return cc.rectContainsPoint(myRect,getPoint);
	},
	
	getRect: function () {
		return cc.rect(-this._rect.width / 2, -this._rect.height / 2, this._rect.width, this._rect.height);
	},
	
	// 碰撞范围
	collideRect:function (x, y) {
		var w = this.width, h = this.height;
		return cc.rect(x - w / 2, y - h / 2, w, h / 2);
	},

});










