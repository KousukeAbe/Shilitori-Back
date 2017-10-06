let request = new XMLHttpRequest();
let info, odai, enemyword = 'しりとり', socket, attackright = true;

window.onload = function(){
  info = document.getElementById('uho');
  odai = document.getElementById('odai');
  odai.innerHTML = 'しりとり</br>';
  info.innerHTML = "JSファイル確認";

  socket = io.connect();
  socket.on('greeting', function(data, fn){
    var answer = data.message;
    console.log(answer);
  });

  socket.on("SendOdai", function(data){
    NextWord(data);
  });

  socket.on("ChangeAttack", function(){
    WaitAttack();
  });
};

function SendMessage(event){
  if(!attackright){
    info.innerHTML = "攻撃権がありません";
    return;
  }
  if(event == 13){
    let element = document.getElementById('uhi');
    let word = element.value;
    element.value = "";

    if(enemyword.slice(-1) == word.substring(0, 1)){
      if (!word.match(/^[\u3040-\u30FF]+$/)) {
        info.innerHTML = "ひらがな、カタカナで入力する必要があります";
        return;
      }
    }else{
      info.innerHTML = "お題の最後の文字に続かないといけません";
      return;
    }

    socket.emit("attack", {value: word});
    attackright = false;
  }
};

function NextWord(word){
  if(word.check){
    enemyword = word.value;
    odai.innerHTML += word.value +'</br>';
  }else{
    info.innerHTML = "その言葉は存在しません"
  }
}

function WaitAttack(){
  attackright = true;
}
