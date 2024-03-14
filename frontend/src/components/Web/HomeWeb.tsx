"use client"

import Image from "next/image"

function HomeWeb() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-tr from-gray-900 via-black to-gray-900 p-24 pt-[69px] text-white">
        <div className="z-10 my-8 w-full max-w-6xl items-center justify-between font-mono text-sm lg:flex">
          <a
            href="https://github.com/garcialucasm/ipc-alumni-bike"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="hidden w-full justify-center border-b border-neutral-800 bg-zinc-800/30 bg-gradient-to-b from-inherit pb-6 pt-8 backdrop-blur-2xl hover:border-blue-700 hover:bg-blue-950/30 lg:static  lg:flex lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:bg-zinc-800/30 lg:p-4">
              Github project 👉
              <code className="ps-1 font-mono font-bold text-blue-500">
                /ipc-alumni-bike
              </code>
            </p>
          </a>
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-black via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <div
              className="pointer-events-auto flex place-items-center gap-2 p-8 lg:p-0"
              rel="noopener noreferrer"
            >
              By{" "}
              <a
                href="https://github.com/garcialucasm"
                className="hover:text-blue-500"
              >
                <span className="font-bold">Lucas</span>
              </a>
              &
              <a
                href="https://github.com/felipedreis"
                className="hover:text-blue-500"
              >
                <span className="font-bold">Felipe</span>
              </a>
            </div>
          </div>
        </div>

        <div className="after:bg-gradient-conic relative my-8 flex place-items-center before:absolute before:h-[450px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-to-br before:from-transparent before:to-blue-700 before:opacity-10 before:blur-2xl before:content-[''] after:absolute after:h-[180px] after:w-full after:translate-x-1/3 after:from-sky-900 after:via-[#0141ff] after:opacity-40 after:blur-2xl after:content-[''] sm:before:w-[680px] sm:after:w-[240px] before:lg:h-[360px]">
          <Image
            className="relative drop-shadow-[0_0_0.3rem_#ffffff70]"
            src="/logo-ipc-alumni-bike-white.png"
            alt="IPC Bike Logo"
            width={220}
            height={74}
            priority
          />
        </div>

        <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-6xl lg:grid-cols-4 lg:text-left">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScVMcb64zo40oHOvnjtm2sT7N8sNCRJpY4e1EPDuo8Hz5iLSg/viewform?usp=sf_link"
            className="group rounded-lg border border-transparent px-4 py-4 transition-colors hover:border-blue-700 hover:bg-blue-950/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 flex items-center text-2xl font-semibold`}>
              Feedback Form{" "}
              <span className="inline-block ps-2 transition-transform group-hover:-translate-y-2 group-hover:translate-x-2 motion-reduce:transform-none">
                🚀
              </span>
            </h2>
            <p className={`m-0 inline max-w-[30ch] text-sm opacity-50`}>
              Help us with your feedback using this Google form.
            </p>
          </a>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScXNfkNSFDAaBfxreMgxxN5GcD58SIxPmGQher0-JtWq1u7Fw/viewform"
            className="group rounded-lg border border-transparent px-4 py-4 transition-colors hover:border-blue-700 hover:bg-blue-950/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`text-2xl font-semibold`}>
              Feedback Form{" "}
              <span className="inline-block transition-transform group-hover:translate-x-2 motion-reduce:transform-none">
                🖼️
              </span>
            </h2>
            <p className="mb-3 text-sm italic">(to send screenshots)</p>
            <p className={`m-0 inline max-w-[30ch] text-sm opacity-50`}>
              To send us screenshots, please use this form instead.
            </p>
          </a>

          <a
            href="/planning"
            className="group rounded-lg border border-transparent px-4 py-4 transition-colors hover:border-blue-700 hover:bg-blue-950/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Next features{" "}
              <span className="inline-block transition-transform group-hover:translate-x-2 group-hover:rotate-45 motion-reduce:transform-none">
                ⚙️
              </span>
            </h2>
            <p className={`m-0 inline max-w-[30ch] text-sm opacity-50`}>
              See the next features in the queue for development.
            </p>
          </a>

          <a
            href="/contacts"
            className="group rounded-lg border border-transparent px-4 py-4 transition-colors hover:border-blue-700 hover:bg-blue-950/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Get in touch{" "}
              <span className="inline-block transition-transform group-hover:-translate-y-1  group-hover:translate-x-2 group-hover:rotate-45 motion-reduce:transform-none">
                👋
              </span>
            </h2>
            <p
              className={`m-0 inline max-w-[30ch] text-balance text-sm opacity-50`}
            >
              Please feel free to contact us.
            </p>
          </a>
        </div>
      </main>
    </>
  )
}

export default HomeWeb
