import { redirect } from "next/navigation";
import React from "react";

export default function HomeApp() {
  redirect("/home");

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div>App Home</div>
    </main>
  );
}
