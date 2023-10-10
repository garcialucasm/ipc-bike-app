function Input(props: { type: string; placeholder: string }) {
  return (
    // bootstrap classes
    <input className="form-control" type={props.type} placeholder={props.placeholder} />
  );
}

export default Input;
