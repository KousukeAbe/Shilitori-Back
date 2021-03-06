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

let atumori;

window.onload = function(){
  run();
  put_on = document.getElementById('input_id');
  info = document.getElementById('info');
  put_on.innerHTML = "お題:しりとり";
  atumori = document.getElementById("sound_damage");


  var hp1 = document.getElementById('hp1');
  var hp2 = document.getElementById('hp2');
  var hp1_view = document.getElementById('hp1_view');
  var hp2_view = document.getElementById('hp2_view');
   hp1_view.innerHTML = hp1.value +"/"+ hp1.max;
   hp2_view.innerHTML = hp2.value +"/"+ hp2.max;

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

/* ダメージをいただく。敵のも自分のも */
  socket.on("SendDamage", function(data){
    VisibleInfo(`${data.damage}のダメージ!!`);
    DamageManagement(data.user,data.damage);
  });

  /* 勝利確定兄貴 */
    socket.on("winner", function(){
      put_on.innerHTML = `あなたの勝利です!!   `;
      setTimeout("location.reload()", 5000);
    });
}
