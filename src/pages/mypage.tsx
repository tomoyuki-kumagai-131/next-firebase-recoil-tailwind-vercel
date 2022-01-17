import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { EmojiHappyIcon, HeartIcon, TrashIcon } from "@heroicons/react/outline"
import { HeartIcon as HeartFullIcon } from "@heroicons/react/solid"

import { useState } from "react";
import { useEffect } from "react";
import { db } from "../lib/firebase";
import { UseAuthContext } from "../context/AuthContext";

function Mypage() {

  const [ loading, setLoading ] = useState(false)
  const { user } = UseAuthContext();

  const [ posts, setPosts ] = useState([]);

  //   // いいね機能のstate
  //   const [likes, setLikes] = useState([]);
  //   const [hasLiked, setHasLiked] = useState(false);

  // console.log(user.uid);

  //   const likePost = async(): Promise<void> => {
  //   if(hasLiked) {
  //     await deleteDoc(doc(db, 'posts', id, 'likes', user.uid));
  //   } else {
  //     await setDoc(doc(db, 'posts', id, 'likes', user.uid), {
  //       username: user.displayName,
  //       timestamp: serverTimestamp()
  //     })
  //   }
  // }

  useEffect(()=> {
    setLoading(true)
    onSnapshot(query(collection(db, 'posts'), where('uid', '==', user.uid)), (snapshot) => {
      setPosts(snapshot.docs)
    })
    setLoading(false)
  },[])

//   useEffect(() =>
//   onSnapshot(
//     query(
//       collection(db, 'posts', id, 'likes'),
//       orderBy('timestamp', 'desc')
//     ), (snapshot) => setLikes(snapshot.docs)
//   ),
//   [db, id]
// )

// useEffect(()=> {
//   setHasLiked(
//     likes.findIndex((like)=> like.id === user?.uid) !== -1
//   ),
//   [likes]
// })

//   console.log(posts);


  return (
    <>
      <div className="flex items-center justify-center">
        {user? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {posts.map((item, i) => {
            return (
              <div className="relative flex grid justify-center items-center mt-6 h-96 w-96 bg-gray-50 shadow-md md:w-80 md:mt-10 lg:h-108 lg:w-96 lg:mt-10 lg:mb-8 xl:mx-10" key={i}>
                <h1 className="absolute text-gray-800 text-xl mx-2 -mt-80 ml-6 mx-5 lg:-mt-78 lg:ml-6">{item.data().title}</h1>
                <p className="absolute text-gray-600 mx-2 -mt-48 mx-7 lg:mx-8 lg:-mt-24">{item.data().description}</p>
              </div>
            )
          })}
          </div>
        ) : (
          <p className='absolute lg:mt-48'>ログインしてください</p>
        )}
      </div>
    </>
  )
}

export default Mypage
