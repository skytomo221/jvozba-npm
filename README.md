# jvozba-npm

jvozba for Node.js!

## Usage

```ts
jvozba(['lujvo', 'zbasu'])
// ==>
// [
//   { lujvo: 'jvozba', score: 5858 },
//   { lujvo: 'luvzba', score: 5878 },
//   { lujvo: 'jvozbas', score: 6888 },
//   { lujvo: 'luvzbas', score: 6908 },
//   { lujvo: 'jvozbasu', score: 7897 },
//   { lujvo: 'luvzbasu', score: 7917 },
//   { lujvo: 'lujvyzba', score: 8008 },
//   { lujvo: 'lujvyzbas', score: 9038 },
//   { lujvo: 'lujvyzbasu', score: 10047 },
// ]
```

```ts
jvozba("jvoka'a")
// ==> ['jvo', "ka'a"]
jvozba("jvoka'a", true)
// ==> ['lujvo', 'katna']
```

## Acknowledgments

このライブラリは、
ほとんど[Hsjoihs](https://twitter.com/hsjoihs)さんの[sozysozbot_jvozba](https://github.com/sozysozbot/sozysozbot_jvozba)のソースコードで構成されています。
npm にパッケージとして公開するために、
テストコードを追加したり、
コードをいくつか書き変えたりしましたが、
このリポジトリがなかったら、
絶対にこのライブラリを作ろうとしなかったでしょう。
また、書き換える途中で分からないところ（特に`tosmabru`チェック）
について教えていただきました。
Hsjoihs さん、ありがとうございます！
