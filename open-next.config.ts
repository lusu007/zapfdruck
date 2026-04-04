import {
  defineCloudflareConfig,
  type OpenNextConfig,
} from '@opennextjs/cloudflare';

// OpenNext runs `npm run build` by default; this project uses that script for the
// full Cloudflare bundle, so the inner Next.js step must call `next` directly.
const config: OpenNextConfig = {
  ...defineCloudflareConfig(),
  buildCommand: 'npx next build',
};

export default config;
