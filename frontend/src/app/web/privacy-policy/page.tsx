import ContainerWebpage from "@/components/Containers/ContainerWebpage"
import SubtitleLabelWeb from "@/components/Others/SubtitleLabelWeb"
import TextWithBgLabelWeb from "@/components/Others/TextWithBgLabelWeb"
import TitleLabelWeb from "@/components/Others/TitleLabelWeb"
import { NavigationPaths } from "@/types/NavigationPaths"
import Link from "next/link"

const PrivacyPolicy = () => {
  return (
    <>
      <ContainerWebpage>
        <div className="flex flex-col gap-y-8">
          <TitleLabelWeb>Privacy Policy</TitleLabelWeb>
          <div className="flex flex-col gap-y-4">
            <div>
              <SubtitleLabelWeb>
                <span className="me-2 ms-1">1. </span>Definitions
              </SubtitleLabelWeb>
              <TextWithBgLabelWeb>
                <p>
                  At IPC Bike App, we prioritize the protection of your privacy.
                  This Privacy Policy outlines how we collect, use, and
                  safeguard the limited information you provide when using our
                  application.
                </p>
              </TextWithBgLabelWeb>
            </div>

            <div>
              <SubtitleLabelWeb>Information We Collect</SubtitleLabelWeb>
              <TextWithBgLabelWeb>
                <p>
                  We collect only essential information that you voluntarily
                  provide to us when using our app. The information collected is
                  minimal and solely intended to facilitate the login process
                  and enable communication with bike administrators in case of
                  need. This may include:
                </p>
                <ul className="ps-4">
                  <li className="list-disc">Name</li>
                  <li className="list-disc">Email address</li>
                  <li className="list-disc">Contact information</li>
                  <li className="list-disc">IPC Bike App usage data</li>
                </ul>
              </TextWithBgLabelWeb>
            </div>

            <div>
              <SubtitleLabelWeb>How We Use Your Information</SubtitleLabelWeb>
              <TextWithBgLabelWeb>
                <p>
                  The information we collect is used for the following purposes:
                  <ul className="ps-4">
                    <li className="list-disc">To enable the login process.</li>
                    <li className="list-disc">
                      To facilitate communication with bike administrators.
                    </li>
                    <li className="list-disc">
                      To ensure the smooth functioning of our app.
                    </li>
                  </ul>
                </p>
              </TextWithBgLabelWeb>
            </div>

            <div>
              <SubtitleLabelWeb>
                Disclosure of Your Information
              </SubtitleLabelWeb>
              <TextWithBgLabelWeb>
                <p>
                  We do not disclose your personal information to third parties
                  unless required by law or to protect our rights.
                </p>
              </TextWithBgLabelWeb>
            </div>

            {/* New section for OAuth usage */}
            <div>
              <SubtitleLabelWeb>
                OAuth with Google and Facebook
              </SubtitleLabelWeb>
              <TextWithBgLabelWeb>
                <p>
                  Our application utilizes OAuth authentication with Google and
                  Facebook providers. When you choose to sign in with Google or
                  Facebook, we may collect only the public information provided by these
                  platforms, such as your name, email address, and profile
                  picture. This information is used solely for authentication
                  purposes and to enhance your experience within our app.
                </p>
              </TextWithBgLabelWeb>
            </div>

            <div>
              <SubtitleLabelWeb>Data Security</SubtitleLabelWeb>
              <TextWithBgLabelWeb>
                <p>
                  We take reasonable measures to protect the information we
                  collect from unauthorized access, disclosure, alteration, or
                  destruction. However, no method of transmission over the
                  internet or electronic storage is 100% secure, and we cannot
                  guarantee absolute security.
                </p>
              </TextWithBgLabelWeb>
            </div>
            <div>
              <SubtitleLabelWeb>
                Changes to This Privacy Policy
              </SubtitleLabelWeb>
              <TextWithBgLabelWeb>
                <p>
                  We may update our Privacy Policy from time to time. Any
                  changes will be posted on this page, and the updated Privacy
                  Policy will be effective when posted.
                </p>
              </TextWithBgLabelWeb>
            </div>
            <div>
              <SubtitleLabelWeb>Contact Us</SubtitleLabelWeb>
              <TextWithBgLabelWeb>
                <p>
                  If you have any questions or concerns about our Privacy
                  Policy, please{" "}
                  <Link
                    href={NavigationPaths.contact}
                    className="text-blue-500"
                  >
                    contact us
                  </Link>
                  .
                </p>
              </TextWithBgLabelWeb>
            </div>
          </div>
        </div>
      </ContainerWebpage>
    </>
  )
}

export default PrivacyPolicy
