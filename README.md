## Talexy
Talexyは小さな目標から大きな目標まで、カジュアルに投稿することができるアプリです。

現代では、自己肯定感が低い方が多いというニュースを見たことが制作のきっかけとなりました。

小さな目標の達成を積み重ねることで、自己肯定感を高めて欲しい、そして私自身も利用したいと思い、制作に着手しました。

https://next-firebase-recoil-tailwind-vercel-tomo-0131.vercel.app/

![スクリーンショット 2022-01-30 1 21 43](https://user-images.githubusercontent.com/63157348/151668656-a20fa06f-34e1-4649-9441-9ec53671f323.png)

<img width="1356" alt="スクリーンショット 2022-01-23 20 03 02" src="https://user-images.githubusercontent.com/63157348/150809080-3f9a084a-7bf5-45af-b3a5-688576d68008.png">

いいな！と思った投稿にはいいねを付けて交流することができます。

## 使用技術
Next.js(React.js) / React Hooks / GraphQL / Apollo / Jest / React Testing Library /
SWR / JavaScript / TypeScript / Recoil / Tailwind CSS /　Chakra UI
Firebase v9 / Vercel

- ユーザー管理はFirebase Authentication
- データ管理はFirebase Firestore
- GraphQL, Apolloを導入し、APIからのfetchを行うページの実装(/graphql)
- テストはJest, React Testing Library
- 状態管理はReact Hook, SWR, Recoil
- CSSはTailwind CSS
- Toast機能など、一部Chakra UIを導入
- モーダル開閉など、Recoilを導入
- SWRを利用したNext内部apiサーバーからのfetch機能(News API利用)
- Vercelにデプロイ

## 今後の追加予定機能等
- ~~コメント機能~~→1/13対応済み
- ゲストユーザーログイン機能を実装しました(Firebase Auth)
- 画像投稿機能
- TypeScript本格対応中

## 課題
- コードに統一性を持たせる
- Recoilの役割を増やして、state管理をシンプルにしたい
- ~~SWRを導入して、APIからfetchし、表示する機能を行うページ(News等) を実装したい~~ 
  → 実装着手中
