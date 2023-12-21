
// const saltRounds = 10;
// import fs from 'fs';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import { petEdit } from './petEdit.js';

// export const addrecord = async (req, res) => {
//       const { procName, procdureDate, procID, appID} = req.body;
//       console.log(procdureDate);
//       //const formattedDate = new Date(procdureDate).toISOString().substring(0, 10);
//       try{
//             if (procID === undefined) {
//                   db.query("INSERT INTO Procedural SET ?", {procName: procName, petType: 'all', forGender: 'all'}, (errproc, resproc) => {
//                         db.query("SELECT * FROM Procedural WHERE procName = ?", [procName], (finderr, resfind) => {
//                               db.query("INSERT INTO Appointment SET ?", {petID: req.params.petid, procID: resfind[0].procID, date: procdureDate, status: 'success'}, (apperr, appres) => {
//                                     res.json({status: 'success', success: 'Already Add Appintment for your pet'})
//                               })
//                         })
//                   })
//             }
//             else{
//                   db.query("INSERT INTO Appointment SET ? WHERE appID = ?", [{procID: procID, date: procdureDate, status: 'success'}, appID], (apperr, appres) => {
//                         res.json({status: 'success', success: 'Already Add Appintment for your pet'})
//                   })
//             }
//       } catch {
//             console.log(err)
//       }
// }

// export const allprocedure = async (req, res, next) => {
      
//       //db.query("SELECT * FROM Pet WHERE petID = ?", [req.params.petid], (errpet, respet)=>{
            
//             db.query("SELECT * FROM Appointment RIGHT JOIN Procedural ON Appointment.procID = Procedural.procID LEFT JOIN Vaccine ON Procedural.vacID = Vaccine.vacID WHERE Appointment.petID = ?", [req.params.petid], (proerr, repro) => {
//                   res.allprocedure = repro;
//                   console.log(repro)
//                   next()
//             })
//       //})
// }
// //WHERE Procedural.petType IN (?, 'All') AND Procedural.forGender IN (?, 'all')