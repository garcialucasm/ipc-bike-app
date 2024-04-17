import withAuth from "@/app/auth/withAuth"

const HomeStudentPage = () => {
  const componentName = HomeStudentPage.name
  const isAuth = withAuth()
  if (isAuth) {
    return (
      <>
        <p>Home Page Student</p>
      </>
    )
  }
}
export default HomeStudentPage
