var res = {
	m_bomb : "res/music/bomb.mp3",
	m_collide : "res/music/collide.mp3",
	m_time : "res/music/time.mp3",
	m_loop : "res/music/loop.mp3",
    bg_launch : "res/imgs/bg_loading_s.jpg",
    btn_start : "res/imgs/btn_start.jpg",
    bg_game : "res/imgs/bg_game_s.jpg",
    bg_bomb : "res/imgs/bg_bomb.jpg",
    img_king : "res/imgs/king.png",
    img_king_black : "res/imgs/king_black.png",
    btn_again : "res/imgs/btn_again.png",
    btn_share : "res/imgs/btn_share.png",
    btn_award : "res/imgs/btn_award.png",
    img_arrow : "res/imgs/arrow.png",
    F0 : "res/imgs/F0.png",
    F1 : "res/imgs/F1.png",
    F2 : "res/imgs/F2.png",
    F3 : "res/imgs/F3.png",
    F4 : "res/imgs/F4.png",
    F5 : "res/imgs/F5.png",
    F6 : "res/imgs/F6.png",
    F7 : "res/imgs/F7.png",
    bg_result : "res/imgs/bg_result.jpg",
    result_title : "res/imgs/result_title.png",
    result_line : "res/imgs/result_line.jpg",
    result_line : "res/imgs/result_line.jpg",
    award_6 : "res/imgs/award_6.png",
    default_avatar : "res/imgs/default_avatar.png",
    share_1 : "res/imgs/share_1.jpg"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
    cc.log(i);
}
