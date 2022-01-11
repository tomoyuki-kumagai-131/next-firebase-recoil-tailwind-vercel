import { AnnotationIcon, PencilIcon, SearchIcon, TrashIcon } from "@heroicons/react/outline"
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../context/AuthContext"
import { db } from "../lib/firebase";
import Post from "./Post";

function Todos() {
  const {user} = useAuthContext();

  console.log(user);

  const [ loading, setLoading ] = useState(false);
  const [ posts, setPosts ] = useState([])

  const titleRef = useRef(null);
	const descriptionRef = useRef(null);

  // 投稿
	const postDream = async () => {
		if (loading) return;
		setLoading(true);
		await addDoc(collection(db, "posts"), {
			username: user.displayName,
      uid: user.uid,
			title: titleRef.current.value,
			description: descriptionRef.current.value,
			photoURL: user.photoURL,
			timestamp: serverTimestamp(),
		});
		setLoading(false);
    titleRef.current.value = '';
    descriptionRef.current.value = '';
  };


  // 投稿の削除
  const deletePost = async ( id, res ) => {
    // setIsLoading(true);
    if(confirm('この夢を削除します')) {
      // console.log(res.data());
      await deleteDoc(doc(db, "posts", id));
      // setIsLoading(false);
    } else {
      alert('削除をキャンセルしました')
    }
  }

  useEffect(()=> {
    onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
      setPosts(snapshot.docs)
    })
  },[])

  return (
    <div className='bg-blue-50'>
      <h1 className="flex justify-center text-xl pt-6 lg:pt-6">Add Your Dream<AnnotationIcon  className='absolute h-5 w-5 mt-1 ml-24' /></h1>

      {/* Dream入力エリア */}
      <form className="hidden sm:block text-center md:block text-center lg:block text-center xl:block text-center">
        <div className="relative rounded-md">
          <div className="inset-y-0 pt-2 flex justify-center items-center">
            {/* <PencilIcon className="absolute mx-32 h-4 w-4 text-gray-500 md:ml-40 lg:ml-80"/> */}
            <div className="pt-2">
              <input ref={titleRef} className="bg-gray-200 w-80 h-11 pl-10 mb-5 sm:text-sm lg:w-96 md:w-96
              border-gray-300 focus:ring-black focus:border-black rounded-md"
                type="text" placeholder="Add your dreams title"
              />
              {/* <AnnotationIcon className="absolute h-5 w-5 top-1/2 right-0 mr-12 mt-2 text-gray-500 md:ml-40 xl:mr-96"/> */}
              <br/>
              <input ref={descriptionRef} className="bg-gray-200 w-80 h-14 pl-10 sm:text-sm lg:w-96 md:w-96
              border-gray-500 focus:ring-black focus:border-black rounded-md"
                type="text" placeholder="Add your dreams description"
              />
              <div className="mt-5 sm:mt-6 lg:mt-5">
                <button
                  onClick={postDream}
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-md  py-3  w-32 bg-red-400 text-base font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Dreams表示エリア */}
      {/* TODO:ここをComponent分割 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            uid={post.data().uid}
            username={post.data().username}
            photoURL={post.data().photoURL}
            title={post.data().title}
            description={post.data().description}
            timestamp={post.data().timestamp}
            deletePost={deletePost}
          />
        ))}
      </div>
    </div>
  )
}

export default Todos
