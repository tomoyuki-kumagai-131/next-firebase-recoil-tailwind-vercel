import { TrashIcon } from "@heroicons/react/outline"
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";


function Post({id, username, title, description, timestamp}) {

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

  return (
      <div className="flex justify-center items-center">
        <div className="">
          <div key={id} className="relative flex grid justify-center items-center text-center mt-6 h-64 w-72 bg-gray-50 shadow-md rounded-lg mx-2 md:w-80 md:mt-10 lg:h-72 lg:w-80 lg:mt-10 xl:mx-10">
            <h1 class="text-gray-800 text-3xl mx-10 -mt-4">{title}</h1>
            <p class="text-gray-600 mx-12 -mt-24 lg:mx-8 lg:-mt-32">{description}</p>
            <TrashIcon onClick={() => deletePost(id)} className="absolute h-7 w-7 right-0 mt-52 mr-4 mb-3 cursor-pointer lg:mr-4 lg:-mb-3" />
          </div>
        </div>
      </div>
  )
}

export default Post
