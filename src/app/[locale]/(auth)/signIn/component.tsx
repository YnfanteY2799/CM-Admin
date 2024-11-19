"use client";
import { passKeyBasedLogin, serviceBasedLogin, serviceBasedForgotPassword } from "@/api";
import { ResizableDiv, ThemeSwitcher, LangSelectSwitcher } from "@/components";
import { type TLoginFS, LoginFormSchema, TForgotFS } from "@/utils/common";
import { ChevronLeft, KeyRound, LogIn, Send } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { createWebAuthnChallenge } from "@/utils/client";
import { type ReactNode, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { encodeBase64 } from "@oslojs/encoding";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { toast } from "sonner";

export default function LoginForm(): ReactNode {
  // Hooks
  const commons = useTranslations("Common");

  // State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [IsForgot, setIsForgot] = useState<boolean>(false);

  // Ref's
  const loginRef = useRef<HTMLFormElement>(null);
  const forgRef = useRef<HTMLFormElement>(null);

  // RHF
  const {
    reset,
    getValues,
    register: loginRegister,
    formState: loginFormState,
    handleSubmit: handleLoginSubmit,
  } = useForm<TLoginFS>({ defaultValues: { email: "", password: "" }, resolver: zodResolver(LoginFormSchema) });

  const { email: loginEmail, password } = loginFormState.errors;

  // Functions
  function handleSyntheticSubmit(): void {
    const curr = isLoading ? forgRef.current : loginRef.current;
    if (curr) curr.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  }

  async function passKeyLogin() {
    try {
      const credential = await navigator.credentials.get({
        publicKey: { challenge: await createWebAuthnChallenge(), userVerification: "required" },
      });
      if (!(credential instanceof PublicKeyCredential)) throw new Error("Failed to create public key");
      if (!(credential.response instanceof AuthenticatorAssertionResponse)) throw new Error("Unexpected error");
      const response = await passKeyBasedLogin({
        id: encodeBase64(new Uint8Array(credential.rawId)),
        json: encodeBase64(new Uint8Array(credential.response.clientDataJSON)),
        signature: encodeBase64(new Uint8Array(credential.response.signature)),
        data: encodeBase64(new Uint8Array(credential.response.authenticatorData)),
      });
    } catch (e) {
      console.log(e);
    }
  }

  const changeForm = () => setIsForgot((old) => !old);

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

  const onForgotSubmit: SubmitHandler<TForgotFS> = async (data) => {};

  return (
    <div className="w-full max-w-md p-6 relative">
      <div className="bg-background/90 light:bg-background/10 backdrop-blur-sm rounded-lg p-8 shadow-xl border border-zinc-800">
        {/* Logo */}

        <div className="flex justify-between">
          <div>
            <Button
              size="sm"
              isIconOnly
              variant="light"
              onPress={changeForm}
              className={IsForgot ? "" : "hidden"}
              children={<ChevronLeft size={20} />}
            />
          </div>
          <p></p>
          <div className="flex justify-between gap-2">
            <ThemeSwitcher />
            <LangSelectSwitcher />
          </div>
        </div>

        {/* Header */}
        <h1 className="text-2xl font-bold text-center mb-2">{commons("Login.WelcomeBack")}</h1>
        <p className="text-default-800 text-center text-sm">{commons("Login.AlterLogin")}</p>
        <p className="text-default-800 text-center text-sm">
          <Link href="/signup" className="text-blue-500 hover:text-blue-400">
            {commons("Login.signup")}
          </Link>
        </p>
        <ResizableDiv>
          {/* Form */}
          {IsForgot ? (
            <form ref={forgRef} onSubmit={handleLoginSubmit(onLoginSubmit)} className="flex flex-col gap-[8px] mb-8">
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
            </form>
          ) : (
            <form ref={loginRef} onSubmit={handleLoginSubmit(onLoginSubmit)} className="flex flex-col gap-[8px] mb-8">
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
              <div className="flex justify-between ml-2">
                <p onClick={changeForm} className="text-sm hover:text-primary hover:underline hover:cursor-pointer">
                  {commons("Login.forgotenPassword")}
                </p>
              </div>
            </form>
          )}
          <Button
            size="md"
            type="submit"
            color="primary"
            className="w-full"
            isLoading={isLoading}
            isDisabled={isLoading}
            onPress={handleSyntheticSubmit}
            endContent={IsForgot ? <Send size={20} className="mt-1" /> : <LogIn size={20} className="mt-1" />}
          >
            {IsForgot ? commons("Form_Labels.forgot") : commons("Form_Labels.login")}
          </Button>
        </ResizableDiv>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-default" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-default/5 px-2 rounded">{commons("Form_Labels.Or")}</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-1 gap-3">
          <Button startContent={<KeyRound size={20} />} onPress={passKeyLogin}>
            {commons("Form_Labels.PassKeyLogin")}
          </Button>
        </div>
      </div>
    </div>
  );
}
