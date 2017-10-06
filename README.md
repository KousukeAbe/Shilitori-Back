# Shilitori-Back
しりとりアプリのバックエンドです

## 使い方

```
/* npmパッケージをインストールしてから */
npm install

/* nodeでserver.jsを実行 */
node server.js
```

## バージョン情報
node.js - v8.6.0<br>
npm     - 5.3.0<br>
パッケージ類はpackage.json見てください

## エンドポイント関連
- / ...htmlファイルを取得
- /test.js ...jsファイルの取得ができる。/でhtmlファイルを取得した際自動でリクエストを送るので意識しなくていいです
- /test.css ...cssファイルを取得できる。/でhtmlファイルを取得した際自動でリクエストを送るので意識しなくていいです

## ソケットイベント名関連
### なんだよソケットイベントって
使用例あげます

```
socket.on('ここの第一引数に入れる奴です', function(data, fn){
  イベント名で処理を分割するのでイベント名は大事です
});
```

### 使用ソケットイベント名説明
- greeting ...サーバーと繋ぐ時に一番最初に送るイベント。window.onload内に書いてください
  - レスポンスjsonファイル

  ```
  { message: 'hello'} 正常に繋がってることを意味しているだけなので特に中身に意味はありません
  ```

- attack ...書いた文字を送る時に使うイベント。

- SendOdai ...attackで来た単語が正しい場合サーバーからこのイベントが全員に送られてくる。
  - レスポンスjsonファイル(送ってきた文字が問題ない場合)

    ```
    { check: true, value: data.value } checkは単語が正しいかを表すboolean。valueは正しい単語が送られる
    ```

  - レスポンスjsonファイル(送ってきた文字に問題がある場合)

    ```
    { check: false} checkは単語が正しいかを表すboolean。問題がある場合は送信者のみに送りたい
    ```

- ChangeAttack ... 攻撃権を移すキッカケを与えるイベントですjsonファイルは送られてこないです
