import withAuth from "@/app/auth/withAuth"

const HomeStudent = () => {
  const isAuth = withAuth()
  if (isAuth) {
    return (
      <>
        <p>Home Page Student</p>
      </>
    )
  }
}
export default HomeStudent
