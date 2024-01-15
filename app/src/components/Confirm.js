import ButtonC from "../pages/components/button";

export default function Confirm(props) {
  const defaultMessages = {
    delete: 'Are you sure you want to delete this post?',
    logout: 'Are you sure you want to logout?',
    cancel: 'Are you sure you want to cancel?',
    'delete-comment': 'Are you sure you want to delete this comment?',
    'delete-account': 'Are you sure you want to delete your account?',
  };

  return (
    <div className='fixed z-50 backdrop-blur-sm flex flex-col justify-center items-center w-full h-full'>
      <div className='flex flex-col justify-center items-center p-10 bg-black border-stone-500 border-2 rounded-lg'>
        <span className='mb-10 text-2xl font-bold text-center'>{props.message || defaultMessages[props?.type]}</span>
        <div className='flex flex-row justify-center items-center w-full gap-10'>
          <ButtonC
            className='p-2 min-w-40 text-white font-bold rounded bg-red-400 hover:bg-red-500'
            onClick={() => props.onCancel()}
            title='Cancel'
            bgOpacity
          />
          <ButtonC
            onClick={() => props.onConfirm()}
            title='Confirm'
            bgOpacity
          />
        </div>
      </div>
    </div>
  );
}