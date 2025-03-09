"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

import { AccountStatus, AccountType } from "@/types/AccountType"
import { toPascalCase } from "@/utils/strings"
import {
  getAllAccountsFetchApi,
  toggleAccountActivationFetchApi,
} from "@/services/accountApi"

import ActionButtonCancel from "../Buttons/ActionButtonCancel"
import ActionButtonConfirm from "../Buttons/ActionButtonConfirm"
import StatusIndicator from "../Others/StatusIndicator"
import TableHeader from "./modules/TableHeader"
import ComponentTitle from "../Others/ComponentTitle"

function Inventory() {
  const { data: session } = useSession()
  const emptyAccounts: AccountType[] | null = []
  const [reloadData, setReloadData] = useState(false)
  const [allAccounts, setAllAccounts] = useState(emptyAccounts)
  const currentAccountEmail = session?.user?.email

  async function handleClick(account: AccountType) {
    try {
      await toggleAccountActivationFetchApi(account.Email)
      setReloadData(!reloadData)
    } catch (error) {
      console.error(
        "handleClick ~ toggleAccountActivationFetchApi ~ error:",
        error
      )
    }
  }

  async function fetchAllAccounts() {
    const res = await getAllAccountsFetchApi()
    setAllAccounts(res.data.allAccounts)
  }

  useEffect(() => {
    fetchAllAccounts()
  }, [reloadData])

  if (allAccounts && allAccounts.length > 0) {
    return (
      <>
        <ComponentTitle>Manage Accounts</ComponentTitle>
        <div className="w-full overflow-x-auto rounded-2xl">
          <table className="w-full text-left text-sm rtl:text-right">
            <TableHeader />
            <tbody>
              {allAccounts.map((account: AccountType) => (
                <tr
                  key={account.ID}
                  className={`whitespace-nowrap border-b-2 border-white py-4 odd:bg-slate-50 even:bg-slate-100 ${account.IsActive ? "text-slate-900" : "text-slate-400"}`}
                >
                  <th scope="row" className="p-2">
                    <div
                      className="flex justify-center"
                      title={
                        account.IsActive
                          ? AccountStatus.IS_ACTIVE
                          : AccountStatus.INACTIVE
                      }
                    >
                      <StatusIndicator
                        currentStatus={
                          (account.IsActive
                            ? AccountStatus.IS_ACTIVE
                            : AccountStatus.INACTIVE) as AccountStatus
                        }
                      />
                    </div>
                  </th>
                  <td className="max-w-36 overflow-hidden truncate text-ellipsis p-2 font-medium">
                    {toPascalCase(account.Name)}
                  </td>
                  <td className="p-2">{account.Email?.toLowerCase()}</td>
                  <td className="p-2">{toPascalCase(account.Type)}</td>
                  <td className="flex w-full flex-row items-center justify-center p-2">
                    <div title="Disable Account" className="flex">
                      <ActionButtonCancel
                        onClick={() => handleClick(account)}
                        name="send-for-maintenance"
                        disabled={
                          (currentAccountEmail === account.Email ||
                            account.IsActive === false) &&
                          true
                        }
                      ></ActionButtonCancel>
                    </div>
                    <div title="Activate Account" className="flex">
                      <ActionButtonConfirm
                        onClick={() => handleClick(account)}
                        name="return-from-maintenance"
                        disabled={
                          (currentAccountEmail === account.Email ||
                            account.IsActive === true) &&
                          true
                        }
                      ></ActionButtonConfirm>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )
  }
}

export default Inventory
