import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

/* config options here */
const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
