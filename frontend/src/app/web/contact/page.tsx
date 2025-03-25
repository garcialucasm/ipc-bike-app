import ContainerWebpage from "@/components/Containers/ContainerWebpage"
import SubtitleLabelWeb from "@/components/Others/SubtitleLabelWeb"
import TitleLabel from "@/components/Others/TitleLabel"
import { GithubLogo } from "@phosphor-icons/react/dist/ssr/GithubLogo"
import { Globe } from "@phosphor-icons/react/dist/ssr/Globe"
import { LinkedinLogo } from "@phosphor-icons/react/dist/ssr/LinkedinLogo"
import Image from "next/image"

const Contact = () => {
  return (
    <>
      <ContainerWebpage>
        <div className="flex flex-col">
          <TitleLabel>
            <div className="mb-4 text-3xl font-semibold">Contact Us</div>
          </TitleLabel>

          <div className="mb-8 flex flex-col gap-y-8">
            <div>
              If you'd like to chat about the project or just have question,
              feel free to reach out and connect with us.
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-8 rounded-2xl border border-slate-500 p-8 lg:flex-row">
                <div>
                  <SubtitleLabelWeb>Lucas Garcia</SubtitleLabelWeb>
                  <div className="mt-4 flex flex-col gap-y-2">
                    <div>
                      Hi! My name is Lucas. I'm a web developer and engineer.
                      I've been working with engineering and technology for over
                      a decade and I love looking for alternatives on how
                      technology and people can work together.
                    </div>
                    <div>
                      I'm naturally curious, resilient, and perpetually working
                      on improvements. Presently, my professional endeavors are
                      centered around web development.
                    </div>
                    <div>
                      To know more about my experience, education and skills,
                      please don't hesitate to connect with me on LinkedIn. And
                      if you have any questions, feel free to get in touch.
                    </div>
                    <div className="mt-8 flex justify-start gap-x-8">
                      <a
                        href="https://www.linkedin.com/in/lucasmgarcia/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-blue-600"
                      >
                        <LinkedinLogo size={36} weight="fill" />
                      </a>
                      <a
                        href="https://github.com/garcialucasm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-slate-500"
                      >
                        <GithubLogo size={36} weight="fill" />
                      </a>
                      <a
                        href="https://lucasgarcia.work"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-amber-500"
                      >
                        <Globe size={36} weight="fill" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="order-first flex items-center justify-center">
                  <Image
                    src="/lucas-garcia-profile-picture.jpeg"
                    width={720}
                    height={720}
                    alt="Lucas Profile"
                    className="rounded-full border-2 border-slate-500 max-w-72"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-8 rounded-2xl border border-slate-500 p-8 lg:flex-row">
                <div>
                  <SubtitleLabelWeb>Felipe Duarte</SubtitleLabelWeb>
                  <div className="mt-4 flex flex-col gap-y-2">
                    <div>
                      Hello, my name is Felipe Duarte, I'm currently living in
                      Porto working as a Software Engineer in Five9.
                    </div>
                    <div>
                      In my website you can find a little bit of my academic and
                      professional experience, the research projects I
                      participated, and texts I write to remember the things I
                      learned along the way.
                    </div>
                    <div>
                      If you have any questions, feel free to drop me a message
                      in Linkedin.
                    </div>
                    <div className="mt-8 flex justify-start gap-x-8">
                      <a
                        href="https://www.linkedin.com/in/felipe-duarte-dos-reis-99801389/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-blue-600"
                      >
                        <LinkedinLogo size={36} weight="fill" />
                      </a>
                      <a
                        href="https://github.com/felipedreis"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-slate-500"
                      >
                        <GithubLogo size={36} weight="fill" />
                      </a>
                      <a
                        href="https://felipedu.art"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-amber-500"
                      >
                        <Globe size={36} weight="fill" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="order-first flex items-center justify-center">
                  <Image
                    src="/felipe-duarte-profile-picture.png"
                    width={720}
                    height={720}
                    alt="Lucas Profile"
                    className="rounded-full border-2 border-slate-500 max-w-72"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerWebpage>
    </>
  )
}

export default Contact
