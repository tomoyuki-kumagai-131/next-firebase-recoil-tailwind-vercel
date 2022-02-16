## Talexy
Talexyは社内でカジュアルにコミュニケーションを取ることができるSaaSプロダクトです。

つぶやき、社内の業務ツール等、使用用途は様々です。

リモートワーク全盛となった今、Talexyを利用して社内コミュニケーションを活性化させて社員のモチベーションを高めましょう。

https://next-firebase-recoil-tailwind-vercel-tomo-0131.vercel.app/

## Image1
![スクリーンショット 2022-01-30 1 21 43](https://user-images.githubusercontent.com/63157348/151668656-a20fa06f-34e1-4649-9441-9ec53671f323.png)

## Image2
<img width="716" alt="スクリーンショット 2022-02-16 22 15 59" src="https://user-images.githubusercontent.com/63157348/154273660-8b3cbae9-712b-4800-9496-a8fdd2b22262.png">

----------------------------------------------------------------------------------------------------------
## Image3
<img width="７１６" alt="スクリーンショット 2022-02-16 22 08 52" src="https://user-images.githubusercontent.com/63157348/154273655-16b6cee7-df2e-4e0b-9046-1af245e4de3b.png">


いいな！と思った投稿にはいいねを付けて交流することができます。
またコメント機能もありますので、業務ツールとして利用する場合はコメントして交流もできます。

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
