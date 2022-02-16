import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const PostPreview = (props) => {
  return (
    <div className='md:h-[800px] md:w-full'>
      <div className='markdown-preview h-full w-full border shadow-xl mb-5 rounded-xl py-6 px-6 overflow-y-scroll bg-white'>
        <ReactMarkdown plugins={[gfm]} unwrapDisallowed={false}>
          {props.markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default PostPreview;
