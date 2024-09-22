import withAuth from "@/app/auth/withAuth"
import ManageAccounts from "@/components/ManageAccounts/ManageAccounts"
import { AccountTypePermission } from "@/types/AccountType"

const ManageAccountsPage = () => {
  const isAuth = withAuth([AccountTypePermission.ADMIN])
  if (isAuth) {
    return <ManageAccounts />
  }
}

export default ManageAccountsPage
