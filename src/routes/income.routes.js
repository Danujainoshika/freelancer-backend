import express from "express";
import { createIncomeRecord, getIncomeRecords } from "../controller/income.controller.js";

const router = express.Router();

router.post('/',createIncomeRecord);
router.get('/', getIncomeRecords);

export default router;