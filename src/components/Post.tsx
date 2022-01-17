import { EmojiHappyIcon, HeartIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/outline"
import { HeartIcon as HeartFullIcon } from "@heroicons/react/solid"
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
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
  timestamp: any,
  children?: ReactNode
}

const Post: React.FC<Props> = ({ id, username, uid, photoURL, title, description, timestamp }) => {

  const [ open, setOpen ] = useRecoilState(modalDelete);

  const { user }:any = useAuthContext();

  // 夢の削除
  const deletePost = async ( id: string ): Promise<void> => {
    // setIsLoading(true);
    if(confirm('この投稿を削除します')) {
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

  // コメント機能のstate
  const [ comment, setComment ] = useState('');
  const [ comments, setComments ] = useState([]);

  const sendComment = async (e) => {
    e.preventDefault();

    if (!comment) return;

    const commentToSend = comment;
    setComment('');

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: user.displayName,
      userImage: user.photoURL,
      timestamp: serverTimestamp()
    })
  }

  useEffect(() => {
    onSnapshot(
      query(
        collection(db,'posts', id, 'comments'),
        orderBy('timestamp', 'desc')
      ), (snapshot) => setComments(snapshot.docs)
    ),
    [db, id]
  })

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

  const router = useRouter();

  const seeMore = (id, e) => {
    e.stopPropagation();
    router.push(`/posts/${id}`)
  }

  return (
    <div className="flex justify-center items-center">
      <div className="">
        <div key={id} className="relative flex grid justify-center items-center mt-6 h-96 w-96 bg-gray-50 shadow-md md:w-80 md:mt-10 lg:h-108 lg:w-96 lg:mt-10 lg:mb-8 xl:mx-10">
          <h1 className="absolute text-gray-800 text-xl mx-2 -mt-80 ml-6 mx-5 lg:-mt-78 lg:ml-6 border-b-2 border-blue-500 cursor-point8">
            <span onClick={(e)=> seeMore(id, e)}>
              {title}
            </span>
          </h1>
          {user && uid == user.uid && (
            <>
            <Link href={`/posts/${id}`}>
              <PencilAltIcon className="relative h-7 w-7 -mt-32 ml-64 my-4"/>
            </Link>
            </>
          )}
          <Moment fromNow className="absolute text-xs -mt-72 right-0 mr-10 mx-1 -my-2 lg:right-0 lg:-mt-64 lg:mr-3">
            {timestamp && timestamp.toDate()}
          </Moment>
          <p className="absolute text-gray-600 mx-2 -mt-48 mx-7 truncate lg:mx-8 lg:-mt-24">{description}</p>
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
          <img src={photoURL} className="absolute rounded-full h-7 w-7 right-0 mt-64 mr-20 mb-3 cursor-pointer lg:mr-20 lg:mt-80 lg:my-1" />
          <span className="absolute text-sm right-0 mt-64 mr-4 mb-3 cursor-pointer lg:mr-3 lg:mt-80 lg:my-1">{username}</span>
          {/* Comments Area */}
          {comments.length > 0 && (
            <div className="absolute border p-2 ml-7 mt-24 h-20 w-80 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
              {comments.map((comment)=>(
                <div key={comment.id} className="flex items-center space-x-1 mb-3">
                  <img
                    className="h-7 rounded-full"
                    src={comment.data().userImage} alt=""
                  />
                  <p className="text-sm flex-1">
                    <span className="font-bold">{comment.data().username}</span>
                    <span className="ml-3">{comment.data().comment}</span>
                  </p>
                  {/* 投稿日時
                    Momentはmoment-react, moment二つ入れる(install)
                  */}
                  <Moment fromNow className="text-xs">
                    {comment.data().timestamp?.toDate()}
                  </Moment>
                </div>
              ))}
            </div>
          )}
          <form className="">
            <input value={comment}
              onChange={(e)=> setComment(e.target.value)} type="text" placeholder="コメントを記入" className="absolute p-1 mt-0 -ml-6 w-54 border focus:ring-0 outline-none -ml-44 mt-36 lg:-ml-44 lg:mt-36"
            />
            <button type="submit" onClick={sendComment} className="absolute font-semibold text-blue-400 center-0 items-center mt-36 my-2 mx-10 pt-1 lg:mt-36 lg:my-2 lg:mx-4 lg:pt-1">Post</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Post;
