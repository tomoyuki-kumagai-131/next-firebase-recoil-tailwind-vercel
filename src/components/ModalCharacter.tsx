import { Dialog, Transition } from '@headlessui/react';
import { AnnotationIcon, LoginIcon } from '@heroicons/react/outline';
import { signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Fragment, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { UseAuthContext } from '../context/AuthContext';
import { auth, db, provider } from '../lib/firebase';
import { modalCharacter, modalPost } from './atoms/modalAtom';

function ModalCharacter({ modalData }) {
  const [open, setOpen] = useRecoilState(modalCharacter);
  const [loading, setLoading] = useState(false);

  console.log(modalData);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='fixed z-10 inset-0 overflow-y-auto' onClose={setOpen}>
        <div className='flex items-end mt-44 justify-center sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 lg:-mt-12'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-200'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-400 bg-opacity-10 transition-opacity' />
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
            <div className='inline-block align-bottom bg-white w-86 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-full sm:p-6 '>
              <h1 className='flex justify-center text-xl pt-1'>Add Your Dream</h1>
              <form className='text-center'>
                <div className='relative rounded-md'>
                  <div className='inset-y-0 pt-2 flex justify-center items-center'>
                    <div className='pt-2'>
                      {modalData}
                      <div className='mt-5 sm:mt-6'></div>
                    </div>
                  </div>
                </div>
              </form>{' '}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ModalCharacter;
