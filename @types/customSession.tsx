"use client";
import { Session } from "next-auth";

export type customSession = Session & {
  accessToken: string;
};
