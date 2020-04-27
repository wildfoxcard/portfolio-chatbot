import { ConfBot } from "./bot";
import { QnAMaker, LuisRecognizer } from "botbuilder-ai";
import { IQnAService, BotConfiguration } from "botframework-config";
import * as restify from "restify";
import { BotFrameworkAdapter } from "botbuilder";
import { config } from "dotenv";
import {generateToken} from './token'
import * as corsMiddleware from "restify-cors-middleware";  
 

config();

// const botConfig = BotConfiguration.loadSync("../test.bot", process.env.BOT_FILE_SECRET)

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


const adapter = new BotFrameworkAdapter({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD,
});

const qnaMaker = new QnAMaker({
  knowledgeBaseId: process.env.KBID,
  endpointKey: process.env.QNA_ENDPOINTKEY,
  host: process.env.QNA_HOST,
});

// console.log('qnaMaker', qnaMaker)
const luis = new LuisRecognizer({
  applicationId: process.env.LUIS_APPID,
  endpointKey: process.env.LUIS_SUBSCRIPTIONKEY,
  endpoint: process.env.LUIS_ENDPOINT,
});

const echo: ConfBot = new ConfBot(qnaMaker, luis);

server.post("/api/messages", (req, res) => {
  adapter.processActivity(req, res, async (context) => {
    await echo.onTurn(context);
  });
});

server.get("/api/token", async (req, res) => {
  const tokenObject = await generateToken({userId: req.params.userId || "none"});
  res.json(tokenObject);
})
