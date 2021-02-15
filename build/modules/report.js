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
const guild_extensions_1 = __importDefault(require("../interfaces/guild.extensions"));
const send_1 = require("../send");
const command_1 = __importDefault(require("../interfaces/command"));
class DeleteAd extends command_1.default {
    constructor() {
        super('report', 'support', 'Report a bug or a user/ad with this', '<Reason>');
    }
    call(msg) {
        const _super = Object.create(null, {
            call: { get: () => super.call },
            getArgs: { get: () => super.getArgs }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.call.call(this, msg);
            const args = yield _super.getArgs.call(this, msg);
            const msgCache = msg;
            if (args.length < 1 || args[0] == '') {
                send_1.SendError('MISSING_ARGS', msg, this);
                return;
            }
            let logChannel;
            try {
                logChannel = yield new guild_extensions_1.default(msg.guild).getLogChannel();
            }
            catch (error) {
                send_1.SendError('CUSTOM', msg, this, `⚠️ A problem occured while trying to find the log channel.`);
                return;
            }
            try {
                const makingreport = yield send_1.Send('Making The Report', msg);
                makingreport.delete({ timeout: 3000 });
            }
            catch (error) {
                send_1.Send(error, msg);
            }
            const acknowledgeMsg = yield send_1.Send(`✅ Report was successfully sent`, msg);
            acknowledgeMsg.delete({ timeout: 3000 });
            msg.delete({ timeout: 3000, reason: `${args.slice(1).join(' ')}` });
            const user = msg.mentions.users.first() || msgCache.author;
            try {
                ;
                logChannel.send(new discord_js_1.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('⛔ User Report')
                    .setDescription(`**Author:** <@${msgCache.author.id}>
            **Reported User:** ${user}
            **Reason:** ${args.slice(1).join(' ')}`)
                    .setTimestamp()
                    .setFooter(msgCache.author.username, msgCache.author.avatarURL()));
            }
            catch (error) {
                if (error == "TypeError: Cannot read property 'send' of undefined") {
                    send_1.SendError('CUSTOM', msg, this, `⚠️ The report was made, but I couldn't find the log channel.`);
                    return;
                }
                else {
                    send_1.SendError('ERROR_OCCURED', msg, this);
                    return;
                }
            }
        });
    }
}
exports.default = DeleteAd;
//# sourceMappingURL=report.js.map