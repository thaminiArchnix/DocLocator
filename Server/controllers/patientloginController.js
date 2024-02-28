import con from "../db/connection.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import multer from "multer";
import path from "path";



/*
const patientLogin = (req, res) => {
    const sql = "SELECT * from patient Where email = ? and password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                { role: "patient", email: email, id: result[0].id },
                "jwt_secret_key",
                { expiresIn: "1d" }
            );
            res.cookie('token', token)
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "wrong email or password" });
        }
    });
};








const patientlogout = (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
}



export const patientloginController = {
    patientLogin,
    patientlogout
};*/
