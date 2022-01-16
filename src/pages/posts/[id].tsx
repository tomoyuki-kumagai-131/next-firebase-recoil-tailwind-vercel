import { log } from "console";
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";

// export const getServerSideProps = async (ctx) => {
//   console.log(ctx.query.id);

//   const docRef = collection(db, 'posts')
//   // const q =  JSON.parse(JSON.stringify(docRef))

//   const q = query(docRef, where('id', '==', 'ctx.query.id'))
//   // console.log(q);

//   const newQ = JSON.parse(JSON.stringify(q))

//   const querySnapshot = await getDocs(newQ)

//   // res.map((doc)=> {
//   //   const data = { id: doc.id, title: doc.data().title, description: doc.data().description
//   //   posts.push(data);
//   // })

//   return {
//     // null
//     props: { querySnapshot } // ページコンポーネントにpropsとして渡されます。
//   }
// }

function posts({id, title, querySnapshot}) {
  const router = useRouter();
  return (
    <div>
      <p>詳細ページ</p>
    </div>
  )
}

export default posts;
