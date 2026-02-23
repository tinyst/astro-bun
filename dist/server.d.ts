import type { SSRManifest } from "astro";
type Args = {
    host: string | boolean;
    port: number;
};
export declare function start(manifest: SSRManifest, args: Args): Bun.Server<undefined>;
export declare function createExports(manifest: SSRManifest, args: Args): {
    start: () => Bun.Server<undefined>;
};
export {};
