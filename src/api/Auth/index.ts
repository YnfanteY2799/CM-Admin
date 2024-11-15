"use server";
import { parseAuthenticatorData, ClientDataType, parseClientDataJSON } from "@oslojs/webauthn";
import { ObjectParser } from "@pilcrowjs/object-parser";
import { cookies, headers } from "next/headers";
import { decodeBase64 } from "@oslojs/encoding";
import {
  Throttler,
  getUserByEmail,
  globalPOSTRateLimit,
  RefillingTokenBucket,
  verifyWebAuthnChallenge,
} from "@/utils/server";

import type { AuthenticatorData, ClientData } from "@oslojs/webauthn";
import type { PassKeyCredentialsObj } from "@/types/common";
import type { TLoginFS } from "@/utils/common";

const throttler = new Throttler<number>([1, 2, 4, 8, 16, 30, 60, 180, 300]);
const ipBucket = new RefillingTokenBucket<string>(20, 1);

// TODO: Assumes X-Forwarded-For is always included.
export async function serviceBasedLogin({ email, password }: TLoginFS): Promise<Omit<any, "JWT">> {
  if (!globalPOSTRateLimit()) return { response: "not logged" };

  const clientIP = (await headers()).get("X-Forwarded-For");
  if (clientIP !== null && !ipBucket.check(clientIP, 1)) return { message: "Too many requests" };

  const { data, message } = await getUserByEmail(email);
  if (data === undefined) return { message };
  if (!throttler.consume(data.id)) return { message: "Too many requests" };

  return { response: "logged" };
}

export async function passKeyBasedLogin(data: PassKeyCredentialsObj): Promise<any> {
  if (!globalPOSTRateLimit()) return false;

  const parser = new ObjectParser(data);
  let encodedClientDataJSON: string;
  let encodedCredentialId: string;
  let encodedSignature: string;
  let encodedAuthData: string;
  try {
    encodedAuthData = parser.getString("data");
    encodedCredentialId = parser.getString("id");
    encodedSignature = parser.getString("signature");
    encodedClientDataJSON = parser.getString("json");
  } catch (e) {
    return { message: "Invalid or missing fields" };
  }
  let authenticatorDataBytes: Uint8Array;
  let signatureBytes: Uint8Array;
  let clientDataJSON: Uint8Array;
  let credentialId: Uint8Array;

  try {
    authenticatorDataBytes = decodeBase64(encodedAuthData);
    clientDataJSON = decodeBase64(encodedClientDataJSON);
    credentialId = decodeBase64(encodedCredentialId);
    signatureBytes = decodeBase64(encodedSignature);
  } catch (e) {
    return { message: "Invalid or missing fields" };
  }

  let authData: AuthenticatorData;

  try {
    authData = parseAuthenticatorData(authenticatorDataBytes);
  } catch {
    return { message: "Invalid data" };
  }

  // TODO: Update host
  if (!authData.verifyRelyingPartyIdHash("localhost")) return { message: "Invalid data" };
  if (!authData.userPresent || !authData.userVerified) return { message: "Invalid data" };

  let clientData: ClientData;

  try {
    clientData = parseClientDataJSON(clientDataJSON);
  } catch {
    return { message: "Invalid data" };
  }
  if (clientData.type !== ClientDataType.Get) return { message: "Invalid data" };
  if (!verifyWebAuthnChallenge(clientData.challenge)) return { message: "Invalid data" };
  if (clientData.origin !== "http://localhost:3001") return { message: "Invalid data" };

  console.log({ data });

  return true;
}
