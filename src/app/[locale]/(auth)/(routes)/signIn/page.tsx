"use client";
import { NoiseWaves } from "@/components";

import type { ReactNode } from "react";
import LoginForm from "./component";

export default function signInPage(): ReactNode {
  return (
    <NoiseWaves blur={20}>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <LoginForm />
      </div>
    </NoiseWaves>
  );
}
