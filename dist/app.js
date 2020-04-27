"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./bot");
const botbuilder_ai_1 = require("botbuilder-ai");
const restify = require("restify");
const botbuilder_1 = require("botbuilder");
const dotenv_1 = require("dotenv");
const token_1 = require("./token");
const corsMiddleware = require("restify-cors-middleware");
dotenv_1.config();
const cors = corsMiddleware({
    origins: ["*"],
    allowHeaders: ["Authorization"],
    exposeHeaders: ["Authorization"]
});
const server = restify.createServer();
server.pre(cors.preflight);
server.use(cors.actual);
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`${server.name} listening on ${server.url}`);
});
const adapter = new botbuilder_1.BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD,
});
const qnaMaker = new botbuilder_ai_1.QnAMaker({
    knowledgeBaseId: process.env.KBID,
    endpointKey: process.env.QNA_ENDPOINTKEY,
    host: process.env.QNA_HOST,
});
const luis = new botbuilder_ai_1.LuisRecognizer({
    applicationId: process.env.LUIS_APPID,
    endpointKey: process.env.LUIS_SUBSCRIPTIONKEY,
    endpoint: process.env.LUIS_ENDPOINT,
});
const echo = new bot_1.ConfBot(qnaMaker, luis);
server.post("/api/messages", (req, res) => {
    adapter.processActivity(req, res, (context) => __awaiter(void 0, void 0, void 0, function* () {
        yield echo.onTurn(context);
    }));
});
server.get("/api/token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenObject = yield token_1.generateToken({ userId: req.params.userId || "none" });
    res.json(tokenObject);
}));
//# sourceMappingURL=app.js.map