import React from "react";
import { SingleBookingSection } from "@/types/NavigationSections";

interface StepConfig {
  stepOne: boolean;
  stepTwo: boolean;
  stepThree: boolean;
}

function ProgressStepsBar(props: { currentSection: SingleBookingSection }) {
  const { currentSection } = props;

  const currentStep = React.useMemo(() => {
    const stepOneConfig: StepConfig = {
      stepOne: false,
      stepTwo: false,
      stepThree: false,
    };
    const stepTwoConfig: StepConfig = {
      stepOne: true,
      stepTwo: false,
      stepThree: false,
    };
    const stepThreeConfig: StepConfig = {
      stepOne: true,
      stepTwo: true,
      stepThree: false,
    };
    const stepFinalConfig: StepConfig = {
      stepOne: true,
      stepTwo: true,
      stepThree: true,
    };
    switch (currentSection) {
      case SingleBookingSection.selectBikeSize:
        return stepOneConfig;
      case SingleBookingSection.inputUserData:
        return stepTwoConfig;
      case SingleBookingSection.preBookingConfirmation:
        return stepThreeConfig;
      case SingleBookingSection.bookingConfirmationStatus:
        return stepFinalConfig;
      default:
        // Log an error or handle the unknown section
        console.error(`Unknown section: ${currentSection}`);
        // Return a default step or handle as appropriate
        return stepOneConfig;
    }
  }, [currentSection]);

  return (
    <>
      <ol className="flex items-center w-11/12 py-5">
        <li
          className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block
          ${
            currentStep.stepOne
              ? "stepper-is-done-bar"
              : "stepper-is-waiting-bar"
          }`}
        >
          <span
            className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${
              currentStep.stepOne
                ? "stepper-is-done-icon"
                : "stepper-is-waiting-icon"
            }`}
          >
            <svg
              className="w-3.5 h-3.5 lg:w-4 lg:h-4 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          </span>
        </li>
        <li
          className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block ${
            currentStep.stepTwo
              ? "stepper-is-done-bar"
              : "stepper-is-waiting-bar"
          }`}
        >
          <span
            className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${
              currentStep.stepTwo
                ? "stepper-is-done-icon"
                : "stepper-is-waiting-icon"
            }`}
          >
            <svg
              className="w-4 h-4 lg:w-5 lg:h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 16"
            >
              <path
                className="fill-current"
                d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"
              />
            </svg>
          </span>
        </li>
        <li className="flex items-center w-auto">
          <span
            className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${
              currentStep.stepThree
                ? "stepper-is-done-icon"
                : "stepper-is-waiting-icon"
            }`}
          >
            <svg
              className="w-4 h-4 lg:w-5 lg:h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 20"
            >
              <path
                className="fill-current"
                d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"
              />
            </svg>
          </span>
        </li>
      </ol>
    </>
  );
}

export default ProgressStepsBar;
