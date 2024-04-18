
# Node-Template
Node.js(+Express + Typescript)のテンプレート

# DEMO

# Features
ディレクトリ構成（モノシリック）

* 管理画面 - admin
* フロント - front
* サーバー - server

サーバーはクリーンアーキテクチャを採用

＜メリット＞
* アプリが疎結合になる ： フレームワーク、データベース、ビジネスロジックが互いに依存しない
* テストコードが書きやすくなる ： データベースを用意しなくてもロジックテストが可能
* コード変更の影響が最小限になり回収コストを下げれる ： ライブラリの置き換えが簡単

![CleanArchitecture.jpg](images/CleanArchitecture.jpg)

# Requirement

"hoge"を動かすのに必要なライブラリなどを列挙する

* Node.js 20
* hogehuga 1.0.2

# Installation

Requirementで列挙したライブラリなどのインストール方法を説明する

```bash
pip install huga_package
```

# Usage

サーバーの起動方法

```bash
git clone https://github.com/kentakki416/node-template.git
cd server
make build
make start
```

# Note

参考：
[Node.jsベストプラクティス](https://github.com/goldbergyoni/nodebestpractices/blob/master/README.japanese.md)

# Author

作成情報を列挙する

* 作成者
* 所属
* E-mail

# License
ライセンスを明示する

"hoge" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).

社内向けなら社外秘であることを明示してる

"hoge" is Confidential.
