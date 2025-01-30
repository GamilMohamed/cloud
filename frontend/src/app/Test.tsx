"use client";

import { useTransitionRouter } from "next-transition-router";

export default function Test() {
  const router = useTransitionRouter();

  return (
    <button
      onClick={() => {
        // alert("Do something before navigating away");
        router.push("/about");
      }}
    >
      Go to /about
    </button>
  );
}