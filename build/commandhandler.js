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
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
class CommandHandler {
    constructor() {
        this.files = new Map();
    }
    build() {
        return __awaiter(this, void 0, void 0, function* () {
            const files = fs.readdirSync(path_1.default.join(__dirname, './modules'));
            for (const file of files) {
                if (!file.includes('.map')) {
                    const cmd = yield require(path_1.default.join(__dirname, './modules/' + file)).default;
                    const commandInitialized = new cmd();
                    if (!commandInitialized.commandName) {
                        console.log('\x1b[37m\x1b[41m❰Command-Handler❱\x1b[44m\x1b[30m An error occured, please clear build/modules and recompile.\x1b[0m');
                        return;
                    }
                    this.files.set(commandInitialized.commandName.toLowerCase(), commandInitialized);
                }
            }
        });
    }
}
exports.default = CommandHandler;
//# sourceMappingURL=commandhandler.js.map