//攻撃権。trueの時攻撃可能
let attackright = true;
//サーバーから来たお題を格納する
let put_on;
//各種インフォメーション
let info;
//ソケット通信に必要な変数
let socket;
//敵のお題を格納
let enemyword = 'しりとり';

window.onload = function(){
  run();
  put_on = document.getElementById('input_id');
  info = document.getElementById('info');
  put_on.innerHTML = "お題:しりとり";

  /*ソケット通信の設定と確認*/
  socket = io.connect();
  socket.on('greeting',function(data,fn){
    var answer = data.message;
    console.log(answer);
  });

/*　ソケット通信の受け取り */
  socket.on("SendOdai",function(data){
    NextWord(data);
  });

/*攻撃の主導権引数をもらう。*/
  socket.on("ChangeAttack", function(){
    WaitAttack();
  });
}
