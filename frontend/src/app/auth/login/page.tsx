import Login from "@/components/Forms/LoginForm"
import withAuth from "../withAuth"

const LoginPage = () => {
  const componentName = LoginPage.name
  withAuth(componentName)
  return <Login />
}

export default LoginPage
