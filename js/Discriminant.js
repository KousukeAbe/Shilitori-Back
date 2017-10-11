// 末尾が小文字かどうか判断。小文字なら文字コードを＋1すれば治る？
function Discriminant_small(x){
  var hip = x.slice(-1);

  if(hip.match(/[ぁ ぃ ぅ ぇ ぉ っ ゃ ゅ ょ ゎ]/)){
    x = x.slice(0, -1);
    hip = String.fromCharCode(hip.charCodeAt() + 1);
    x += hip;
  }
  return x;
}

// 末尾が「濁点・半濁点の文字かどうか判断 。半濁点なら文字コードを−２、濁点なら文字コードを−１すれば治るか？
function Discriminant_soundsign(x){
  var hip = x.slice(-1);
  if(hip.match(/[ぱ ぴ ぷ ぺ ぽ]/)){
    x = x.slice(0, -1);
    hip = String.fromCharCode(hip.charCodeAt() - 2);
    x += hip;
  }else if(hip.match(/[が ぎ ぐ げ ご ざ じ ず ぜ ぞ だ ぢ づ で ど ば び ぶ べ ぼ]/)){
    x = x.slice(0, -1);
    hip = String.fromCharCode(hip.charCodeAt() - 1);
    x += hip;
  }
  return x;
}

// １文字目が正解かどうか判断
function Discriminant_first(x){
  if(enemyword[enemyword.length - 1] == x[0]){
    return true;
  }else{
    return false;
  }
}


// 末尾がカタカナかどうか判断 カタカナなら文字コードを−９６すればひらがなに治る
function Discriminant_ktkn(x){
  var hip = x.slice(-1);
  if(hip.match(/[\u30A1-\u30F3]/)){
    x = x.slice(0, -1);
    hip = String.fromCharCode(hip.charCodeAt() - 96);
    x += hip;
  }
  return x;
}

// 末尾が伸ばし棒かどうか判断。伸ばし棒は消してしまえばいい
function Discriminant_undo(x){
  var hip = x.slice(-1);
  if(hip.match(/[\u30FC\u2010-\u2015\u2212\uFF70]/)){
    return x.slice(0, -1);
  }else{
    return x;
  }
}

//打った文字が全てひらがなかカタカナかを確かめる
function Discriminant_allkana(x){
  if (!x.match(/^[\u3040-\u30FF]+$/)) {
    return true;
  }else{
    return false;
  }
}

function output(event){
  if(event !== 13)return;
  if(!attackright){
    VisibleInfo("攻撃権がありません。");
    return;
  }

  let element = document.getElementById('output_id');
  let word = element.value;
  element.value = "";

  if(Discriminant_allkana(word)){
    VisibleInfo("ひらがな、カタカナで入力する必要があります");
    return;
  }

  let encodeword = WordCheck(word[0]) + word.substr(1);

  if(!Discriminant_first(encodeword)){
    VisibleInfo("お題の末尾と入力した文字が一致しません");
    return;
  };

  socket.emit("attack",{value:word});
  attackright = false;
};

function WordCheck(word){
  let total = word;
  total = Discriminant_undo(total);
  total = Discriminant_ktkn(total);
  total = Discriminant_small(total);
  total = Discriminant_soundsign(total);

  return total;
}
