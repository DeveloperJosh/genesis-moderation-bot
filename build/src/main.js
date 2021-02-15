"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commands = exports.Client = exports.Prefix = void 0;
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const config = __importStar(require("./config.json"));
const prefix = config.prefix;
exports.Prefix = prefix;
const commandhandler_1 = __importDefault(require("./commandhandler"));
const database_1 = require("./database");
dotenv_1.default.config();
const client = new discord_js_1.Client();
exports.Client = client;
const commands = new commandhandler_1.default();
exports.Commands = commands;
commands.build();
new database_1.Database("sql5.freesqldatabase.com", "sql5393014", "wGRWblHEh4", "sql5393014");
client.on('ready', () => {
    var _a, _b;
    console.log(`Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}`);
    (_b = client.user) === null || _b === void 0 ? void 0 : _b.setPresence({
        status: 'online',
        activity: {
            name: `${prefix}help`,
            type: 'WATCHING',
        },
    });
});
client.on('message', msg => {
    if (!msg.guild)
        return;
    if (msg.author.bot)
        return;
    if (msg.content.startsWith(prefix)) {
        const command = msg.content.slice(prefix.length).split(' ')[0];
        if (commands.files.has(command))
            commands.files.get(command).call(msg);
    }
});
client.login("NzYzNTMxMzAyNjE1OTA4MzUz.X35D8A.7rfyLBzrdvedkt6lURlAhcNXbUw");
//# sourceMappingURL=main.js.map