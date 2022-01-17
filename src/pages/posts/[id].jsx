import { ArrowCircleLeftIcon } from "@heroicons/react/outline";
import { collection, doc, docs, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UseAuthContext, useAuthContext } from "../../context/AuthContext";
import { db } from "../../lib/firebase";

export const getServerSideProps = async (ctx) => {
  try {
    const id = ctx.params.id;

    const docRef = doc(db, 'posts', id)

    const docLikesRef = query(collection(db, 'posts', id, 'likes'));
    // console.log(docLikesRef);

    const docSnap = await getDoc(docRef)
    // console.log(docSnap);

    const likesSnap = await getDocs(docLikesRef)
    console.log(likesSnap);

    const likesProps = likesSnap.docs.map((doc) => doc.data())

  return {
    props: {
      postProps: JSON.stringify(docSnap.data()) || null,
      likesProps: JSON.stringify(likesProps)
    }
  }
  } catch(err) {
    console.log(err);
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

function PostDetail({postProps, likesProps}) {
  const router = useRouter();
  // console.log(postProps);
  const post = JSON.parse(postProps);
  const likes = JSON.parse(likesProps);
  // console.log(likes);
  // const likes = JSON.parse(likesProps);
  // console.log(post);
  // console.log(likes);
  // console.log(router.query);

  const { user } = UseAuthContext();

  return (
    <div className="justify-center items-center">
      <div className="relative flex grid justify-center items-center mt-6 h-96 w-96 bg-gray-50 shadow-md md:w-80 md:mt-10 lg:h-108 lg:w-96 lg:mt-10 lg:mb-8 xl:mx-10">
        <h1 className="text-gray-800 text-xl mx-2">
          <span >{post.title}</span>
        </h1>
        <p className="">{post.description}</p>

      {/* {likes.map((like)=> {
        return (
          <p>{like.username}</p>
        )
        })
      } */}
      <p className="right-0">{likes.length} Likes</p>
      </div>
      <div className="flex justify-center">
        <ArrowCircleLeftIcon className="relative h-10 w-10 mt-5" onClick={()=>router.push('/')} />
      </div>
    </div>
  )
}

export default PostDetail;
