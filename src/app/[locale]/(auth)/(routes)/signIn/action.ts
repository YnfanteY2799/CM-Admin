interface ActionResult {
  message: string;
}

export async function signInAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  return { message: "done" };
}
