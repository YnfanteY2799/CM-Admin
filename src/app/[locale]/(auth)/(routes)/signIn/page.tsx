"use client";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { type ReactNode, useActionState } from "react";
import { signInAction } from "./action.ts";
import { NoiseWaves } from "@/components";

export default function signInPage(): ReactNode {
  const [state, action] = useActionState(signInAction, { message: "" });

  return (
    <NoiseWaves blur={20}>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Card className="px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md" radius="lg" shadow="md">
          <CardHeader className="justify-between">
            <div></div>
            <div className="">dx</div>
            <div className="">xd</div>
          </CardHeader>
          <CardBody className="justify-center gap-4"></CardBody>
          <CardFooter className="justify-center">
            <Button className="w-full"></Button>
          </CardFooter>
        </Card>
      </div>
    </NoiseWaves>
  );
}
