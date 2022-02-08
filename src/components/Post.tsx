import { EmojiHappyIcon, HeartIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartFullIcon } from '@heroicons/react/solid';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useRecoilState } from 'recoil';
import { UseAuthContext } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { modalDelete, modalUpdate } from './atoms/modalAtom';
import { Button, Divider, IconButton, useToast } from '@chakra-ui/react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

type Props = {
  id: string;
  username: string;
  uid: string;
  photoURL: string;
  title: any;
  description: string;
  deadline1: boolean;
  deadline2: boolean;
  deadlineMonth: boolean;
  timestamp: any;
  deletePost: any;
  children?: ReactNode;
};

const Post: React.FC<Props> = ({
  id,
  username,
  uid,
  photoURL,
  title,
  description,
  deadline1,
  deadline2,
  deadlineMonth,
  timestamp,
  deletePost,
}) => {
  const [open, setOpen] = useRecoilState(modalDelete);

  const [openEdit, setOpenEdit] = useRecoilState(modalUpdate);

  const { user } = UseAuthContext();

  const [loading, setLoading] = useState(false);

  // いいね機能のstate
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  // コメント機能のstate
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const sendComment = async (e) => {
    e.preventDefault();

    if (!comment) return;

    const commentToSend = comment;
    setComment('');

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: user.displayName,
      userImage: user.photoURL,
      timestamp: serverTimestamp(),
    });
  };

  useEffect(() => {
    onSnapshot(
      query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')),
      (snapshot) => setComments(snapshot.docs),
    ),
      [db, id];
  });

  const toast = useToast();

  const likePost = async (): Promise<void> => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', user.uid));
      toast({
        position: 'top',
        title: 'いいねを取り消しました！',
        description: 'warning',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', user.uid), {
        username: user.displayName,
        timestamp: serverTimestamp(),
      });
      toast({
        position: 'top',
        title: 'いいねしました！',
        description: 'success',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts', id, 'likes'), orderBy('timestamp', 'desc')),
        (snapshot) => setLikes(snapshot.docs),
      ),
    [db, id],
  );

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === user?.uid) !== -1), [likes];
  });

  const router = useRouter();

  const seeMore = (id, e) => {
    e.stopPropagation();
    router.push(`/posts/${id}`);
  };

  const defaultImage: string = process.env.NEXT_PUBLIC_DEFAULT_PROFILE_IMAGE;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [titleRef, setTitleRef] = useState(title);
  const [descriptionRef, setDescriptionRef] = useState(description);

  const updatePost = async () => {
    if (loading) return;
    setLoading(true);
    const docRef = doc(db, 'posts', id);
    await setDoc(docRef, {
      username: user.displayName,
      uid: user.uid,
      title: titleRef,
      description: descriptionRef,
      photoURL: user.photoURL,
      timestamp: serverTimestamp(),
    });
    setLoading(false);
    alert('編集が完了しました');
    router.push('/');
  };

  return (
    <div className='flex justify-center items-center'>
      <div className=''>
        <div
          key={id}
          className=' relative flex grid justify-center items-center mt-6 h-96 w-96 bg-gray-50 shadow-md md:w-80 md:mt-10 lg:h-108 lg:w-96 lg:mt-10 lg:mb-8 xl:mx-10'
        >
          <h1 className='absolute text-gray-800 text-md mx-2 -mt-80 ml-6 mx-5 lg:-mt-78 lg:ml-6 border-b-2 border-blue-500 cursor-cursor-pointer lg:mx-9'>
            <span onClick={(e) => seeMore(id, e)}>{title}</span>
          </h1>
          {user && uid == user.uid && (
            <>
              <PencilAltIcon
                onClick={onOpen}
                className='absolute h-6 w-6 -mt-80 ml-80 my-4 cursor-pointer'
              />
              <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent className=''>
                  <ModalHeader className='text-gray-600'>編集</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody className=''>
                    <div className='relative grid justify-center items-center mx-auto mt-2 h-96 w-80 mb-4 bg-yellow-500 rounded-md shadow-md md:w-80 md:mt-10 lg:h-96 lg:w-96 lg:mt-1 lg:mb-8'>
                      <h1 className='text-gray-800 text-xl mx-2'>
                        {user && uid == user.uid ? (
                          <input
                            type='text'
                            value={titleRef}
                            onChange={(e) => setTitleRef(e.target.value)}
                            className='w-72 lg:w-80 rounded-md p-3'
                          />
                        ) : (
                          <span>{title}</span>
                        )}
                      </h1>
                      {user && uid == user.uid ? (
                        <input
                          type='text'
                          value={descriptionRef}
                          className='w-72 lg:w-80 rounded-md p-6 ml-2'
                          onChange={(e) => setDescriptionRef(e.target.value)}
                        />
                      ) : (
                        <span>{description}</span>
                      )}
                      {user && uid == user.uid && (
                        <button
                          type='button'
                          onClick={() => updatePost()}
                          className='bg-pink-600 text-white rounded-lg font-bold p-2'
                        >
                          編集
                        </button>
                      )}
                      <p className='text-white text-center'>{likes.length} Likes</p>
                    </div>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </>
          )}
          <Moment
            fromNow
            className='absolute text-xs -mt-72 right-0 mr-10 mx-1 -my-2 lg:right-0 lg:-mt-64 lg:mr-3'
          >
            {timestamp && timestamp.toDate()}
          </Moment>
          <p className='absolute text-sm text-gray-600 mx-2 -mt-48 mx-7 truncate lg:mx-8 lg:-mt-24'>
            {description}
          </p>
          <div className='text-center absolute mt-24 ml-32 items-center justify-center'>
            {deadline1 && (
              <>
                <span>期限：</span>{' '}
                <FormControlLabel control={<Checkbox defaultChecked />} label='1 week' />
              </>
            )}
            {deadline2 && (
              <>
                <span>期限：</span>{' '}
                <FormControlLabel control={<Checkbox defaultChecked />} label='2 week' />
              </>
            )}
            {deadlineMonth && (
              <>
                <span>期限：</span>{' '}
                <FormControlLabel control={<Checkbox defaultChecked />} label='1 month' />
              </>
            )}
          </div>
          {hasLiked ? (
            <HeartFullIcon
              onClick={likePost}
              className='absolute left-0 ml-6 text-red-400 border-none outline-none h-8 w-8 right-0 mt-64 mb-4 cursor-pointer mx-5 md:ml-3 lg:left-0 lg:ml-4 lg:mb-3 lg:mx-4'
            />
          ) : (
            <HeartIcon
              onClick={likePost}
              className='absolute left-0 ml-6 text-red-400 border-none outline-none h-8 w-8 right-0 mt-64 mb-4 cursor-pointer mx-5 md:ml-3 lg:left-0 lg:ml-4 lg:mb-3 lg:mx-4'
            />
          )}
          {likes.length > 0 && (
            <span className='absolute text-md left-0 my-2 ml-16 mt-64 lg:mt-64 lg:-my-0 lg:ml-14'>
              ♡{likes.length}
            </span>
          )}
          {user && uid == user.uid && (
            <>
              <TrashIcon
                onClick={() => deletePost(id)}
                className='absolute h-6 w-6 right-0 top-0 mb-3 mt-3 mr-3 cursor-pointer lg:ml-14 lg:-mb-3'
              />
            </>
          )}
          <img
            src={photoURL}
            className='absolute rounded-full h-7 w-7 right-0 mt-64 mr-20 mb-3 cursor-pointer lg:mr-20 lg:mt-80 lg:my-1'
          />
          <span className='absolute text-sm right-0 mt-64 mr-4 mb-3 cursor-pointer lg:mr-3 lg:mt-80 lg:my-1'>
            {username}
          </span>

          {/* Comments Area */}
          {comments.length > 0 && (
            <div className='absolute border p-2 ml-7 mt-24 h-20 w-80 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
              {comments.map((comment) => (
                <div key={comment.id} className='flex items-center space-x-1 mb-3'>
                  <img className='h-7 rounded-full' src={comment.data().userImage} alt='' />
                  <p className='text-sm flex-1'>
                    <span className='font-md'>{comment.data().username}</span>
                    <span className='ml-3'>{comment.data().comment}</span>
                  </p>
                  {/* 投稿日時
                    Momentはmoment-react, moment二つ入れる(install)
                  */}
                  <Moment fromNow className='text-xs'>
                    {comment.data().timestamp?.toDate()}
                  </Moment>
                </div>
              ))}
            </div>
          )}
          <form className=''>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type='text'
              placeholder='コメントを記入'
              className='absolute p-1 mt-0 -ml-6 w-54 border focus:ring-0 outline-none -ml-44 mt-36 lg:-ml-44 lg:mt-36'
            />
            <button
              type='submit'
              onClick={sendComment}
              className='absolute font-semibold text-blue-400 center-0 items-center mt-36 my-2 mx-10 pt-1 lg:mt-36 lg:my-2 lg:mx-4 lg:pt-1'
            >
              Post
            </button>
          </form>
        </div>
        <Divider />
      </div>
    </div>
  );
};

export default Post;
