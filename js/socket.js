/*ソケット通信をもらった時のwikipediaの検索結果表示処理*/
function NextWord(word){
  enemyword = word.value;
  put_on.innerHTML = `お題: ${enemyword}   `;
  enemyword = WordCheck(enemyword);
  if(word.check){
    if(enemyword.slice(-1) == "ん"){
      info.innerHTML = "'ん'が付いてしまいました。5秒後にリロードされます";
      setTimeout("location.reload()", 2000);
      return;
    }
  }
  else{
    VisibleInfo("その言葉は存在しません");
  }
}
/*ソケット通信を受け取った時の攻撃主導権*/
function WaitAttack(){
  attackright = true;
}
function VisibleInfo(word){
  info.innerHTML = word;
  setTimeout("VisibleInfo('')", 2000);
}
