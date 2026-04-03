"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = __importDefault(require("./config/env"));
async function main() {
    const app = await (0, app_1.createApp)();
    try {
        await app.listen({ port: env_1.default.PORT, host: "0.0.0.0" });
        console.log(`✅ Server running at http://localhost:${env_1.default.PORT}`);
        console.log(`Environment: ${env_1.default.NODE_ENV}`);
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=server.js.map