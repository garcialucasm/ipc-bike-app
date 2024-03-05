import FirstRegister from "@/components/Register/FirstRegister"
import withAuth from "../withAuth"

const FirstRegisterPage = () => {
  const componentName = FirstRegisterPage.name
  withAuth(componentName)
  return <FirstRegister />
}

export default FirstRegisterPage
