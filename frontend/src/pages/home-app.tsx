import React, { useState, useEffect } from "react";
import HomeKeyKeeper from "@/components/templates/HomeKeykeeper";
import Head from "@/components/atoms/Head";
import withAuth from "@/auth/withAuth";
import { NextPage } from "next";

const HomeApp: NextPage = () => {

  return (
    <>
      <Head title="IPC Alumni Bike" />
      <HomeKeyKeeper />
    </>
  );
};

export default withAuth(HomeApp);
