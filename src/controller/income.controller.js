import pool from "../config/db.js";


const createIncomeRecord = async (req, res, next) => {
    try {
        const { month , platform , income , deduction , total } = req.body;

        const insertQuery = `
            insert into income_records (month, platform, income, deductions, record_total)
            values (?, ?, ?, ?, ?)
        `;

        const [result] = await pool.execute(insertQuery,
            [
                month,
                platform,
                income,
                deduction,
                total
            ]
        )
        return res.status(201).json({
            success: true,
            message: 'Income record created successfully',
            data: {
                id: result.insertId,
                month,
                platform,
                income,
                deduction,
                total
            }
        });
    } catch (error) {
        next(error);
    }
}

const getIncomeRecords = async (req, res, next) => {
    try {
        const selectQuery = `
            select * 
            from income_records
            order by id desc
        `;
        const [rows] = await pool.execute(selectQuery);
        return res.status(200).json({
            success: true,
            message: 'Income records retrieved successfully',
            data: rows,
            count: rows.length
        });
    } catch (error) {
        next(error);
    }
}

export  { createIncomeRecord, getIncomeRecords }