import type { SSRManifest } from "astro";
import { App } from "astro/app";

type Args = {
  host: string | boolean;
  port: number;
};

export function start(manifest: SSRManifest, args: Args) {
  const app = new App(manifest);
  const logger = app.getAdapterLogger();

  const hostname = (
    args.host === false ? "127.0.0.1" :
      args.host === true ? "0.0.0.0" :
        args.host
  );

  const server = Bun.serve({
    hostname,
    port: args.port,
    fetch: (req) => {
      return app.render(req);
    },
  });

  logger.info(`application started (http://${server.hostname}:${server.port})`);

  const gracefulShutdown = async () => {
    logger.info("application shutting down...");
    await server.stop();
    process.exit(0);
  };

  process.on("SIGTERM", gracefulShutdown);
  process.on("SIGINT", gracefulShutdown);

  return server;
}

export function createExports(manifest: SSRManifest, args: Args) {
  return {
    start: () => start(manifest, args),
  };
}
