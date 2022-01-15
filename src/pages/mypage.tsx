import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext"
import { db } from "../lib/firebase";

function mypage() {

  const { user } = useAuthContext();

  const [ posts, setPosts ] = useState([]);

  console.log(user.uid);


  useEffect(()=> {
    onSnapshot(query(collection(db, 'posts'), where('uid', '==', user.uid)), (snapshot) => {
      setPosts(snapshot.docs)
    })
  },[])

  console.log(posts);


  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className='text-2xl mt-12'>My Page</h1>
        {user? (
          <>
            <p className='absolute lg:mt-48'>{user.displayName}</p>
            <p className='absolute lg:mt-72'>{user.email}</p>
            <div className="absolute">
              <p className="mt-96 -my-12 text-3xl">Your Post</p>
            </div>
            <div>
              {posts.map((item, i)=> {
                return (
                  <div key={i}>
                    <p>{item.data().title}</p>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <p className='absolute lg:mt-48'>ログインしてください</p>
        )}
      </div>
    </>
  )
}

export default mypage
