import HomePage from "@/components/Home/HomePage"
import { logger } from "@/logger"

export default function App() {
  const componentName = HomePage.name
  logger.info(`Page ${componentName} called`)
  return <HomePage />
}
