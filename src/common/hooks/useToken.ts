"use client";
import { auth } from "@/app/auth";

export function useToken() {
  const token = auth?.token;
  return token;
}
