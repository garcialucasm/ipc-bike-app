import ContainerWebpage from "@/components/Containers/ContainerWebpage"
import TitleLabel from "@/components/Others/TitleLabel"
import TermsOfServiceContent from "@/components/TermsOfServiceContent/TermsOfServiceContent"

const TermsOfService = () => {
  return (
    <>
      <ContainerWebpage>
        <div className="space-y-4">
          <TitleLabel>Terms of Service and Rules</TitleLabel>
          <TermsOfServiceContent />
        </div>
      </ContainerWebpage>
    </>
  )
}

export default TermsOfService
