import { AnnotationIcon, PencilIcon, SearchIcon, TrashIcon } from '@heroicons/react/outline';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { UseAuthContext } from '../context/AuthContext';
import { db } from '../lib/firebase';
import ModalUpdate from './ModalUpdate';
import Post from './Post';

const Posts: React.FC = () => {
  const { user } = UseAuthContext();

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  // 投稿
  const postDream = async (): Promise<void> => {
    if (loading) return;
    setLoading(true);
    await addDoc(collection(db, 'posts'), {
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
  const deletePost = async (id: string) => {
    // setIsLoading(true);
    if (confirm('この夢を削除します')) {
      // console.log(res.data());
      await deleteDoc(doc(db, 'posts', id));
      // setIsLoading(false);
    } else {
      alert('削除をキャンセルしました');
    }
  };

  useEffect(() => {
    onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
      setPosts(snapshot.docs);
    });
  }, []);

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex justify-between items-center bg-yellow-500 py-10 lg:py-0 shadow-lg'>
        <div className='px-10 space-y-5 text-white '>
          <h1 className='text-5xl max-w-xl font-serif'>
            <p className='underline decoration-white decoration-4 transition hover:scale-105 ease-in-out duration-100 transition-transform'>
              Talexy
            </p>
          </h1>
          <h2>It's easy and free to post my thinking.</h2>
        </div>
        {/* Post入力エリア */}
        <form className='shadow-lg hidden mx-auto sm:block text-center md:block text-center md:mr-8 lg:block text-center lg:mx-32 lg:ml-40 lg:p-4 xl:block text-center'>
          <div className='relative rounded-md'>
            <div className='inset-y-0 pt-2 flex justify-center items-center'>
              <div className='pt-2'>
                <input
                  ref={titleRef}
                  className='bg-white w-80 h-11 pl-10 mb-5 sm:text-sm lg:w-96 md:w-96
                border-gray-300 focus:ring-black focus:border-black rounded-md'
                  type='text'
                  placeholder='Add your goals title'
                />
                <br />
                <input
                  ref={descriptionRef}
                  className='bg-white w-80 h-14 pl-10 sm:text-sm lg:w-96 md:w-96
                border-gray-500 focus:ring-black focus:border-black rounded-md'
                  type='text'
                  placeholder='Add your goals description'
                />
                <div className='mt-5 sm:mt-6 lg:mt-9'>
                  <button
                    onClick={postDream}
                    type='button'
                    className='inline-flex justify-center w-full rounded-md border border-transparent shadow-md  py-3  w-32 bg-red-400 text-base font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300 hover:scale-110'
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className='mr-12'>
          <img
            src='images/04_05_005.png'
            className='hidden md:inline-flex h-4 object-contain sm:h-96 md:mr-12 lg:h-96'
          />
        </div>
      </div>

      <h1 className='flex justify-center text-xl pt-5 -mb-3 lg:pt-6'>
        Add Your Goal!
        <AnnotationIcon className='h-5 w-5 mt-1 ml-2' />
      </h1>

      {/* Pots表示エリア */}
      <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 '>
        {posts.map((post, i) => (
          <div key={i} className=''>
            <Post
              key={post.id}
              id={post.id}
              uid={post.data().uid}
              username={post.data().username}
              photoURL={post.data().photoURL}
              title={post.data().title}
              description={post.data().description}
              timestamp={post.data().timestamp}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
