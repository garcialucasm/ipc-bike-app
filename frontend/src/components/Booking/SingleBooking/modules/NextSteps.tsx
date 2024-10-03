function NextSteps() {
  return (
    <>
      <div className="my-2 grid gap-y-4">
        <div className="flex w-full flex-col items-center rounded-2xl border p-2 text-left text-sm sm:mb-3">
          <div className="w-full">
            <span className="font-black">1. </span>
            The bike is booked. However, the booking must be confirmed within 2
            hours by the KeyKeeper. Otherwise, it will be automatically
            canceled.
          </div>
          <div className="pb-2 text-2xl text-slate-400">🎫 + ⌛ → ✅</div>
        </div>
        <div className="flex w-full flex-col items-center rounded-2xl border p-2 text-left text-sm sm:mb-3">
          <div className="w-full">
            <span className="font-black">2. </span>
            <span className="font-semibold">
              After the confirmation, handover
            </span>{" "}
            of the bike keys from the key keeper to the user.
          </div>
          <div className="pb-2 text-2xl text-slate-400">
            <span className="text-3xl">🚲</span> + 🔑 → 🙋‍♀️
          </div>
        </div>
        <div className="flex w-full flex-col items-center rounded-2xl border p-2 text-left text-sm sm:mb-3">
          <div className="w-full">
            <span className="font-black">3. </span> Be{" "}
            <span className="font-semibold">responsible</span>, follow the{" "}
            <span className="font-semibold">rules</span>, and{" "}
            <span className="font-semibold">enjoy </span> your bike ride.
          </div>
          <div className="py-2 text-2xl text-slate-400">😉</div>
        </div>
      </div>
    </>
  )
}

export default NextSteps
