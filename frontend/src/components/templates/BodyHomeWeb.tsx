import Image from "next/image";

export default function BodyHomeWeb() {
  return (
    <div className="px-6 pt-14 lg:px-8">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] background-mesh-part-1"></div>
      </div>
      <div className="mx-auto max-w-2xl py-32 sm:py-32 lg:py-42">
        <div className="text-center">
          <div className="flex justify-center p-3">
            <Image
              src="/logo-bike-ipc.png"
              className="h-32 w-auto"
              width={300}
              height={399}
              alt=""
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            IPC Alumni Bike
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <div>
              <a
                href="/login"
                className="rounded-md bg-blue-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Book a Bike
              </a>
            </div>
            <div className="disable-link">
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-slate-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] background-mesh-part-2"></div>
        </div>
      </div>
    </div>
  );
}
