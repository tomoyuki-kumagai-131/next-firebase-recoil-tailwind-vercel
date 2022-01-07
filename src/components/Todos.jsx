import { AnnotationIcon, PencilIcon, SearchIcon } from "@heroicons/react/outline"

function Todos() {
  return (
    <div className=''>
      <h1 className="flex justify-center text-xl pt-6">Add Your Dream<AnnotationIcon  className='absolute h-5 w-5 mt-1 ml-24' /></h1>

      <form className="text-center">
        <div className="relative rounded-md">
          <div className="inset-y-0 pt-2 flex justify-center items-center">
            {/* <PencilIcon className="absolute mx-32 h-4 w-4 text-gray-500 md:ml-40 lg:ml-80"/> */}
            <div className="pt-2">
              <input className="bg-gray-200 w-80 h-11 pl-10 mb-5 sm:text-sm lg:w-96 md:w-96
              border-gray-300 focus:ring-black focus:border-black rounded-md"
                type="text" placeholder="Add your dreams title"
              />
              {/* <AnnotationIcon className="absolute h-5 w-5 top-1/2 right-0 mr-12 mt-2 text-gray-500 md:ml-40 xl:mr-96"/> */}
              <br/>
              <input className="bg-gray-200 w-80 h-14 pl-10 sm:text-sm lg:w-96 md:w-96
              border-gray-500 focus:ring-black focus:border-black rounded-md"
                type="text" placeholder="Add your dreams description"
              />
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-md  py-3  w-32 bg-red-400 text-base font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Todos
