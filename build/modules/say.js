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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const command_1 = __importDefault(require("../interfaces/command"));
const send_1 = require("../send");
class Say extends command_1.default {
    constructor() {
        super('say', 'utility', 'Use this to make the bot say stuff', '');
    }
    call(msg) {
        const _super = Object.create(null, {
            call: { get: () => super.call },
            getArgs: { get: () => super.getArgs }
        });
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            _super.call.call(this, msg);
            const args = yield _super.getArgs.call(this, msg);
            if (args.length < 1 || args[0] == '') {
                send_1.SendError('MISSING_ARGS', msg, this);
                return;
            }
            else if (!((_a = msg.member) === null || _a === void 0 ? void 0 : _a.hasPermission('MANAGE_MESSAGES'))) {
                send_1.SendError('MISSING_PERMS', msg, this);
                return;
            }
            const say = args.join(" ");
            const commandsEmbed = new discord_js_1.MessageEmbed()
                .setColor('#F7CF48')
                .setTitle(':information_source: Bot said')
                .addField('Words:', say)
                .setFooter('Made By ♡𝔹𝕝𝕦𝕖♡#1270');
            send_1.Send(commandsEmbed, msg);
        });
    }
}
exports.default = Say;
//# sourceMappingURL=say.js.map