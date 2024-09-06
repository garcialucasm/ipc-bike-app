import withAuth from "@/app/auth/withAuth"
import ManageAccounts from "@/components/ManageAccounts/ManageAccounts"

const ManageAccountsPage = () => {

  const isAuth = withAuth()
  if (isAuth) {
    return <ManageAccounts />
  }
}

export default ManageAccountsPage
