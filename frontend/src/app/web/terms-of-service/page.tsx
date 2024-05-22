import ContainerWebpage from "@/components/Containers/ContainerWebpage"
import SubtitleLabelWeb from "@/components/Others/SubtitleLabelWeb"
import TextWithBgLabelWeb from "@/components/Others/TextWithBgLabelWeb"
import TitleLabelWeb from "@/components/Others/TitleLabelWeb"

const TermsOfService = () => {
  return (
    <>
      <ContainerWebpage>
        <div className="flex flex-col gap-y-8">
          <TitleLabelWeb>Terms of Service and Rules</TitleLabelWeb>
          <div className="flex flex-col gap-y-4">
            <div>
              <SubtitleLabelWeb>
                <span className="ms-1 me-2">1. </span>Definitions
              </SubtitleLabelWeb>
              <TextWithBgLabelWeb>
                <p>
                  <span className="me-2 font-extralight text-sm">1.1 </span>{" "}
                  <span className="font-semibold">Holder:</span> The individual
                  borrowing a bike is herein referred to as "the holder".
                </p>
                <p>
                  <span className="me-2 font-extralight text-sm">1.2 </span>{" "}
                  <span className="font-semibold">Key Keeper:</span> The student
                  council member who hands out the keys is the “key keeper”.
                </p>
              </TextWithBgLabelWeb>
            </div>

            <div>
              <SubtitleLabelWeb>
                <span className="ms-1 me-2">2. </span> General Responsibilities
              </SubtitleLabelWeb>
              <TextWithBgLabelWeb>
                <p>
                  <span className="me-2 font-extralight text-sm">2.1 </span>
                  By borrowing a bike from IPC through the student council, you
                  acknowledge to be fully responsible for the bike at all times.
                  Riding the bike is at your own risk.
                </p>
                <p>
                  <span className="me-2 font-extralight text-sm">2.2 </span>
                  IPC cannot be held responsible for any fines or fees incurred
                  by the bike holder while in use.
                </p>
                <p>
                  <span className="me-2 font-extralight text-sm">2.3 </span>
                  The development of this app is non-profit and without any
                  commercial intention. The developers of this app are not
                  liable for anything related to the use of the bikes or any
                  incidents involving them.
                </p>
              </TextWithBgLabelWeb>
            </div>

            <div>
              <SubtitleLabelWeb>
                <span className="ms-1 me-2">3. </span> Bike Renting Conditions
              </SubtitleLabelWeb>
              <TextWithBgLabelWeb>
                <p>
                  <span className="me-2 font-extralight text-sm">3.1 </span>
                  The key keeper will be available for pick up and return of
                  keys at the common room 2 times a day at a specific time{" "}
                  <span className="italic">(see the booking form)</span>.
                </p>
                <p>
                  <span className="me-2 font-extralight text-sm">3.2 </span>
                  The maximum lending period for a bike is{" "}
                  <span className="font-medium">24 hours</span>.
                </p>
                <p>
                  <span className="me-2 font-extralight text-sm">3.3 </span>
                  The key obtained from the key keeper MUST be returned to a key
                  keeper. You must not pass on a key to another student
                  yourself.
                </p>
                <p>
                  <span className="me-2 font-extralight text-sm">3.4 </span>
                  Return the bike to the designated bike room, lock it, and
                  deliver the key to the key keeper in the common room at the
                  given times.
                </p>
              </TextWithBgLabelWeb>
            </div>

            <div>
              <SubtitleLabelWeb>
                <span className="ms-1 me-2">4. </span> If something happens to the
                bike
              </SubtitleLabelWeb>
              <TextWithBgLabelWeb>
                <p>
                  <span className="me-2 font-extralight text-sm">4.1 </span>
                  The bike is your responsibility while you are renting it, and
                  whenever you leave the bike, you need to ensure it is locked.
                  The bike needs to be returned in the same working condition.
                </p>
              </TextWithBgLabelWeb>
            </div>
            <div>
              <SubtitleLabelWeb>
                <span className="ms-1 me-2">5. </span> If the bike has been stolen
              </SubtitleLabelWeb>
              <TextWithBgLabelWeb>
                <p>
                  <span className="me-2 font-extralight text-sm">5.1 </span>
                  It will not cost any charge for the holder under normal
                  circumstances.
                </p>
                <p>
                  <span className="me-2 font-extralight text-sm">5.2 </span>
                  If the bike is found unlocked, the holder will be charged the
                  price of repair of any damage made to the bike while stolen,
                  since the theft is due to an unlocked bike.
                </p>
              </TextWithBgLabelWeb>
            </div>
            <div>
              <SubtitleLabelWeb>
                <span className="ms-1 me-2">6. </span> If a tire is flat
              </SubtitleLabelWeb>
              <TextWithBgLabelWeb>
                <p>
                  <span className="me-2 font-extralight text-sm">6.1 </span>
                  If a tire is flat, please walk the bike back to IPC, do NOT
                  continue riding since it will cause further damage and the
                  holder of the bike will be charged the price of repair.
                </p>
                <p>
                  <span className="me-2 font-extralight text-sm">6.2 </span>
                  In case of a flat tire or other breakdown, please let the key
                  keeper know so the caretaker at IPC can make the repair
                  without any charge.
                </p>
                <p>
                  <span className="me-2 font-extralight text-sm">6.3 </span>
                  In the case of a lost key, the holder will be charged the
                  price of a new lock, currently priced at{" "}
                  <span className="font-medium">150 DKK</span>.
                </p>
                <p>
                  <span className="me-2 font-extralight text-sm">6.4 </span>
                  For any issues with the bike, please utilize the form provided
                  in the app to{" "}
                  <span className="font-medium">
                    notify the caretaker promptly
                  </span>
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

export default TermsOfService
