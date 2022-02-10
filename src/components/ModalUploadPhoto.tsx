import { Dialog, Transition } from '@headlessui/react';
import { CameraIcon } from '@heroicons/react/outline';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { Fragment, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { UseAuthContext } from '../context/AuthContext';
import { db, storage } from '../lib/firebase';
// import { modalState } from '../atoms/modalAtom';
// import { db, storage } from '../firebase';
import { modalUploadPhoto } from './atoms/modalAtom';

function ModalUploadPhoto() {
  const { user } = UseAuthContext();

  const filePickerRef = useRef(null);
  const captionRef = useRef(null);

  const [isOpen, setIsOpen] = useRecoilState(modalUploadPhoto);

  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(null);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);

    // 1) Create a post and add to firestore 'posts' collection
    const docRef = await addDoc(collection(db, 'posts'), {
      username: user.displayName,
      // caption: ef.current.value,
      photoURL: user.photoURL,
      timestamp: serverTimestamp(),
    });
    console.log('new doc added with ID', docRef.id);
    // 2) Get the postID for the newly created post
    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    // 3) Upload the image to firebase storage with the postID
    await uploadString(imageRef, selectedFile, 'data_url').then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);
      // 4) Get adownloadURL from firebase storage and update the original post with image
      await updateDoc(doc(db, 'posts', docRef.id), {
        image: downloadURL,
      });
    });
    setIsOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className='fixed z-10 inset-0 overflow-y-auto' onClose={setIsOpen}>
        <div className='flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity' />
          </Transition.Child>
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-full sm:p-6'>
              {selectedFile ? (
                <img
                  className='w-full object-contain cursor-pointer'
                  src={selectedFile}
                  onClick={() => setSelectedFile(null)}
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
                <Dialog.Title as='h3' className='text-lg leading-6 font-medium text-gray-900'>
                  Upload Image
                </Dialog.Title>
                <div>
                  <input ref={filePickerRef} onChange={addImageToPost} type='file' hidden />
                </div>

                <div>
                  <input
                    className='border-none focus:ring-0 w-full text-center'
                    type='text'
                    placeholder='Enter a caption'
                  />
                </div>
              </div>

              <div className='mt-5 sm:mt-6'>
                <button
                  onClick={uploadPost}
                  disabled={!selectedFile}
                  type='button'
                  className='inline-flex justify-center w-full rounded-md border border-transparent shadow-md px-4 py-2 bg-red-400 text-base font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300'
                >
                  {loading ? 'Uploading...' : 'Upload Post'}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export default ModalUploadPhoto;
