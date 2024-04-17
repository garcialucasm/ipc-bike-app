import withAuth from "@/app/auth/withAuth"
import RegisterForm from "@/components/Forms/RegisterForm"

const RegisterAccountPage = () => {
  const componentName = RegisterAccountPage.name
  const isAuth = withAuth()

  if (isAuth) {
    return <RegisterForm />
  }
}

export default RegisterAccountPage
