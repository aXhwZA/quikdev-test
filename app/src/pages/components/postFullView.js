import { useState, useEffect, useContext } from "react";
import CommentsFullView from "./commentsFullView";
import NewPost from "../components/newPost";
import { AuthContext } from "../../context/AuthContext";

export default function Posts({ viewPost, onClose }) {
  const [viewComments, setViewComments] = useState(null);
  const { easyRequest, reload, setReload, user, confirmAction } = useContext(AuthContext);
  const [post, setPost] = useState(viewPost);

  useEffect(() => {
    const getPosts = async () => {
      const response = await easyRequest(`post${viewPost?._id ? `/${viewPost._id}` : ''}`);

      if (response?.message) {
        return;
      }

      setPost(response[0]);
      setReload(false);
    }

    getPosts();
  }, [easyRequest, reload, setReload, viewPost?._id]);


  const convertDateTime = (date) => {
    const newDate = new Date(date);

    return `${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString()}`;
  }

  return (
    <div>
      <>
        {viewComments ? <CommentsFullView commentView={viewComments} postUserId={post?.userId} onClose={() => setViewComments(null)} /> : (
          <>
            <span
              onClick={() => onClose()}
              className='ml-5 text-1xl font-bold text-center mb-2 cursor-pointer'
            >{`< Post`}</span>
            <div key={post?._id} className='flex flex-col justify-start items-start w-full border-white border-l-2 border-b-2 border-r-2 border-opacity-20 p-6'>
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
                    <span className='text-1xl font-bold text-center mb-2'>{post?.user?.name}</span>
                  </div>
                </div>
                <span className='text-xs text-gray-400'>{convertDateTime(post?.createdAt)}</span>
                {post?.userId === user.id ? <div
                  className='flex flex-row justify-start items-center cursor-pointer'
                  onClick={(e) => {
                    e.stopPropagation();

                    confirmAction('delete', () => {
                      return () => {
                        easyRequest(`post/${post?._id}`, null, 'DELETE');
                        setReload(true);
                      };
                    }, () => { })
                  }}
                >
                  <img
                    className="dark:invert"
                    src='/trash.svg'
                    alt='trash'
                    width={20}
                    height={20}
                    priority
                  />
                </div> : null}
              </div>
              <div className="ml-10 mb-5">
                <span className='ml-5 text-l font-bold'>{post?.title}</span>
                <div className='ml-5 flex flex-col justify-start items-start w-full mt-2'>
                  <span className='text-sm'>{post?.description}</span>

                  {post?.image ? <img
                    className="rounded-lg w-[90%] mt-2"
                    src={post?.image}
                    alt='post'
                    width={300}
                    height={300}
                    priority
                  /> : null}

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
                  {` ${post?.comments?.length}`}
                </span>
              </div>
            </div>
            <NewPost type='comment' contentId={post?._id} />
            {
              post?.comments?.map((comment) => (
                <div
                  key={comment?._id}
                  className='cursor-pointer flex flex-col justify-start items-start w-full border-white border-l-2 border-b-2 border-r-2 border-opacity-20 p-6'
                  onClick={() => setViewComments(comment)}
                >
                  <div className='flex flex-row justify-between items-center w-full'>
                    <div className='flex flex-row justify-start items-center w-full'>
                      <img
                        className="rounded-full"
                        src={comment?.user?.image || '/portrait-placeholder.png'}
                        alt='user'
                        width={40}
                        height={40}
                        priority
                      />
                      <div className='flex flex-col justify-start items-start ml-5'>
                        <span className='text-1xl font-bold text-center mb-2'>{comment?.user?.name}</span>
                      </div>
                    </div>
                    <span className='text-xs text-gray-400'>{convertDateTime(comment?.createdAt)}</span>
                    {post?.userId === user?.id || comment?.userId === user?.id ? <div
                      className='flex flex-row justify-start items-center cursor-pointer'
                      onClick={(e) => {
                        e.stopPropagation();

                        confirmAction('delete-comment', () => {
                          return () => {
                            easyRequest(`comment/${comment?._id}`, null, 'DELETE');
                            setReload(true);
                          };
                        }, () => { })
                      }}
                    >
                      <img
                        className="dark:invert"
                        src='/trash.svg'
                        alt='trash'
                        width={20}
                        height={20}
                        priority
                      />
                    </div> : null}
                  </div>
                  <div className="ml-10 mb-5">
                    <div className='ml-5 flex flex-col justify-start items-start w-full mt-2'>
                      <span className='text-sm'>{comment?.description}</span>

                      {comment?.image ? <img
                        className="rounded-lg w-[90%] mt-2"
                        src={comment?.image}
                        alt='comment'
                        width={300}
                        height={300}
                        priority
                      /> : null}

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
                      {` ${comment?.repliesId?.length}`}
                    </span>
                  </div>
                </div>
              ))
            }
          </>)}
      </>
    </div>
  );
}