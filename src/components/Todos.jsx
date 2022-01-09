import { AnnotationIcon, PencilIcon, SearchIcon, TrashIcon } from "@heroicons/react/outline"
import { useAuthContext } from "../context/AuthContext"

const posts = [
  {
    id: '1',
    username: 'tommy',
    caption: '夢のタイトル1',
    description: '夢の詳細夢の詳細夢の詳細夢の詳細夢の詳細夢の詳細夢の詳細夢の詳細'
  },
  {
    id: '2',
    username: 'tommy',
    caption: '夢のタイトル2',
    description: '夢の詳細夢の詳細夢の詳細夢の詳細'
  },
  {
    id: '3',
    username: 'tommy',
    caption: '夢のタイトル3',
    description: '夢の詳細夢の詳細夢の詳細夢の詳細夢の詳細夢の詳細夢の詳細夢の詳細'
  },
  {
    id: '4',
    username: 'tommy',
    caption: '夢のタイトル4',
    description: '夢の詳細夢の詳細夢の詳細夢の詳細'
  },
  {
    id: '5',
    username: 'tommy',
    caption: '夢のタイトル5',
    description: '夢の詳細夢の詳細夢の詳細夢の詳細夢の詳細夢の詳細夢の詳細夢の詳細'
  },
  {
    id: '6',
    username: 'tommy',
    caption: '夢のタイトル6',
    description: '夢の詳細夢の詳細夢の詳細夢の詳細'
  },
  {
    id: '7',
    username: 'tommy',
    caption: '夢のタイトル7',
    description: '夢の詳細夢の詳細夢の詳細夢の詳細'
  },
  {
    id: '8',
    username: 'tommy',
    caption: '夢のタイトル8',
    description: '夢の詳細夢の詳細夢の詳細夢の詳細夢の詳細夢の詳細夢の詳細夢の詳細'
  },
  {
    id: '9',
    username: 'tommy',
    caption: '夢のタイトル9',
    description: '夢の詳細夢の詳細夢の詳細夢の詳細'
  },
]

function Todos() {

  const {user} = useAuthContext();

  console.log(user);

  return (
    <div className=''>
      <h1 className="flex justify-center text-xl pt-6">Add Your Dream<AnnotationIcon  className='absolute h-5 w-5 mt-1 ml-24' /></h1>

      {/* Dream入力エリア */}
      <form className="hidden sm:block text-center md:block text-center lg:block text-center xl:block text-center">
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
                <div>{}</div>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Dreams表示エリア */}
      {/* TODO:ここをComponent分割 */}
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
          {posts.map((post) => {
            return (
              <div key={post.id} class="relative grid justify-center items-center text-center mt-6 h-72 w-80 bg-gray-50 shadow-md rounded-lg mx-2 md:w-80 md:mt-10 lg:flex lg:grid lg:w-96 lg:mt-10 xl:mx-12">
                <h1 class="text-gray-800 text-3xl font-semibold mx-12">{post.caption}</h1>
                <p class="text-gray-600 mx-12 -mt-20 lg:mx-8 lg:-mt-32">{post.description}</p>
                <TrashIcon className="absolute h-7 w-7 right-0 mt-52 mr-4" />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Todos
