import { useState, useContext } from "react"
import ButtonC from "./button"
import { AuthContext } from "../../context/AuthContext";

export default function NewPost({ type, contentId }) {
  const { easyRequest, user, setReload } = useContext(AuthContext);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [newPost, setNewPost] = useState(false);
  const [postImage, setPostImage] = useState('');

  const post = async () => {
    const content = {
      title: postTitle,
      description: postContent,
      userId: user._id,
      image: postImage,
    };

    if (type === 'comment') {
      delete content.title;
      content.postId = contentId;
    }

    if (type === 'reply') {
      delete content.title;
      content.repliesId = contentId;
    }

    await easyRequest(type ? 'comment' : 'post', content, 'POST');
    setNewPost(false);
    clearData();
    setReload(true);
  }

  const clearData = () => {
    setPostTitle('');
    setPostContent('');
    setPostImage('');
  };

  return (
    <div className='flex flex-col justify-start items-start w-full border-white border-l-2 border-r-2 border-b-2 border-opacity-20 p-6'>
      <div className='flex flex-row justify-between flex-start w-full'>
        <div className='flex flex-row justify-start items-start w-full'>
          <img
            className="rounded-full"
            src={user?.image || '/portrait-placeholder.png'}
            alt='user'
            width={40}
            height={40}
            priority
          />
          <div className='flex flex-col justify-start items-start ml-5'>
            {newPost ? (
              <>
                {type ? null : <input
                  className='text-1xl font-bold mb-2 bg-white bg-opacity-10 border-none rounded p-2'
                  type='text'
                  placeholder='Title'
                  onChange={e => setPostTitle(e.target.value)}
                  autoFocus
                />}

                <textarea
                  className='text-l mb-2 bg-white bg-opacity-10 border-none rounded p-2'
                  placeholder='Description...'
                  rows={2}
                  cols={60}
                  maxLength={100}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  {...type && { autoFocus: true }}
                />

                <ButtonC
                  className=''
                  bgOpacity
                  onClick={() => {
                    const file = document.createElement('input');
                    file.type = 'file';
                    file.accept = 'image/*';
                    file.click();
                    file.onchange = async () => {
                      const formData = new FormData();
                      formData.append('file', file.files[0]);
                      formData.append('upload_preset', 'ml_default');
                      const response = await fetch('https://api.cloudinary.com/v1_1/dvqeaiauk/image/upload', {
                        method: 'POST',
                        body: formData,
                      });
                      const data = await response.json();
                      setPostImage(data.secure_url);
                    }
                  }
                  }
                >
                  <img
                    className={postImage ? 'rounded' : 'dark:invert'}
                    src={postImage || '/image.svg'}
                    alt='new'
                    width={postImage ? 60 : 20}
                    height={postImage ? 60 : 20}
                    priority
                  />
                </ButtonC>

                <div className='flex flex-row justify-end items-center w-full gap-2'>
                  <ButtonC title='Cancel' bgOpacity onClick={() => { setNewPost(false); clearData(); }} />
                  <ButtonC title='Post' bgOpacity onClick={() => post()} />
                </div>
              </>
            ) : (
              <textarea
                className='text-1xl font-bold bg-black border-none rounded p-2'
                placeholder='What is on your mind?'
                value={''}
                rows={type ? 2 : 4}
                cols={50}
                maxLength={100}
                onClick={() => setNewPost(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}