import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";

export const getServerSideProps = async (ctx) => {

  const id = ctx.params.id;

  console.log(id);

  const docRef = doc(db, 'posts', id)

  const docSnap = await getDoc(docRef)

  return {
    props: { postProps: JSON.stringify(docSnap.data()) || null } // ページコンポーネントにpropsとして渡されます。
  }
}

// export const getStaticPaths = async() => {

//   const snapshot = await getDocs(collection(db, 'posts'));
//   const paths = snapshot.docs.map((doc) => {
//     return {
//       params: { id: doc.id.toString() }
//     }
//   })

//   return {
//     paths, fallback: false
//   }
// }

function posts({postProps}) {
  const router = useRouter();
  const post = JSON.parse(postProps);
  console.log(post);
  // console.log(router.query);

  return (
    <div>
      <p>詳細ページ</p>
      <p>{post.title}</p>
    </div>
  )
}

export default posts;
