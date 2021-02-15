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
        super('delad', 'moderation', 'Delete an advertisement', '<MessageID> <Reason>');
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
            const msgCache = msg;
            let msgToRemove;
            if (args.length < 2 || args[0] == '') {
                send_1.SendError('MISSING_ARGS', msg, this);
                return;
            }
            else if (!((_a = msg.member) === null || _a === void 0 ? void 0 : _a.hasPermission('MANAGE_MESSAGES'))) {
                send_1.SendError('MISSING_PERMS', msg, this);
                return;
            }
            try {
                msgToRemove = yield msg.channel.messages.fetch(args[0]);
            }
            catch (error) {
                if (error instanceof discord_js_1.DiscordAPIError) {
                    if (error.message.startsWith('Invalid Form Body'))
                        send_1.SendError('CUSTOM', msg, this, `⚠️ Invalid message ID. \`${args[0]}\``);
                    else if (error.message.startsWith('Unknown Message'))
                        send_1.SendError('CUSTOM', msg, this, `⚠️ Message not found. \`${args[0]}\``);
                    else {
                        send_1.SendError('ERROR_OCCURED', msg, this);
                    }
                }
                else {
                    send_1.SendError('ERROR_OCCURED', msg, this);
                }
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
                msgToRemove.delete();
            }
            catch (error) {
                send_1.Send(error, msg);
            }
            const acknowledgeMsg = yield send_1.Send(`✅ Message **\`${args[0]}\`** was successfully removed.`, msg);
            acknowledgeMsg.delete({ timeout: 3000 });
            msg.delete({ timeout: 3000, reason: `${args.slice(1).join(' ')}` });
            try {
                ;
                logChannel.send(new discord_js_1.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('⛔ Advertisement Deleted')
                    .setDescription(`**Author:** <@${msgToRemove.author.id}>
            **Channel:** <#${msgToRemove.channel.id}>
            **Reason:** ${args.slice(1).join(' ')}`)
                    .setTimestamp()
                    .setFooter(msgCache.author.username, msgCache.author.avatarURL()));
            }
            catch (error) {
                if (error == "TypeError: Cannot read property 'send' of undefined") {
                    send_1.SendError('CUSTOM', msg, this, `⚠️ The message was removed, but I couldn't find the log channel.`);
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
//# sourceMappingURL=delad.js.map