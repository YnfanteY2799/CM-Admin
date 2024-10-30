import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeDeps: {
    exclude: ["@node-rs/argon2"],
  },
};

export default withNextIntl(nextConfig);
