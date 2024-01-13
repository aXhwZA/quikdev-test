export default function ButtonC(props) {
  const classNameStream = `p-2 min-w-40 bg-white ${props.bgOpacity ? 'bg-opacity-5' : 'bg-opacity-0'} hover:bg-opacity-10 text-white font-bold rounded`;

  return (
    <button
      className={classNameStream}
      { ...props }
    >
      {props.children}
      {props?.title ? props.title : null}
    </button>
  );
}
