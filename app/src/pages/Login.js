import { useContext, useState } from "react";
import ButtonC from "./components/button";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

export default function Login({ register }) {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(register);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setToken, setUser, easyRequest } = useContext(AuthContext);

  const resetContent = (onlyPassword) => {
    setPassword('');

    if (onlyPassword) return;

    setName('');
    setEmail('');
    setError(null);
  }

  const buildContent = () => {
    const content = {
      email,
      password
    };

    if (isRegister) content.name = name;

    return content;
  }

  const login = async () => {
    const content = buildContent();

    const response = await easyRequest(`auth/${isRegister ? 'register' : 'login'}`, content, 'POST');
    
    if (response?.message) {
      setError(response.message);

      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }

    if (response?.token) {
      setToken(response.token);
      setUser(response.user);
      return navigate('/');
    }

    resetContent(true);
  }

  return (
    // centralized content with an white rounded border
    <main className='flex flex-col justify-center items-center min-h-screen'>
      <div className='flex flex-col justify-center items-center p-10 bg-black border-opacity-25 border-white border-2 rounded-2xl'>
        <img
          className="mb-5"
          src='/logo.png'
          alt='QuickDev Logo'
          width={100}
          height={24}
          priority
        />
        <h1 className='text-2xl font-bold text-center mb-5'>
          {isRegister ? 'Register' : 'Login'}
        </h1>
        <form className='flex flex-col justify-center items-center w-full'>
          {isRegister ? <input
            className='p-2 min-w-40 bg-white bg-opacity-5 hover:bg-opacity-10 text-white font-bold rounded mb-3'
            type='text'
            placeholder='Name'
            onChange={e => setName(e.target.value)}
          /> : null }
          <input
            className='p-2 min-w-40 bg-white bg-opacity-5 hover:bg-opacity-10 text-white font-bold rounded mb-3'
            type='text'
            placeholder='Email'
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className='p-2 min-w-40 bg-white bg-opacity-5 hover:bg-opacity-10 text-white font-bold rounded'
            type='password'
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}
          />
        </form>
        <div className='flex flex-row justify-center items-center w-full mt-5 mb-5 gap-5'>
          <ButtonC
            title={isRegister ? 'Cancel' : 'Register'}
            style={{ marginLeft: 10 }}
            onClick={() => { isRegister ? navigate('/login') : navigate('/register'); resetContent(); setIsRegister(reg => !reg) }}
          />
          <ButtonC
            title={isRegister ? 'Register' : 'Login'}
            onClick={() => login()}
            bgOpacity
          />
        </div>
          <span className={`${error ? 'text-red-500' : 'text-black'} text-sm`}>
            {error || 'none'}
          </span>
      </div>
    </main>
  );
}