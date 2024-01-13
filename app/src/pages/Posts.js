import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import PostFullView from "./components/postFullView";
import NewPost from "./components/newPost";

export default function Posts() {
  const { easyRequest, reload, setReload } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [viewPost, setViewPost] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      const response = await easyRequest('post');

      if (response?.message) {
        return;
      }

      setPosts(response);
      setReload(false);
    }

    getPosts();
  }, [easyRequest, reload, setReload]);

  const convertDateTime = (date) => {
    const newDate = new Date(date);

    return `${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString()}`;
  }

  return (
    <div>
      {viewPost ? <PostFullView viewPost={viewPost} onClose={() => setViewPost(null)} /> : (
        <>
          <NewPost />
          {posts?.map((post) => (
            <div
              key={post._id}
              className='flex flex-col justify-start items-start w-full border-white border-l-2 border-b-2 border-r-2 border-opacity-20 p-6 cursor-pointer'
              onClick={() => setViewPost(post)}
            >
              <div className='flex flex-row justify-between items-center w-full'>
                <div className='flex flex-row justify-start items-center w-full'>
                  <img
                    className="rounded-full"
                    src={post?.user?.image || '/portrait-placeholder.png'}
                    alt='user'
                    width={40}
                    height={40}
                    priority
                  />
                  <div className='flex flex-col justify-start items-start ml-5'>
                    <span className='text-1xl font-bold text-center mb-2'>{post.user.name}</span>
                  </div>
                </div>
                <span className='text-xs text-gray-400'>{convertDateTime(post.createdAt)}</span>
              </div>
              <div className="ml-10 mb-5">
                <span className='ml-5 text-l font-bold'>{post.title}</span>
                <div className='ml-5 flex flex-col justify-start items-start w-full mt-2'>
                  <span className='text-sm'>{post.description}</span>
                </div>
              </div>
              <div className="ml-10">
                <span className='flex ml-5 text-sm gap-2 items-center'>
                  <img
                    className="dark:invert"
                    src='/chat-bubble.svg'
                    alt='chat bubble'
                    width={15}
                    height={15}
                    priority
                  />
                  {` ${post.comments.length}`}
                </span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}