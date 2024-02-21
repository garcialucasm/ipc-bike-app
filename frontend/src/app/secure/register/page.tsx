import withAuth from "@/app/auth/withAuth"
import RegisterForm from "@/components/Forms/RegisterForm"

const RegisterAccount = () => {
  const isAuth = withAuth()

  if (isAuth) {
    return <RegisterForm />
  }
}

export default RegisterAccount
