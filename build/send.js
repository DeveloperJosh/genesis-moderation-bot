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
exports.SendError = exports.Send = void 0;
class MSGSend {
    static send(content, msg) {
        return new Promise((resolve, _reject) => __awaiter(this, void 0, void 0, function* () {
            resolve(yield msg.channel.send(content));
        }));
    }
    static sendError(error, msg, caller, custom) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, _reject) => __awaiter(this, void 0, void 0, function* () {
                if (!custom)
                    custom = '';
                switch (error) {
                    case 'ERROR_OCCURED':
                        resolve(Send(`⚠️ An error occured. \`${(yield caller.getArgs(msg))[0]}\``, msg));
                        break;
                    case 'MISSING_ARGS':
                        resolve(Send(`⚠️ Missing arguments. \`${caller.getCommand()}\``, msg));
                        break;
                    case 'TOO_MANY_ARGS':
                        resolve(Send(`⚠️ Too many arguments. \`${caller.getCommand()}\``, msg));
                        break;
                    case 'MISSING_PERMS':
                        resolve(Send(`⚠️ You don't have permission to use this command.`, msg));
                        break;
                    case 'CUSTOM':
                        resolve(Send(custom, msg));
                        break;
                    default:
                        resolve(SendError('ERROR_OCCURED', msg, caller));
                        break;
                }
            }));
        });
    }
}
exports.default = MSGSend;
const Send = MSGSend.send;
exports.Send = Send;
const SendError = MSGSend.sendError;
exports.SendError = SendError;
//# sourceMappingURL=send.js.map