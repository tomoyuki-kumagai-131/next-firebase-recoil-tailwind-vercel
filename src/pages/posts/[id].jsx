import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import superjson from 'superjson';

export const getServerSideProps = async (ctx) => {
  console.log(ctx.query.id);

  const docRef = collection(db, 'posts')
  // const q =  JSON.parse(JSON.stringify(docRef))

  const q = query(docRef, where('id', '==', ctx.query.id))

  // console.log(q);

  const newQ = JSON.parse(JSON.stringify(q))


  const querySnapshot = await getDocs(newQ)

  return {
    props: { querySnapshot } // ページコンポーネントにpropsとして渡されます。
  }
}

function posts({id, title, querySnapshot}) {
  const router = useRouter();

  // console.log(router.query);

  return (
    <div>
      <p>詳細ページ</p>
    </div>
  )
}

export default posts;
