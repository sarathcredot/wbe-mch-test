"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function NextAuthSessionWrapper(params: any) {
  return <SessionProvider session={params.session}>{params.children}</SessionProvider>;
}
