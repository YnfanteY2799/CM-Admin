"use client";
import { type TLoginFS, LoginFormSchema } from "@/utils/common";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type ReactNode, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { ResizableDiv } from "@/components";
import { useTranslations } from "next-intl";
import { serviceBasedLogin } from "@/api";
import { KeyRound, LogIn } from "lucide-react";
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

  // Functions
  function handleSyntheticSubmit(): void {
    const curr = formRef.current;
    if (curr) curr.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  }

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
    <div className="w-full max-w-md p-6 relative">
      <div className="bg-zinc-900/90 backdrop-blur-sm rounded-lg p-8 shadow-xl border border-zinc-800">
        {/* Logo */}

        <div className="flex justify-between">
          <div></div>
          <p></p>
        </div>

        {/* Header */}
        <h1 className="text-2xl font-bold text-white text-center mb-2">{commons("Login.WelcomeBack")}</h1>
        <p className="text-zinc-400 text-center text-sm mb-6">
          {commons("Login.AlterLogin")}
          {/* <Link href="/signup" className="text-blue-500 hover:text-blue-400">
            Sign up
          </Link> */}
        </p>

        <ResizableDiv>
          {/* Form */}
          <form ref={formRef} onSubmit={handleLoginSubmit(onLoginSubmit)} className="flex flex-col gap-[8px] mb-8">
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
            <Input
              size="lg"
              radius="md"
              type="password"
              maxLength={100}
              variant="bordered"
              isInvalid={!!password}
              isReadOnly={isLoading}
              labelPlacement="outside"
              {...loginRegister("password")}
              label={commons("Form_Labels.password")}
              errorMessage={password && commons(`Errors.${password.message}`)}
            />
          </form>
          <Button
            size="md"
            type="submit"
            color="primary"
            className="w-full"
            isLoading={isLoading}
            isDisabled={isLoading}
            onPress={handleSyntheticSubmit}
            startContent={<LogIn size={20} />}
          >
            {commons("Form_Labels.login")}
          </Button>
        </ResizableDiv>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-default" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-default px-2 rounded">{commons("Form_Labels.Or")}</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-1 gap-3">
          <Button startContent={<KeyRound size={20} />}>{commons("Form_Labels.PassKeyLogin")}</Button>
        </div>
      </div>
    </div>
  );
}
