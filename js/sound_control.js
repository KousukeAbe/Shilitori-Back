/*
* 音を鳴らす
* HTML内で<audio>タグで音ファイルを指定する
* <audio>タグは<body>の下のほうに書いておく
	<audio id="sound_atsumori" preload="auto" src="sound/atsumori.wav"></audio>
*/


// ダメージを受けた時に音をならす
function damage_se(){
	atumori.play();
}
