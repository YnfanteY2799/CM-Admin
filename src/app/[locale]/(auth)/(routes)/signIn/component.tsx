import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { type TLoginFS, LoginFormSchema } from "@/utils/common";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type ReactNode, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResizableDiv } from "@/components";
import { useTranslations } from "next-intl";
import { serviceBasedLogin } from "@/api";
import { toast } from "sonner";

export default function LoginForm(): ReactNode {
  // Hooks
  const commons = useTranslations("Common");

  // State
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Ref's
  const formRef = useRef<HTMLFormElement>(null);

  // RHF
  const {
    reset,
    getValues,
    register: loginRegister,
    formState: loginFormState,
    handleSubmit: handleLoginSubmit,
  } = useForm<TLoginFS>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(LoginFormSchema),
  });

  const { email: loginEmail, password } = loginFormState.errors;

  // Form handle
  const onLoginSubmit: SubmitHandler<TLoginFS> = async (data) => {
    setIsLoading(true);
    toast.promise(serviceBasedLogin(data), {
      loading: commons("Status.loading"),
      error: (response: Error) => {
        console.log("blown up", { response });
        return response.message;
      },
      success: (response) => {
        return commons("Status.welcome", { username: response.username });
      },
    });
    setIsLoading(false);
  };

  return (
    <Card className="px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md" radius="lg" shadow="md">
      <CardHeader className="justify-between">
        <div></div>
        <p className="">dx</p>
        <div className="flex gap-4">xd</div>
      </CardHeader>
      <CardBody className="justify-center gap-4">
        <ResizableDiv>
          <form ref={formRef} onSubmit={handleLoginSubmit(onLoginSubmit)} className="flex flex-col gap-[8px]">
            <Input
              size="lg"
              radius="md"
              type="email"
              maxLength={100}
              variant="bordered"
              isReadOnly={isLoading}
              labelPlacement="outside"
              isInvalid={!!loginEmail}
              {...loginRegister("email")}
              label={commons("Form_Labels.email")}
              errorMessage={loginEmail && commons(`Errors.${loginEmail.message}`)}
            />
            {/* <Input
              size="lg"
              radius="md"
              type="email"
              maxLength={100}
              variant="bordered"
              isInvalid={!!rEmail}
              isReadOnly={isLoading}
              {...loginRegister("email")}
              labelPlacement="outside"
              label={commons("Form_Labels.email")}
              errorMessage={rEmail && commons(`Errors.${rEmail.message}`)}
            /> */}
          </form>
        </ResizableDiv>
      </CardBody>
      <CardFooter className="justify-center">
        <Button className="w-full"></Button>
      </CardFooter>
    </Card>
  );
}
