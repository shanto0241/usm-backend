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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./apps/middlewares/globalErrorHandler"));
const routers_1 = __importDefault(require("./apps/routes/routers"));
const http_status_1 = __importDefault(require("http-status"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./config/index"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Application routes
app.use('/api/v1', routers_1.default);
// Root api
app.get('/', (req, res) => {
    res.send('Hello from university server! ');
});
//global error handler
app.use(globalErrorHandler_1.default);
//handle Not Found Route
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found  does not exist ‼️',
        errorMessages: [
            {
                path: req.originalUrl, //showing notfound route
                message: 'API Not Found',
            },
        ],
    });
    next();
});
// Process termination handling
process.on('uncaughtException', (err) => {
    console.log(err);
    process.exit(1);
});
let serverStatus;
// connectivity
function server() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(index_1.default.database_url);
            console.log(`♻️ Database is connected successfully✌️`);
            serverStatus = app.listen(index_1.default.port, () => {
                console.log(`Application app listening on port ${index_1.default.port}`);
            });
        }
        catch (err) {
            console.log('‍♂️Failed connect to database', err);
        }
        process.on('unhandledRejection', (error) => {
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
exports.default = app; // Export the app instance for potential external usage
