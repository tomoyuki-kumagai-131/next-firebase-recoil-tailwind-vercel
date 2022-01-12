import { HeartIcon, TrashIcon } from "@heroicons/react/outline"
import { HeartIcon as HeartFullIcon } from "@heroicons/react/solid"
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import moment from "moment";
import { ReactNode } from "react";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { useAuthContext } from "../context/AuthContext";
import { db } from "../lib/firebase";
import { modalDelete } from "./atoms/modalAtom";
import ModalDelete from "./ModalDelete";

type Props = {
  id: string,
  username: string,
  uid: string,
  photoURL: string,
  title: string,
  description: string,
  timestamp: string,
  children?: ReactNode
}

const Post: React.FC<Props> = ({ id, username, uid, photoURL, title, description, timestamp }) => {

  const [ open, setOpen ] = useRecoilState(modalDelete);

  const { user }:any = useAuthContext();

  // 夢の削除
  const deletePost = async ( id ): Promise<void> => {
    // setIsLoading(true);
    if(confirm('この夢を削除します')) {
      // console.log(res.data());
      await deleteDoc(doc(db, "posts", id));
      // setIsLoading(false);
    } else {
      alert('削除をキャンセルしました')
    }
  }

  // いいね機能のstate
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

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

  console.log(user);

  return (
    <div className="flex justify-center items-center">
      <div className="">
        <div key={id} className="relative flex grid justify-center items-center mt-6 h-64 w-72 bg-gray-50 shadow-md rounded-lg mx-2 md:w-80 md:mt-10 lg:h-72 lg:w-80 lg:mt-10 lg:mb-8 xl:mx-10 ">
          <h1 className="text-gray-800 text-xl -mt-7 mx-8">{title}</h1>
          <Moment fromNow className="text-xs -mt-36 ml-40 mx-1 -my-2 lg:mx-1 lg:ml-44 lg:-mt-40">
            {timestamp && timestamp.toDate()}
          </Moment>
          <p className="text-gray-600 mx-10 -mt-40 lg:mx-8 lg:-mt-58">{description}</p>
          {hasLiked? (
            <HeartFullIcon onClick={likePost} className="absolute left-0 ml-4 text-red-400 border-none outline-none h-8 w-8 right-0 mt-52 mb-3 cursor-pointer mx-5 md:ml-3 lg:left-0 lg: ml-4 lg:-mb-3 lg:mx-4" />
          ) : (
            <HeartIcon onClick={likePost} className="absolute left-0 ml-4 text-red-400 border-none outline-none h-8 w-8 right-0 mt-52 mb-3 cursor-pointer mx-5 md:ml-3 lg:left-0 lg: ml-4 lg:-mb-3 lg:mx-4" />
          )}
          {likes.length > 0 && (
            <span className="absolute text-md left-0 my-2 ml-14 mt-52 lg:mt-52 lg:-my-4 lg:ml-14">♡{likes.length}</span>
          )}
          {user && uid == user.uid && (
            <>
              <TrashIcon onClick={() => deletePost(id)} className="absolute h-5 w-5 right-0 top-0 mb-3 mt-3 mr-3 cursor-pointer lg:ml-14 lg:-mb-3" />
            </>
          )}
          <img src={photoURL} className="absolute rounded-full h-7 w-7 right-0 mt-52 mr-20 mb-3 cursor-pointer lg:mr-20 lg:-mb-3" />
          <span className="absolute text-sm right-0 mt-52 mr-4 mb-3 cursor-pointer lg:mr-3 lg:-mb-3">{username}</span>
          {/* <TrashIcon onClick={() => setOpen(true)} className="absolute h-7 w-7 right-0 mt-52 mr-4 mb-3 cursor-pointer lg:mr-4 lg:-mb-3" /> */}
          {/* <HeartIcon onClick={() => setOpen(true)} className="absolute h-7 w-7 right-0 mt-52 mr-4 mb-3 cursor-pointer lg:left-0 lg: ml-4 lg:-mb-3" /> */}
          {/* <ModalDelete deletePost={deletePost} id={id} /> */}
        </div>
      </div>
    </div>
  )
}

export default Post
