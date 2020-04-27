import { TurnContext } from "botbuilder";
import { QnAMaker, LuisRecognizer } from "botbuilder-ai";

export class ConfBot {
  private _qnaMaker: QnAMaker;
  private _luis: LuisRecognizer;
  constructor(qnaMaker: QnAMaker, luis: LuisRecognizer) {
    this._qnaMaker = qnaMaker;
    this._luis = luis;
  }

  async onTurn(context: TurnContext) {
    try {
      if (context.activity.type === "message") {
        let qnaResults;
        // console.log('context', context.activity)
        qnaResults = await this._qnaMaker.generateAnswer(context.activity.text);
        // const qnaResults = await this._qnaMaker.generateAnswer(context.activity.text).catch(err => console.log(err))
        console.log("qnaResults", qnaResults);

        if (qnaResults.length > 0) {
          await context.sendActivity(qnaResults[0].answer);
        } else {
          await this._luis.recognize(context).then((res) => {
            const top = LuisRecognizer.topIntent(res);
            context.sendActivity(`the top intent found was ${top}`);
          });
        }
      } else {
        await context.sendActivity(`${context.activity.type} event detected`);
      }
    } catch (ex) {
      console.log(ex.message);
    }
  }
}
