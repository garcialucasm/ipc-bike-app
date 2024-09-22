"use client"

import Image from "next/image"
import { useFramerMotion } from "@/context/framerMotion"
import { NavigationPaths } from "@/types/NavigationPaths"
import Link from "next/link"

function HalfPageLogo() {
  const { motion } = useFramerMotion()

  return (
    <>
      <div className="background-mash-noise-light relative hidden w-1/2 items-center justify-center overflow-hidden shadow-lg shadow-black md:flex md:flex-col">
        <Link href={NavigationPaths.homeWeb}>
          <motion.span
            viewport={{ once: true }}
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Image
              src="/logo-ipc-bike-white.png"
              className="h-56 w-auto"
              width={224}
              height={224}
              alt=""
              priority
            />
          </motion.span>
          <motion.p
            viewport={{ once: true }}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="mt-1 text-white"
          >
            Book, Ride, Explore: All for Free
          </motion.p>
        </Link>
      </div>
      <div className="background-solid-noise fixed flex h-20 w-full items-center bg-blue-700 px-4 md:hidden">
        <Link href={NavigationPaths.homeWeb} className="ms-2 flex">
          <Image
            src="/logo-ipc-bike-white-h.png"
            className="h-8 w-auto"
            width={194}
            height={32}
            alt=""
          />
          <span className="sr-only self-center whitespace-nowrap text-xl font-semibold sm:text-2xl">
            IPC Bike App
          </span>
        </Link>
      </div>
    </>
  )
}

export default HalfPageLogo
