import { createApp } from "./app";
import env from "./config/env";

async function main() {
  const app = await createApp();

  try {
    await app.listen({ port: env.PORT, host: "0.0.0.0" });
    console.log(`✅ Server running at http://localhost:${env.PORT}`);
    console.log(`Environment: ${env.NODE_ENV}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

main();
