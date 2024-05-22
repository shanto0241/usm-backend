"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//['page','limit','sortBy','sortOrder']
const pgPicker = (obj, keys) => {
    const finalObj = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key];
        }
    }
    return finalObj;
};
exports.default = pgPicker;
