import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import NewPost from "../components/newPost";

export default function CommentsFullView({ commentView, onClose, postUserId }) {
  const { easyRequest, reload, setReload, user, confirmAction } = useContext(AuthContext);
  const [viewReplies, setViewReplies] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const getComments = async () => {
      const response = await easyRequest(`comment/${commentView.id}`);

      if (response?.message) {
        return;
      }

      setComments(response);
      setReload(false);
    }

    getComments();
  }, [easyRequest, commentView?.id, reload, setReload]);

  const convertDateTime = (date) => {
    const newDate = new Date(date);

    return `${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString()}`;
  }

  return (
    <div>
      {comments === null ? <span>Loading...</span> : (
        <>
          {viewReplies ? <CommentsFullView commentView={viewReplies} onClose={() => setViewReplies(null)} /> : (
            <>
              <span
                onClick={() => onClose()}
                className='ml-5 text-1xl font-bold text-center mb-2 cursor-pointer'
              >{`< Comment`}</span>
              <div key={comments._id} className='flex flex-col justify-start items-start w-full border-white border-l-2 border-b-2 border-r-2 border-opacity-20 p-6'>
                <div className='flex flex-row justify-between items-center w-full'>
                  <div className='flex flex-row justify-start items-center w-full'>
                    <img
                      className="rounded-full"
                      src={comments?.user?.image || '/portrait-placeholder.png'}
                      alt='user'
                      width={40}
                      height={40}
                      priority
                    />
                    <div className='flex flex-col justify-start items-start ml-5'>
                      <span className='text-1xl font-bold text-center mb-2'>{comments.user.name}</span>
                    </div>
                  </div>
                  <span className='text-xs text-gray-400'>{convertDateTime(comments.createdAt)}</span>
                  {postUserId === user?.id || comments?.userId === user?.id ? <div
                    className='flex flex-row justify-start items-center cursor-pointer'
                    onClick={(e) => {
                      e.stopPropagation();

                      confirmAction('delete-comment', () => {
                        return () => {
                          easyRequest(`comment/${comments?._id}`, null, 'DELETE');
                          setReload(true);
                          onClose();
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
                    <span className='text-sm'>{comments.description}</span>

                    {comments?.image ? <img
                      className="rounded-lg w-[90%] mt-2"
                      src={comments?.image}
                      alt='comments'
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
                    {` ${comments.replies.length}`}
                  </span>
                </div>
              </div>
              <NewPost type='reply' contentId={comments._id} />
              {
                comments.replies?.map((comment) => (
                  <div
                    key={comment._id}
                    className='cursor-pointer flex flex-col justify-start items-start w-full border-white border-l-2 border-b-2 border-r-2 border-opacity-20 p-6'
                    onClick={() => setViewReplies(comment)}
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
                      {postUserId === user?.id || comment?.userId === user?.id ? <div
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
            </>
          )}
        </>
      )}
    </div>
  );
}