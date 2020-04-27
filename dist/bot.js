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
const botbuilder_ai_1 = require("botbuilder-ai");
class ConfBot {
    constructor(qnaMaker, luis) {
        this._qnaMaker = qnaMaker;
        this._luis = luis;
    }
    onTurn(context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (context.activity.type === "message") {
                    let qnaResults;
                    qnaResults = yield this._qnaMaker.generateAnswer(context.activity.text);
                    console.log("qnaResults", qnaResults);
                    if (qnaResults.length > 0) {
                        yield context.sendActivity(qnaResults[0].answer);
                    }
                    else {
                        yield this._luis.recognize(context).then((res) => {
                            const top = botbuilder_ai_1.LuisRecognizer.topIntent(res);
                            context.sendActivity(`the top intent found was ${top}`);
                        });
                    }
                }
                else {
                    yield context.sendActivity(`${context.activity.type} event detected`);
                }
            }
            catch (ex) {
                console.log(ex.message);
            }
        });
    }
}
exports.ConfBot = ConfBot;
//# sourceMappingURL=bot.js.map