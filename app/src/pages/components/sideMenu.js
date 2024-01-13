import { useContext } from "react";
import ButtonC from "./button";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

export default function SideMenu() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <main className='flex flex-col'>
      <ButtonC title='Home' style={{ marginBottom: 10 }} onClick={() => window.location.href = '/'} />
      <ButtonC title='Profile' style={{ marginBottom: 10 }} onClick={() => navigate(`/profile/${user?._id}`)} />
    </main>
  );
}