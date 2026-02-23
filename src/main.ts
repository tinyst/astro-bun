import type { AstroIntegration } from "astro";

export function bun(): AstroIntegration {
  return {
    name: "@tinyst/astro-bun",
    hooks: {
      "astro:config:done": ({ config, setAdapter }) => {
        setAdapter({
          name: "@tinyst/astro-bun",
          serverEntrypoint: "@tinyst/astro-bun/server.js",
          args: {
            host: config.server.host,
            port: config.server.port,
          },
          exports: ["start"],
          supportedAstroFeatures: {
            envGetSecret: "unsupported",
            hybridOutput: "stable",
            i18nDomains: "unsupported",
            serverOutput: "stable",
            sharpImageService: "stable",
            staticOutput: "unsupported",
          },
        })
      },
    },
  };
}
