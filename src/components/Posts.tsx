import { CircularProgress } from '@chakra-ui/react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { UseAuthContext } from '../context/AuthContext';
import { db, storage } from '../lib/firebase';
import Post from './Post';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalUploadPhoto, renderGraphql } from './atoms/modalAtom';
import { CameraIcon, SparklesIcon } from '@heroicons/react/outline';
import ModalUploadPhoto from './ModalUploadPhoto';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

const Posts: React.FC = () => {
  const { user } = UseAuthContext();

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const [deadline1, setDeadline1] = useState(false);
  const [deadline2, setDeadline2] = useState(false);
  const [deadlineMonth, setDeadlineMonth] = useState(false);

  const [isOpen, setIsOpen] = useRecoilState(modalUploadPhoto);

  // 投稿
  // const postDream = async (): Promise<void> => {
  //   if (titleRef.current.value == '') return;
  //   // setLoading(true);
  //   const docRef = await addDoc(collection(db, 'posts'), {
  //     username: user.displayName,
  //     uid: user.uid,
  //     title: titleRef.current.value,
  //     description: descriptionRef.current.value,
  //     deadline1: deadline1,
  //     deadline2: deadline2,
  //     deadlineMonth: deadlineMonth,
  //     photoURL: user.photoURL,
  //     timestamp: serverTimestamp(),
  //   });
  //   // setLoading(false);
  //   const imageRef = ref(storage, `posts/${docRef.id}/image`);
  //   await uploadString(imageRef, selectedPhoto, 'data_url').then(async (snapshot) => {
  //     const downloadURL = await getDownloadURL(imageRef);
  //     await updateDoc(doc(db, 'posts', docRef.id), {
  //       image: downloadURL,
  //     });
  //   });
  //   titleRef.current.value = '';
  //   descriptionRef.current.value = '';
  //   setSelectedPhoto(null);
  // };

  // const [selectedPhoto, setSelectedPhoto] = useState(null);
  // const filePickerRef = useRef(null);

  // 投稿の削除
  const deletePost = async (id: string) => {
    setLoading(true);
    if (confirm('この夢を削除します')) {
      await deleteDoc(doc(db, 'posts', id));
      setLoading(false);
    } else {
      alert('削除をキャンセルしました');
      setLoading(false);
    }
  };

  useEffect(() => {
    onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
      setPosts(snapshot.docs);
    });
  }, []);

  return (
    <>
      <div className='mt-6 flex-grow  border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[400px] rounded-xl border'>
        <div className='text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0  border-b border-gray-700 '>
          <h2 className='text-gray-600 text-lg sm:text-xl font-bold'>Everyone's Posts</h2>
          <div className='hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto'>
            <SparklesIcon className='h-5 text-gray-600' />
          </div>
        </div>

        <div className='pb-72 ml-4'>
          <div className=''>
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
                  image={post.data().image}
                  deadline1={post.data().deadline1}
                  deadline2={post.data().deadline2}
                  deadlineMonth={post.data().deadlineMonth}
                  timestamp={post.data().timestamp}
                  deletePost={deletePost}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className='max-w-7xl lg:ml-64'>
        {loading && (
          <span className='flex justify-center items-center'>
            <CircularProgress />
          </span>
        )}

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:ml-12 lg:grid-cols-2 xl:grid-cols-2'>
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
                image={post.data().image}
                deadline1={post.data().deadline1}
                deadline2={post.data().deadline2}
                deadlineMonth={post.data().deadlineMonth}
                timestamp={post.data().timestamp}
                deletePost={deletePost}
              />
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
};

export default Posts;
