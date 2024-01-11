import React, { useState, useEffect } from "react";
import HomeKeyKeeper from "@/components/templates/HomeKeykeeper";

let isLoggedIn: boolean = true;

export default function HomeApp() {
  return (
    <>
      {/* TODO Separete home app by login type */}
      <HomeKeyKeeper />
    </>
  );
}
