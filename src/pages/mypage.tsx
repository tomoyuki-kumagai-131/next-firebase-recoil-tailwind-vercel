import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { EmojiHappyIcon, HeartIcon, TrashIcon } from "@heroicons/react/outline"
import { HeartIcon as HeartFullIcon } from "@heroicons/react/solid"

import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext"
import { db } from "../lib/firebase";

function mypage() {

  const { user } = useAuthContext();

  const [ posts, setPosts ] = useState([]);

    // いいね機能のstate
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

  console.log(user.uid);

    const likePost = async(): Promise<void> => {
    if(hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', user.uid));
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', user.uid), {
        username: user.displayName,
        timestamp: serverTimestamp()
      })
    }
  }

  useEffect(()=> {
    onSnapshot(query(collection(db, 'posts'), where('uid', '==', user.uid)), (snapshot) => {
      setPosts(snapshot.docs)
    })
  },[])

  useEffect(() =>
  onSnapshot(
    query(
      collection(db, 'posts', id, 'likes'),
      orderBy('timestamp', 'desc')
    ), (snapshot) => setLikes(snapshot.docs)
  ),
  [db, id]
)

useEffect(()=> {
  setHasLiked(
    likes.findIndex((like)=> like.id === user?.uid) !== -1
  ),
  [likes]
})

  console.log(posts);


  return (
    <>
      <div className="flex items-center justify-center">
        {user? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {posts.map((item) => {
            return (
              <div className="relative flex grid justify-center items-center mt-6 h-96 w-96 bg-gray-50 shadow-md md:w-80 md:mt-10 lg:h-108 lg:w-96 lg:mt-10 lg:mb-8 xl:mx-10">
                <h1 className="absolute text-gray-800 text-xl mx-2 -mt-80 ml-6 mx-5 lg:-mt-78 lg:ml-6">{item.data().title}</h1>
                <p className="absolute text-gray-600 mx-2 -mt-48 mx-7 lg:mx-8 lg:-mt-24">{item.data().description}</p>
                {hasLiked? (
                  <HeartFullIcon onClick={likePost} className="absolute left-0 ml-6 text-red-400 border-none outline-none h-8 w-8 right-0 mt-64 mb-4 cursor-pointer mx-5 md:ml-3 lg:left-0 lg:ml-4 lg:mb-3 lg:mx-4" />
                ) : (
                  <HeartIcon onClick={likePost} className="absolute left-0 ml-6 text-red-400 border-none outline-none h-8 w-8 right-0 mt-64 mb-4 cursor-pointer mx-5 md:ml-3 lg:left-0 lg:ml-4 lg:mb-3 lg:mx-4" />
                )}
                {likes.length > 0 && (
                  <span className="absolute text-md left-0 my-2 ml-16 mt-64 lg:mt-64 lg:-my-0 lg:ml-14">♡{likes.length}</span>
                )}
                {user && uid == user.uid && (
                  <>
                    <TrashIcon onClick={() => deletePost(id)} className="absolute h-6 w-6 right-0 top-0 mb-3 mt-3 mr-3 cursor-pointer lg:ml-14 lg:-mb-3" />
                  </>
                )}
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

export default mypage
