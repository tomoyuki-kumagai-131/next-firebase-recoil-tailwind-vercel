import { HeartIcon, TrashIcon } from "@heroicons/react/outline"
import { HeartIcon as HeartFullIcon } from "@heroicons/react/solid"
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import moment from "moment";
import { useState } from "react";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { useAuthContext } from "../context/AuthContext";
import { db } from "../lib/firebase";
import { modalDelete } from "./atoms/modalAtom";
import ModalDelete from "./ModalDelete";


function Post({id, username, title, description, timestamp}) {

  const [ open, setOpen ] = useRecoilState(modalDelete);

  const { user } = useAuthContext();

  // 夢の削除
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

  // いいね機能のstate
  const [liked, setLiked] = useState(false);

  console.log(user);

  return (
    <div className="flex justify-center items-center">
      <div className="">
        <div key={id} className="relative flex grid justify-center items-center text-center mt-6 h-64 w-72 bg-gray-50 shadow-md rounded-lg mx-2 md:w-80 md:mt-10 lg:h-72 lg:w-80 lg:mt-10 lg:mb-8 xl:mx-10 ">
          <h1 class="text-gray-800 text-3xl mx-10">{title}</h1>
          <span className="text-gray-500 lg:-mt-8 lg:ml-40 lg:mx-4">{username}</span>
          <p class="text-gray-600 mx-12 -mt-1 lg:mx-8 lg:-mt-0">{description}</p>
          <HeartFullIcon onClick={() => setOpen(true)} className="absolute left-0 ml-3 text-red-400 border-none outline-none h-7 w-7 right-0 mt-52 mb-3 cursor-pointer mx-5 md:ml-3 lg:left-0 lg: ml-4 lg:-mb-3 lg:mx-4" />
          {user && username == user.displayName && (
            <>
              <TrashIcon onClick={() => deletePost(id)} className="absolute h-7 w-7 left-0 mt-52 ml-14 mb-3 cursor-pointer lg:ml-14 lg:-mb-3" />
            </>
          )}
          {/* <TrashIcon onClick={() => setOpen(true)} className="absolute h-7 w-7 right-0 mt-52 mr-4 mb-3 cursor-pointer lg:mr-4 lg:-mb-3" /> */}
          {/* <HeartIcon onClick={() => setOpen(true)} className="absolute h-7 w-7 right-0 mt-52 mr-4 mb-3 cursor-pointer lg:left-0 lg: ml-4 lg:-mb-3" /> */}
          <Moment fromNow className="ml-40 text-stroke-emerald-50">
            {timestamp && timestamp.toDate()}
          </Moment>
          {/* <ModalDelete deletePost={deletePost} id={id} /> */}
        </div>
      </div>
    </div>
  )
}

export default Post;
