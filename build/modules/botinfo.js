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
class Botinfo extends command_1.default {
    constructor() {
        super('botinfo', 'utility', 'This the botinfo command it will give you info about the bot', '');
    }
    call(msg) {
        const _super = Object.create(null, {
            call: { get: () => super.call }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.call.call(this, msg);
            const commandsEmbed = new discord_js_1.MessageEmbed()
                .setColor('#F7CF48')
                .setTitle(':information_source: Botinfo')
                .addField('Maker:', '♡𝔹𝕝𝕦𝕖♡#1270')
                .addField('Info', 'This is a Mod Bot That is made to help out the mods with the as')
                .setTimestamp()
                .setFooter('Made By ♡𝔹𝕝𝕦𝕖♡#1270');
            send_1.Send(commandsEmbed, msg);
        });
    }
}
exports.default = Botinfo;
//# sourceMappingURL=botinfo.js.map