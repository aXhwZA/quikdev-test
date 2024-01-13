import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from 'react-router-dom';
import SideMenu from "./components/sideMenu";
import ButtonC from "./components/button";

export default function Profile() {
  const { userId } = useParams();
  const { easyRequest, reload, setReload, clearContext } = useContext(AuthContext);
  const [user, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      if (user && !reload) return;

      const response = await easyRequest(`user/${userId}`);

      if (response?.message) {
        return;
      }

      setUserData(response);
      setReload(false);
    }

    getUserData();
  }, [easyRequest, reload, setReload, user, userId]);

  return (

    <main className='flex min-h-screen flex-col justify-between p-10'>
      <div className='flex flex-row items-start'>
        <div className='flex flex-col justify-start z-10 items-start min-h-[85vh] font-mono text-sm w-48 border-white border-opacity-20 fixed'>
          <div className='bottom-0 left-0 flex w-full items-end justify-center static bg-none'>
            <a
              className='flex place-items-center gap-2 pointer-events-auto p-8'
              href="/"
            >
              To{' '}
              <img
                src='/logo.png'
                alt='QuickDev Logo'
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
          <div className='flex flex-col justify-between min-h-[80vh]'>
            <SideMenu />
            <ButtonC title='Logout' bgOpacity onClick={() => clearContext()} />
          </div>
        </div>
        <div className='ml-[11.9rem] flex min-h-[85vh] min-w-[60vw] flex-col relative'>
          <div>
            <div className='flex flex-col justify-start items-start w-full border-white border-l-2 border-r-2 border-b-2 border-opacity-20 p-6'>
              <div className='flex flex-row justify-between flex-start w-full'>
                <div className='flex flex-row justify-start items-start w-full'>
                  <img
                    className="rounded-full cursor-pointer"
                    src={user?.image || '/portrait-placeholder.png'}
                    alt='user'
                    width={100}
                    height={100}
                    priority
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
                        const newImage = data.secure_url;
                        const response2 = await easyRequest(`user/${user?._id}`, { image: newImage }, 'PATCH');
                        if (response2?.message) {
                          return;
                        }
                        setReload(true);
                      }
                    }}
                  />
                  <div className='flex flex-col justify-start items-start ml-5'>
                    <h1 className='text-2xl font-bold'>{user?.name}</h1>
                    <h2 className='text-xl font-bold'>{user?.email}</h2>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
