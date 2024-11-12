import { redirect } from "@/i18n/routing";

export default function NotFoundPage() {
  redirect({ href: "/signIn", locale: "en" });
}
