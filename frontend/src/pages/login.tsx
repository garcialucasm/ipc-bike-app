import Link from "next/link";
import Input from "@/components/input/Input";

function Login() {
  return (
    <div>
      <h1>Login required</h1>
      <form className="form">
        <Input type="text" placeholder="Username" />
        <Input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
