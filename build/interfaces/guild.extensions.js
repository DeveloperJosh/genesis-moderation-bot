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
const database_1 = require("../database");
class GuildExtension {
    constructor(base) {
        this.base = base;
    }
    getLogChannel() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const serverID = this.base.id;
                let res;
                try {
                    res = yield database_1.Database.self.query('SELECT * FROM servers WHERE id=?', [
                        serverID,
                    ]);
                }
                catch (error) {
                    reject(error);
                }
                if (!res[0]) {
                    console.log('here');
                    reject('Not found');
                }
                else {
                    console.log(res);
                    const logChannel = this.base.client.channels.cache.get(res[0].logchannel);
                    resolve(logChannel);
                }
            }));
        });
    }
    setLogChannel(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const serverID = this.base.id;
                let res;
                try {
                    console.log('0', this);
                    res = yield this.getLogChannel();
                    console.log('1', res);
                }
                catch (error) {
                    console.log('2', error);
                    if (error == 'Not found' || !res) {
                        try {
                            yield database_1.Database.self.query('INSERT INTO servers (id, logchannel) VALUES ?', [[[serverID, id]]]);
                            resolve();
                        }
                        catch (error) {
                            console.log(error);
                            reject(error);
                        }
                    }
                    else {
                        console.log(error);
                        reject(error);
                    }
                }
                try {
                    console.log('3');
                    const resh = yield database_1.Database.self.query('UPDATE servers SET logchannel=? WHERE id=?', [id, serverID]);
                    console.log('4', resh);
                    resolve();
                }
                catch (error) {
                    console.log(error);
                    reject(error);
                }
            }));
        });
    }
}
exports.default = GuildExtension;
//# sourceMappingURL=guild.extensions.js.map