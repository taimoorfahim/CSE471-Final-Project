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
const student_services_1 = require("../services/student.services");
const getStudents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield (0, student_services_1.getStudentsService)();
        console.log(req.ip);
        res.status(200).json({
            success: true,
            data: students,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            err: err.message,
            message: "Error in getting students",
        });
    }
});
const getStudentsByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        let student = yield (0, student_services_1.getStudentsByEmailService)(email);
        if (student) {
            const phoneNumber = student.phoneNumber.replace(/(\d{2})\d{5}(\d{4})/, '$1*****$2');
            res.status(200).json({
                success: true,
                data: Object.assign(Object.assign({}, student.toObject()), { phoneNumber }),
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: student,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            err: err.message,
            message: "Error in getting student",
        });
    }
});
const addStudents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { students } = req.body;
        const result = yield (0, student_services_1.addStudentsService)(students);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            err: err.message,
            message: `Error in Adding student \n ${err.message}
      
      
      `,
        });
    }
});
const updateStudents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { students, updatedQuery } = req.body;
        const result = yield (0, student_services_1.updateManyStudentsService)(students, updatedQuery);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            err: err.message,
            message: "Error in Updating student",
        });
    }
});
const updateAStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedQuery = req.body;
        const result = yield (0, student_services_1.updateStudentById)(id, updatedQuery);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            err: err.message,
            message: "Error in Updating student",
        });
    }
});
exports.default = {
    getStudents,
    getStudentsByEmail,
    addStudents,
    updateStudents,
    updateAStudent,
};
