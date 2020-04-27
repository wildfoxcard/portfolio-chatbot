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
function generateToken({ userId }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('CHANNELSECRETKEY', process.env.CHANNEL_SECRET);
        const response = yield fetch("https://directline.botframework.com/v3/directline/tokens/generate", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.CHANNEL_SECRET}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: {
                    id: `dl_${userId}`,
                    name: "user",
                },
            }),
        });
        return Object.assign(Object.assign({}, (yield response.json())), { userId });
    });
}
exports.generateToken = generateToken;
exports.default = {
    generateToken
};
//# sourceMappingURL=token.js.map