"use client"

import Image from "next/image"
import Link from "next/link"
import { useFramerMotion } from "@/context/framerMotion"
import { NavigationPaths } from "@/types/NavigationPaths"
import FooterWeb from "../Footers/FooterWeb"

function HomeWeb() {
  const { motion } = useFramerMotion()
  return (
    <>
      <main className="background-mash-noise-dark flex min-h-screen h-max flex-col items-center justify-between p-24 pt-[69px] text-white">
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            delay: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="z-10 my-8 w-full max-w-6xl items-center justify-between font-mono text-sm lg:flex"
        >
          <a
            href="https://github.com/garcialucasm/ipc-bike-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="hidden w-full justify-center border-b border-neutral-500 border-opacity-20 pb-6 pt-8 transition-all duration-300 hover:border-blue-700 hover:bg-blue-950/30 hover:shadow-center-lg hover:shadow-purple-800 lg:static lg:flex lg:w-auto lg:rounded-xl lg:border lg:p-4">
              Github project 👉
              <code className="ps-1 font-mono font-bold text-blue-500">
                /ipc-bike-app
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
                href="https://lucasgarcia.work"
                className="transition-colors hover:text-blue-500"
              >
                <span className="font-bold">Lucas</span>
              </a>
              &
              <a
                href="https://felipedu.art"
                className="transition-colors hover:text-blue-500"
              >
                <span className="font-bold">Felipe</span>
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          viewport={{ once: true }}
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            duration: 2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="after:bg-gradient-conic relative my-8 flex place-items-center before:absolute before:h-[450px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-to-br before:from-transparent before:to-blue-700 before:opacity-10 before:blur-2xl before:content-[''] after:absolute after:h-[180px] after:w-full after:translate-x-1/3 after:from-sky-900 after:via-[#0141ff] after:opacity-40 after:blur-2xl after:content-[''] sm:before:w-[680px] sm:after:w-[240px] before:lg:h-[360px]"
        >
          <Image
            className="relative drop-shadow-[0_0_0.3rem_#ffffff70]"
            src="/logo-ipc-bike-white.png"
            alt="IPC Bike Logo"
            width={220}
            height={74}
            priority
          />
        </motion.div>

        <motion.div
          viewport={{ once: true }}
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-6xl lg:grid-cols-4 lg:text-left"
        >
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScVMcb64zo40oHOvnjtm2sT7N8sNCRJpY4e1EPDuo8Hz5iLSg/viewform?usp=sf_link"
            className="group rounded-lg border border-transparent px-4 py-4 transition-all duration-300 hover:border-blue-700 hover:bg-blue-950/30"
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
            className="group rounded-lg border border-transparent px-4 py-4 transition-all duration-300 hover:border-blue-700 hover:bg-blue-950/30"
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

          <Link
            href={NavigationPaths.project}
            className="group rounded-lg border border-transparent px-4 py-4 transition-all duration-300 hover:border-blue-700 hover:bg-blue-950/30"
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
          </Link>

          <a
            href={NavigationPaths.contact}
            className="group rounded-lg border border-transparent px-4 py-4 transition-all duration-300 hover:border-blue-700 hover:bg-blue-950/30"
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
        </motion.div>
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          transition={{
            delay: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="pt-12"
        >
          <FooterWeb />
        </motion.div>
      </main>
    </>
  )
}

export default HomeWeb
