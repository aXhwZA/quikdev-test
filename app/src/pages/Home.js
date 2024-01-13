import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SideMenu from "./components/sideMenu"
import ButtonC from "./components/button"
import Posts from "./Posts";

export default function Home() {
  const { clearContext } = useContext(AuthContext);

  return(
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
            <ButtonC title='Logout' bgOpacity onClick={() => clearContext()}/>
          </div>
        </div>
        <div className='ml-[11.9rem] flex min-h-[85vh] min-w-[60vw] flex-col relative'>
          <Posts />
        </div>
      </div>
    </main>
  )
}