import { GitBranch } from "@phosphor-icons/react/dist/ssr/GitBranch"
import { GitMerge } from "@phosphor-icons/react/dist/ssr/GitMerge"
import { Stack } from "@phosphor-icons/react/dist/ssr/Stack"

const versionInformation = {
  currentVersion: {
    lastUpdate: "",
    versionNumber: "0.0.3",
    interface: "Access only to the Student Council",
    features: [
      "Login System",
      "User Registration",
      "Bike Chooser",
      "Create Single Booking",
      "Approve, Return or Cancel Bookings",
      "Interface to see bike availability",
      "Project Webpage",
    ],
  },
  nextVersion: {
    versionNumber: "0.1.0",
    interfaces: ["Student Council", "Admin"],
    features: [
      "Interface for previous or canceled bookings",
      "Bike inventory management interface",
      "Different interfaces and permissions for admin and student council",
      "User management interface for admin",
    ],
  },
  expectedVersion: {
    versionNumber: "",
    interfaces: ["Student Council", "Admin", "Student"],
    features: [
      "Interface for the common students",
      "Calendar booking feature",
      "Booking expiration",
      "Manage Profile",
      "Bike usage statistics",
      "Group Booking",
      "Class Booking",
      "Custom Settings",
    ],
  },
}

const repoOwner = "garcialucasm"
const repoName = "ipc-alumni-bike"
const branchName = "main"
let formattedDate: any

fetch(
  `https://api.github.com/repos/${repoOwner}/${repoName}/commits/${branchName}`
)
  .then((response) => response.json())
  .then((data) => {
    const lastCommitDate = new Date(data.commit.author.date)
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
    formattedDate = lastCommitDate.toLocaleDateString("en-US", options)
  })
  .catch((error) => {
    console.error("Error fetching commit data:", error)
  })

function VersionInformation() {
  return (
    <div className="mb-4 flex flex-wrap gap-x-4 gap-y-8 text-sm">
      <div className="min-w-64 flex-1 rounded-xl border border-gray-600 bg-gray-900 text-white">
        <span className="flex items-center justify-between border-b border-gray-600 p-4">
          <h1 className="font-bold">EXPECTED FEATURES</h1>
          <Stack size={24} />
        </span>
        <ul className="p-4">
          {versionInformation.expectedVersion.features.map((feature, index) => (
            <li
              key={index}
              className="mx-8 list-disc marker:text-xs marker:text-gray-300"
            >
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="min-w-64 flex-1 rounded-xl border border-gray-600 bg-gray-900 text-white">
        <span className="flex items-center justify-between border-b border-gray-600 p-4">
          <h1 className="font-bold">
            NEXT VERSION{" "}
            <span className="px-2 text-xs font-light italic">
              (Beta {versionInformation.nextVersion.versionNumber})
            </span>
          </h1>
          <GitBranch size={24} />
        </span>
        <ul className="p-4">
          {versionInformation.nextVersion.features.map((feature, index) => (
            <li
              key={index}
              className="mx-8 list-disc marker:text-xs marker:text-gray-300"
            >
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="min-w-64 flex-1 rounded-xl border border-green-600 bg-gray-900 text-white">
        <span className="flex items-center justify-between border-b border-gray-600 p-4">
          <h1 className="font-bold">
            CURRENT VERSION{" "}
            <span className="px-2 text-xs font-light italic">
              (Alpha {versionInformation.currentVersion.versionNumber})
            </span>
          </h1>
          <GitMerge size={24} />
        </span>
        <ul className="p-4">
          {versionInformation.currentVersion.features.map((feature, index) => (
            <li
              key={index}
              className="mx-8 list-disc marker:text-xs marker:text-gray-300"
            >
              {feature}
            </li>
          ))}
        </ul>
        <p className="px-4 pb-4 text-right text-xs italic text-gray-300">
          Last Commit: <span className="text-green-500 ">{formattedDate}</span>
        </p>
      </div>
    </div>
  )
}

export default VersionInformation
