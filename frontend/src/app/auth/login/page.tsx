import Login from "@/components/Forms/LoginForm"
import { logger } from "@/logger"

const LoginPage = () => {
  const componentName = LoginPage.name
  logger.info(`Page ${componentName} called`)
  return <Login />
}

export default LoginPage
