"use strict";
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
    res.send('Hello from university server! 💯');
});
//global error handler
app.use(globalErrorHandler_1.default);
//handle Not Found Route
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found 😟 does not exist ‼️',
        errorMessages: [
            {
                path: req.originalUrl, //showing notfound route
                message: 'API Not Found',
            },
        ],
    });
    next();
});
exports.default = app;
