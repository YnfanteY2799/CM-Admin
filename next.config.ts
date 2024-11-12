import createNextIntlPlugin from "next-intl/plugin";

import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

/* config options here */
const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: "/",
      permanent: true,
      destination: "/en/signIn",
    },
  ],
};

export default withNextIntl(nextConfig);
