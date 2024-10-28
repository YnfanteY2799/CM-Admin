// lucia.ts
import { lucia } from "lucia";

// expect error (see next section)
export const auth = lucia({
	env: "DEV" // "PROD" if deployed to HTTPS
});

export type Auth = typeof auth;