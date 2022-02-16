import { getAuth } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { UseAuthContext } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { SearchIcon } from '@heroicons/react/outline';

function RightNav() {
  const { user } = UseAuthContext();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
      setPosts(snapshot.docs);
    });
  }, []);

  return (
    <div className='hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5 sticky'>
      <div className='text-[#d9d9d9] space-y-5  p-5 rounded-3xl w-96 ml-5'>
        <h4 className='text-gray-600 font-bold text-xl px-4'>Yout Posts</h4>
        {posts.map((post) => {
          return (
            <div
              key={post.id}
              className='flex items-center bg-gray-50 p-3 rounded-full relative mb-2'
            >
              <span className='text-gray-500 text-lg p-2'>{post.data().title}</span>
            </div>
          );
        })}
        <button className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light'>
          Show more
        </button>
      </div>
    </div>
  );
}

export default RightNav;
