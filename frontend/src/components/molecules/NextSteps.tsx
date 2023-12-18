function NextSteps() {
  return (
    <>
      <div className="flex flex-col border w-full items-center rounded-xl p-2 mt-3 sm:mb-3 shadow-md text-left text-sm">
        <div className="w-full">
          <span className="font-black">1. </span>
          <span className="font-semibold">Handover</span> of the bike keys from
          the key keeper to the user.
        </div>
        <div className="text-2xl pb-2 text-slate-400">
          <span className="text-3xl">🚲</span> + 🔑 → 🙋‍♀️
        </div>
      </div>
      <div className="flex flex-col border w-full items-center rounded-xl p-2 sm:mb-3 shadow-md text-left text-sm">
        <div className="w-full">
          <span className="font-black">2. </span> Be{" "}
          <span className="font-semibold">responsible</span>, follow the{" "}
          <span className="font-semibold">rules</span>, and{" "}
          <span className="font-semibold">enjoy </span> your bike ride.
        </div>
        <div className="text-2xl text-slate-400 py-2">😉</div>
      </div>
    </>
  );
}

export default NextSteps;
