import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from 'react-router-dom';
import SideMenu from "./components/sideMenu";
import ButtonC from "./components/button";

export default function Profile() {
  const { userId } = useParams();
  const { easyRequest, reload, setReload, clearContext, confirmAction, user } = useContext(AuthContext);
  const [userProfile, setUserData] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      if (userProfile && !reload) return;

      const response = await easyRequest(`user/${userId}`);

      if (response?.message) {
        return;
      }

      setUserData(response);
      setReload(false);
    }

    getUserData();
  }, [easyRequest, reload, setReload, userProfile, userId]);

  useEffect(() => {
    if (editProfile) {
      setName(userProfile?.name);
    }
  }, [editProfile, userProfile]);

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
                  <div className="relative rounded-full cursor-pointer">
                    <span
                      className="absolute z-40 w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-300 text-white hover:bg-black hover:bg-opacity-60 justify-center items-center flex"
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
                          const response2 = await easyRequest(`user/${userProfile?._id}`, { image: newImage }, 'PATCH');
                          setUserData(response2);
                          setReload(true);
                        }
                      }}
                    >
                      EDIT
                    </span>
                    <img
                      className="rounded-full"
                      src={userProfile?.image || '/portrait-placeholder.png'}
                      alt='user'
                      width={100}
                      height={100}
                      priority
                    />
                  </div>
                  <div className='flex flex-col justify-start items-start ml-5'>
                    {editProfile ? <input
                      className='p-2 min-w-40 bg-white bg-opacity-5 hover:bg-opacity-10 text-white font-bold rounded mb-3'
                      type='text'
                      placeholder='Name'
                      value={name}
                      onChange={e => setName(e.target.value)}
                    /> :
                      <h1 className='text-2xl font-bold'>{userProfile?.name}</h1>
                    }
                    <h2 className='text-xl font-bold'>{userProfile?.email}</h2>
                    {user?.id === userId ?
                      <div
                        className="flex mt-5 gap-3"
                      >
                        <ButtonC
                          title={editProfile ? 'Save' : 'Edit Profile'}
                          bgOpacity
                          onClick={async () => {
                            if (editProfile) {
                              const data = await easyRequest(`user/${userProfile?._id}`, { name: name }, 'PATCH');
                              setUserData(data);
                              setReload(true);
                              setEditProfile(false);
                            } else {
                              setEditProfile(true);
                            }
                          }}
                        />
                        <ButtonC
                          title='Delete Account'
                          bgOpacity
                          onClick={() => {
                            confirmAction('delete-account', () => {
                              return () => {
                                easyRequest(`user/${userProfile?._id}`, null, 'DELETE');
                                setReload(true);
                              };
                            }, () => { })
                          }}
                        />
                      </div> : null}
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
