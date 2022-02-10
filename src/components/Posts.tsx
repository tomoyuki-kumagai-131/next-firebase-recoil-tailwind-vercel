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
import { CameraIcon } from '@heroicons/react/outline';
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
      <div className='max-w-7xl mx-auto'>
        {/* <div className='flex justify-between items-center bg-yellow-500 py-10 lg:py-0 shadow-lg'> */}
        {/* <div className='px-10 space-y-5 text-white '>
            <h1 className='text-5xl max-w-xl font-serif'>
              <p className='underline decoration-white decoration-4 transition hover:scale-105 ease-in-out duration-100 transition-transform'>
                Talexy
              </p>
            </h1>
            <h2>It's easy and free to post my thinking.</h2>
          </div> */}
        {/* Post入力エリア */}
        {/* <form className=' hidden mx-auto sm:block text-center md:block text-center md:mr-8 lg:block text-center lg:mx-32 lg:ml-40 lg:p-4 xl:block text-center'>
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
                  <div className='mt-8 bg-white rounded-md shadow-lg'>
                    <FormGroup>
                      <h1 className='mt-6 pb-6'>When do you want to achieve your goal?</h1>
                      <div className='text-center pb-6 mx-3'>
                        <FormControlLabel
                          control={<Checkbox />}
                          label='1 week'
                          value={deadline1}
                          onClick={() => setDeadline1((prevState) => !prevState)}
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label='2 week'
                          value={deadline2}
                          onClick={() => setDeadline2((prevState) => !prevState)}
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label='1 month'
                          value={deadlineMonth}
                          onClick={() => setDeadlineMonth((prevState) => !prevState)}
                        />
                      </div>
                    </FormGroup>
                  </div>
                  <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-full sm:p-6'>
                    {selectedPhoto ? (
                      <img
                        className='w-full object-contain cursor-pointer'
                        src={selectedPhoto}
                        onClick={() => setSelectedPhoto(null)}
                      />
                    ) : (
                      <div
                        onClick={() => filePickerRef.current.click()}
                        className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer'
                      >
                        <CameraIcon className='h-6 w-6 text-red-500' aria-hidden='true' />
                      </div>
                    )}

                    <div className='mt-3 text-center sm:mt-5'>
                      <div>
                        <input ref={filePickerRef} onChange={uploadPhoto} type='file' hidden />
                      </div>
                    </div>
                  </div>
                  <div className='mt-2 sm:mt-6 lg:mt-7 lg:mb-3'>
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
          </form> */}
        {/* <div className='mr-12'>
            <img
              src='images/04_05_005.png'
              className='hidden md:inline-flex h-4 object-contain sm:h-96 md:mr-12 lg:h-96'
            />
          </div> */}
        {/* </div> */}

        {loading && (
          <span className='flex justify-center items-center'>
            <CircularProgress />
          </span>
        )}

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
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
    </>
  );
};

export default Posts;
