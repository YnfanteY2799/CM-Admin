import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { type ReactNode, useActionState } from "react";
import { ResizableDiv } from "@/components";
import { signInAction } from "./action.ts";

export default function LoginForm(): ReactNode {
  // State
  const [state, action] = useActionState(signInAction, { message: "" });

  return (
    <Card className="px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md" radius="lg" shadow="md">
      <CardHeader className="justify-between">
        <div></div>
        <p className="">dx</p>
        <div className="flex gap-4">xd</div>
      </CardHeader>
      <CardBody className="justify-center gap-4">
        <ResizableDiv>
          <form
            ref={formRef}
            onSubmit={handleLoginSubmit(onRSubmit)}
            className="flex flex-col gap-[8px] transition-height"
          ></form>
        </ResizableDiv>
      </CardBody>
      <CardFooter className="justify-center">
        <Button className="w-full"></Button>
      </CardFooter>
    </Card>
  );
}
