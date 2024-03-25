"use client";
import { auth } from "@/auth";

export function useToken() {
  const token = auth?.token;
  return token;
}
