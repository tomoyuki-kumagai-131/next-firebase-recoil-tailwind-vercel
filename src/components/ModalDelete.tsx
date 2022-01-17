import { Dialog, Transition } from "@headlessui/react";
import {
	AnnotationIcon,
	ExclamationIcon,
	LoginIcon,
} from "@heroicons/react/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Fragment, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { UseAuthContext } from "../context/AuthContext";
import { auth, db, provider } from "../lib/firebase";
import { modalDelete, modalPost } from "./atoms/modalAtom";

function ModalDelete({ deletePost, id }) {
	const [open, setOpen] = useRecoilState(modalDelete);
	const [loading, setLoading] = useState(false);
	const { user } = UseAuthContext();

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed z-10 inset-0 overflow-y-auto"
				onClose={setOpen}
			>
				<div className="flex items-end mt-44 justify-center sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 lg:-mt-12">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-200"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-400 bg-opacity-125 transition-opacity" />
					</Transition.Child>
					<span
						className="hidden sm:inline-block sm:align-middle sm:h-screen"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="inline-block align-bottom bg-white w-86 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-full sm:p-6 ">
							<h1 className="flex justify-center text-xl pt-1">
								<ExclamationIcon className="text-red-500 h-5 w-5 mt-1 mr-1" />
								この投稿を削除します
							</h1>
							{/* <form className="text-center"> */}
							<div className="relative rounded-md">
								<div className="inset-y-0 pt-2 flex justify-center items-center">
									<div className="mt-5 sm:mt-6">
										<button
											onClick={() => deletePost(id)}
											type="button"
											className="inline-flex justify-center w-full rounded-md border border-transparent shadow-md  py-3 pb-3 mb-2  w-32 bg-red-400 text-base font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
										>
											{loading ? "削除中..." : "YES"}
										</button>
									</div>
								</div>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export default ModalDelete;
