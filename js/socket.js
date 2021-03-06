/*ソケット通信をもらった時のwikipediaの検索結果表示処理*/
function NextWord(word){
  if(word.check){
    enemyword = word.value;
    put_on.innerHTML = `お題: ${enemyword}   `;
    enemyword = WordCheck(enemyword);
    if(enemyword.slice(-1) == "ん"){
      info.innerHTML = "'ん'が付いてしまいました。5秒後にリロードされます";
      setTimeout("location.reload()", 2000);
      return;
    }
  }
  else{
    VisibleInfo("その言葉は存在しません");
    attackright = true;
  }
}
/*ソケット通信を受け取った時の攻撃主導権*/
function WaitAttack(){
  attackright = true;
}
function VisibleInfo(word){
  info.innerHTML = word;
  if(word == '')return;
  setTimeout(() => VisibleInfo(''), 2000);
}

/*受け取ったplayerとdamageよりhpを変動させる*/
var sum=0;

function DamageManagement(player,damage){//playerによって判定
   if(player == "hp1"){
     if(damage <= 14){
       hp1.value = hp1.value - damage;
       hp1_view.innerHTML = hp1.value +"/"+ hp1.max;
       shouhai();
       damage_se();
       return;
     }
     hp1.value = hp1.value - 15;
     hp1_view.innerHTML = hp1.value +"/"+ hp1.max;
     setTimeout(() => DamageManagement(player,damage - 15),10);
   }
   else if(player == "hp2"){
     if(damage <= 14){
       hp2.value = hp2.value - damage;
       hp2_view.innerHTML = hp2.value +"/"+ hp2.max;
       shouhai();
       damage_se();
       return;
     }
     hp2.value = hp2.value - 15;
     hp2_view.innerHTML = hp2.value +"/"+ hp2.max;
     setTimeout(() => DamageManagement(player,damage - 15),10);
  }
}


function shouhai(){
  if(hp1.value <= 0){
    put_on.innerHTML = `あなたの負けです   `;
    socket.emit("result",{});
    setTimeout("location.reload()", 5000);
  }
}
