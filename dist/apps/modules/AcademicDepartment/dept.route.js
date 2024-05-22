"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const dept_controller_1 = require("./dept.controller");
const dept_validation_1 = require("./dept.validation");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create-dept', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(dept_validation_1.ACDepartmentValidation.createDepartmentZodSchema), dept_controller_1.ACDepartmentController.createACDepartment);
router.get('/:id', dept_controller_1.ACDepartmentController.getOneDepartment);
router.get('/', dept_controller_1.ACDepartmentController.getAllDepartment);
router.patch('/:id', (0, validateRequest_1.default)(dept_validation_1.ACDepartmentValidation.updateDepartmentZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), dept_controller_1.ACDepartmentController.updateDepartment);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), dept_controller_1.ACDepartmentController.deleteDepartment);
exports.ACDepartmentRoutes = router;
