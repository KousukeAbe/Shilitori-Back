function run() {
    // Stageは全てのオブジェクトのルートになるオブジェクトでcanvasを保持している
    var stage = new createjs.Stage("canvas");
    var height = stage.canvas.height;
    var width = stage.canvas.width;
    // 画像はBitmapクラスを使う
    var logo = new createjs.Bitmap("http://www.septeni-original.co.jp/img/common/logo.gif");
    // 位置調整
    logo.regX = 110;
    logo.regY = 72;
    logo.x = 110;
    logo.y = 100;
    // Tweenというものを使うと、簡単にアニメーションっぽいのが作れる
    createjs.Tween.get(logo, {loop: true, paused: false})
        .to({y: height}, 600, createjs.Ease.sineIn)
        .to({y: 100}, 600, createjs.Ease.sineOut);
    createjs.Tween.get(logo, {loop: true, paused: false})
        .wait(500)
        .to({scaleY : 0.4}, 100, createjs.Ease.sineIn)
        .to({scaleY : 1}, 100, createjs.Ease.sineIn)
        .wait(500);
    createjs.Tween.get(logo, {loop: true, paused: false})
        .to({x: width - 110}, 1370)
        .to({x: 110}, 1370);
    // 描画したいオブジェクトは、Stageに配置すると描画される
    stage.addChild(logo);
    // フレームレートを指定する
    createjs.Ticker.framerate = 60;
    // 毎フレームごとの処理を扱うハンドラーを登録
    createjs.Ticker.addEventListener("tick", handleTick);
    function handleTick(event) {
    // updateメソッドで、Stageの状態が描画させる。
    // 毎フレームごとに状態を描画することでアニメーションが出来上がる！
    stage.update();
    }
}
