import express from "express"
import con from"../db/connection.js"
import jwt from 'jsonwebtoken'


const router = express.Router();

router.post("/patientlogin", (req, res) => {
    const sql = "SELECT * from patient where Email = ? and Password = ?"
    con.query(sql,[req.body.Email,req.body.password] , (err, result) => {
        if(err) return res.json({loginStatus:false, Error: "Query error"})
        if(result.length >0 ){
            const Email = result[0].Email;
            const token = jwt.sign(
                {role: "patient" , Email: Email} , 
                "jwt_secret_key" , 
                {expiresIn: '1d'}
               
            );
            res.cookie('token' , token)
            return res.json({loginStatus:true});
        }else {
            return res.json({loginStatus:false, Error: "wrong email or password"})
        }


    });

});

export { router as patientloginRoutes };
