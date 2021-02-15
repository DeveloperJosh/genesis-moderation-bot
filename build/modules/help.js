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
const main_1 = require("../main");
const send_1 = require("../send");
class Help extends command_1.default {
    constructor() {
        super('help', 'utility', 'Shows the help menu', '');
    }
    call(msg) {
        const _super = Object.create(null, {
            call: { get: () => super.call }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.call.call(this, msg);
            let embedDescription = '';
            for (const c of main_1.Commands.files) {
                const command = c[1];
                const { commandName, description, category } = command;
                const fname = main_1.Prefix + commandName;
                embedDescription += `**${fname}:**\n${description}\nCategory: ${category}\n\`${command.getCommand()}\`\n\n`;
            }
            const commandsEmbed = new discord_js_1.MessageEmbed()
                .setColor('#F7CF48')
                .setTitle('ℹ️ Commands')
                .setDescription(embedDescription)
                .setTimestamp()
                .setFooter('Made By ♡𝔹𝕝𝕦𝕖♡#1270');
            send_1.Send(commandsEmbed, msg);
        });
    }
}
exports.default = Help;
//# sourceMappingURL=help.js.map