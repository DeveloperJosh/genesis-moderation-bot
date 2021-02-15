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
const main_1 = require("../main");
const send_1 = require("../send");
const command_1 = __importDefault(require("../interfaces/command"));
const guild_extensions_1 = __importDefault(require("../interfaces/guild.extensions"));
class LogChannel extends command_1.default {
    constructor() {
        super('logchannel', 'utility', 'Change the moderation logging channel', '<ChannelID>');
    }
    call(msg) {
        const _super = Object.create(null, {
            call: { get: () => super.call },
            getArgs: { get: () => super.getArgs }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.call.call(this, msg);
            const args = yield _super.getArgs.call(this, msg);
            if (args.length > 1) {
                send_1.SendError('TOO_MANY_ARGS', msg, this);
                return;
            }
            else if (!msg.member.hasPermission('ADMINISTRATOR')) {
                send_1.SendError('MISSING_PERMS', msg, this);
                return;
            }
            let logChannel;
            if (args.length < 1 || args[0] == '') {
                try {
                    const guild = new guild_extensions_1.default(msg.guild);
                    const logChannel = yield guild.getLogChannel();
                    send_1.Send(`The moderation log channel is <#${logChannel.id}>`, msg);
                }
                catch (error) {
                    if (error == 'Not found') {
                        send_1.Send(`No moderation log channel has been set, you can do this by using \`${this.getCommand()}\``, msg);
                    }
                    else {
                        console.log(error);
                        send_1.SendError('CUSTOM', msg, this, error);
                    }
                }
                return;
            }
            try {
                logChannel = yield main_1.Client.channels.cache.get(args[0]);
            }
            catch (error) {
                console.log(error);
                send_1.SendError('CUSTOM', msg, this, error);
                return;
            }
            if (logChannel) {
                try {
                    const guild = new guild_extensions_1.default(msg.guild);
                    yield guild.setLogChannel(logChannel.id);
                }
                catch (error) {
                    console.log(error);
                    send_1.SendError('CUSTOM', msg, this, error);
                    return;
                }
                send_1.Send(`Moderation channel log was succesfully set to <#${logChannel.id}>`, msg);
            }
            else {
                send_1.SendError('CUSTOM', msg, this, `⚠️ Channel not found.`);
                return;
            }
        });
    }
}
exports.default = LogChannel;
//# sourceMappingURL=logchannel.js.map