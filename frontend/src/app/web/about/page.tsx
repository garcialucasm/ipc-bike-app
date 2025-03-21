import { Bookmarks } from "@phosphor-icons/react/dist/ssr/Bookmarks"
import { Bug } from "@phosphor-icons/react/dist/ssr/Bug"
import { CheckFat } from "@phosphor-icons/react/dist/ssr/CheckFat"
import { CheckSquare } from "@phosphor-icons/react/dist/ssr/CheckSquare"
import { Flag } from "@phosphor-icons/react/dist/ssr/Flag"
import { Gear } from "@phosphor-icons/react/dist/ssr/Gear"
import { Heart } from "@phosphor-icons/react/dist/ssr/Heart"
import { Stack } from "@phosphor-icons/react/dist/ssr/Stack"

import ContainerWebpage from "@/components/Containers/ContainerWebpage"
import TitleLabel from "@/components/Others/TitleLabel"
import VersionInformation from "@/components/Web/VersionInformation"
import { NavigationPaths } from "@/types/NavigationPaths"
import Link from "next/link"

const getData = async () => {
  const username = process.env.JIRA_USERNAME?.trim()
  const token = process.env.JIRA_TOKEN?.trim()

  const headers = new Headers()
  headers.set("Authorization", "Basic " + btoa(`${username}:${token}`))
  const options = {
    method: "GET",
    headers: headers,
    // Adjust 'maxResults' as needed, but be aware of API rate limits
    query: `jql=project=IB`,
    cache: "no-store",
  }

  if (!username) {
    console.error("Jira API error: Undefined Jira Username.")
  }

  if (!token) {
    console.error("Jira API error: Undefined Jira Token")
  }

  const res = await fetch("https://ipc-bikes.atlassian.net/rest/api/2/search", {
    ...options,
    cache: "no-store", // Set cache option here
  })

  console.log(`Jira API Fetching status: ${res.status}`)
  if (!res.ok) {
    console.error("Jira API Fetching: Something went wrong")
  }
  return res.json()
}

const About = async () => {
  const data = await getData()

  const renderIssues = (status: string) => {
    return data.issues
      .filter((issue: any) => issue.fields.status.name === status)
      .map((issue: any) => (
        <div key={issue.id} className="mb-4 min-w-80">
          <div
            className={`flex flex-col gap-y-2 rounded bg-gray-800 p-4 ${issue.fields.customfield_10021 && "border border-rose-500"}`}
          >
            <h2 className="">{issue.fields.summary}</h2>
            <div className="flex gap-x-2">
              {issue.fields.parent &&
                issue.fields.parent.fields &&
                issue.fields.parent.fields.summary.includes("Release") && (
                  <span
                    className={`w-fit rounded px-2 py-1 text-xs ${issue.fields.parent.fields.summary == "Alpha Release" ? "bg-blue-200 text-blue-700" : issue.fields.parent.fields.summary == "Beta Release" ? "bg-blue-700 text-blue-200" : issue.fields.parent.fields.summary == "Release Candidate" ? "bg-emerald-200 text-emerald-700" : issue.fields.parent.fields.summary == "Stable Release" ? "bg-emerald-700 text-emerald-200" : "bg-slate-200 text-slate-700"}`}
                  >
                    {issue.fields.parent.fields.summary}
                  </span>
                )}
              <span
                className={`w-fit rounded px-1 py-1 text-xs ${issue.fields.issuetype.name == "Story" ? "bg-emerald-700 text-emerald-200" : issue.fields.issuetype.name == "GTH" ? "bg-blue-200 text-blue-700" : issue.fields.issuetype.name == "Bug" ? "bg-rose-700 text-rose-200" : "bg-slate-200 text-slate-700"}`}
              >
                {issue.fields.issuetype.name}
              </span>
            </div>
            <div className="flex">
              {issue.fields.issuetype.name == "Story" && (
                <Bookmarks
                  size={22}
                  weight="fill"
                  className="text-emerald-500"
                />
              )}
              {issue.fields.issuetype.name == "Bug" && (
                <Bug size={22} weight="fill" className="text-rose-500" />
              )}
              {issue.fields.issuetype.name == "Subtask" && (
                <CheckSquare
                  size={22}
                  weight="fill"
                  className="text-blue-500"
                />
              )}
              {issue.fields.issuetype.name == "GTH" && (
                <Heart size={22} weight="fill" className="text-blue-500" />
              )}
              <span className="flex-grow px-2 text-sm">{issue.key}</span>
              {issue.fields.customfield_10021 && (
                <span>
                  <Flag size={20} weight="fill" className="text-rose-500" />
                </span>
              )}
            </div>
          </div>
        </div>
      ))
  }

  return (
    <ContainerWebpage>
      <div className="flex flex-col gap-y-8">
        <TitleLabel>About</TitleLabel>
        <div className="flex-1 rounded-xl border border-gray-600 p-4 bg-slate-900">
          <p className="mb-2">Welcome to IPC Bike! <span className="text-2xl">👋</span></p>
          <p>
            We've crafted a non-profit web application dedicated to serving
            IPC's community.
          </p>
          <p>
            Our mission? To provide students, faculty, and administrators with a
            hassle-free bike management solution, all at no cost.
          </p>
          <p>
            Below you can get information and updates about the project and
            upcoming features in development.
          </p>
          <p>
            If you have any suggestions, please use our <Link href={NavigationPaths.homeWeb} className="text-blue-400 hover:text-blue-300 hover:underline">feedback forms on the home page</Link> or send
            us a message through our <Link href={NavigationPaths.contact} className="text-blue-400 hover:text-blue-300 hover:underline">contact details</Link>.
          </p>
          <p className="mt-2">Dive in and discover how we're revolutionizing campus mobility! <span className="tracking-tightest text-2xl">🚵‍♀️🚵</span></p>
        </div>
        <TitleLabel>Release Notes and Feature Overview</TitleLabel>
        <VersionInformation />
        <TitleLabel>Development Overview and Issues Tracker</TitleLabel>
        <div className="flex flex-wrap gap-x-4 gap-y-8 text-sm">
          <div className="flex-1 rounded-xl border border-gray-600 p-4">
            <span className="mb-4 flex items-center justify-between">
              <h1 className="font-bold">TO DO</h1>
              <Stack size={24} />
            </span>
            <div>{renderIssues("To Do")}</div>
          </div>
          <div className="flex-1 rounded-xl border border-gray-600 p-4">
            <span className="mb-4 flex items-center justify-between">
              <h1 className="font-bold">IN PROGRESS</h1>
              <Gear size={24} className="animate-spin " />
            </span>
            <div>{renderIssues("In Progress")}</div>
            <div>{renderIssues("IN REVIEW")}</div>
          </div>
          <div className="flex-1 rounded-xl border border-gray-600 p-4">
            <span className="mb-4 flex items-center justify-between">
              <h1 className="font-bold">DONE</h1>
              <CheckFat size={24} />
            </span>
            <div>{renderIssues("Done")}</div>
          </div>
        </div>
      </div>
    </ContainerWebpage>
  )
}

export default About
