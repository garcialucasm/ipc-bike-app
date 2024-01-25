import React, { useState, useEffect } from "react";
import HomeKeyKeeper from "@/components/templates/HomeKeykeeper";
import Head from "@/components/atoms/Head";
import { useRouter } from "next/router";

const HomeApp = () => {
  // const { session, isLoading } = useSession();
  let isLoggedIn: boolean = true;
  const isLoading = false;
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoading, isLoggedIn, router]);

  if (isLoading) {
    return <p className="text-lg">Loading...</p>;
  }

  return (
    <>
      {/* TODO Separete home app by login type */}
      <Head title="IPC Alumni Bike" />
      <HomeKeyKeeper />
    </>
  );
};

export default HomeApp;
