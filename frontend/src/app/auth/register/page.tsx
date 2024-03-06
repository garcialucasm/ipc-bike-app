import FirstRegister from "@/components/Register/FirstRegister"
import { logger } from "@/logger"

const FirstRegisterPage = () => {
  const componentName = FirstRegisterPage.name
  logger.info(`Page ${componentName} called`)
  return <FirstRegister />
}

export default FirstRegisterPage
