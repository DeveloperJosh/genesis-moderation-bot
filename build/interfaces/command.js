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
const main_1 = require("../main");
class Command {
    constructor(commandName, category, description, args) {
        this.commandName = commandName;
        this.category = category;
        this.description = description;
        this.args = args;
    }
    call(_msg) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    getCommand() {
        return `${main_1.Prefix}${this.commandName}${this.args ? ` ${this.args}` : ''}`;
    }
    getArgs(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    resolve(msg.content
                        .slice(main_1.Prefix.length + this.commandName.length)
                        .trim()
                        .split(' '));
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    }
}
exports.default = Command;
//# sourceMappingURL=command.js.map