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
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./config/index"));
const app_1 = __importDefault(require("./app"));
process.on('uncaughtException', err => {
    console.log(err);
    process.exit(1);
});
let serverStatus;
// connectivity
function server() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(index_1.default.database_url);
            // infoconsole.log('♻️  Database connected✅');
            console.log(`♻️  Database is connected successfully✌️`);
            serverStatus = app_1.default.listen(index_1.default.port, () => {
                // infoconsole.log(`Application app listening on port ${config.port}`);
                console.log(`Application app listening on port ${index_1.default.port}`);
            });
        }
        catch (err) {
            console.log('🙇‍♂️👎Failed connect to database', err);
        }
        process.on('unhandleRejection', error => {
            if (serverStatus) {
                serverStatus.close(() => {
                    console.log('Server closed ', error);
                    process.exit(1);
                });
            }
            else {
                process.exit(1);
            }
        });
    });
}
server();
process.on('SIGTERM', () => {
    console.log('SIGTERM is received');
    if (serverStatus) {
        serverStatus.close();
    }
});
