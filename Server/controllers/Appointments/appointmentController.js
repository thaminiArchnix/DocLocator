const appointmentModel = require("../../models/Appointments/appointmentModel.js");
const connection = require("../../db/connection.js");
//const dateConverter = require("../../Middleware/dateConverter.js");

function opStatus(successMsg, successStatus, failMsg, result, res) {
  if (result) {
    res.status(successStatus).json({
      ...result,
      message: successMsg,
    });
  } else {
    //return res.status(500).json({ error: failMsg });
  }
}

const appointmentController = {
  getAppById: async function (req, res) {
    try {
      const id = req.params.id;
      const tableData = ["appId"];
      const result = await appointmentModel.getById(id, tableData);
      opStatus(
        "Appointment Fetched!",
        200,
        "Cannot Find Appointment!",
        result,
        res
      );
      //console.log(result[0].date, dateConverter(result[0].date));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAppByDate: async function (req, res) {
    try {
      const today = new Date().toISOString().split("T")[0];

      const tableData = ["date"];
      const data = [`${today}`, `${req.params.id}`];
      const result = await appointmentModel.getByDate(data, tableData);
      opStatus("Fetched!", 200, "Did not Fetch", result, res);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllApps: async function (req, res) {
    try {
      const result = await appointmentModel.getAll();
      opStatus(
        "Appointments Fetched!",
        200,
        "Cannot Find Appointments!",
        result,
        res
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAppointmentsForDoctor: async function (req, res) {
    try {
      const docId = req.params.docId;
      const appointments = await appointmentModel.getAppointmentsForDoctor(docId);
      res.status(200).json({ appointments });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createAppointment: function (req, res) {
    const {
      docId,
      patientId,
      date,
      startTime,
      status,
      longitude,
      latitude,
      disease,
    } = req.body;
    const sql =
      "INSERT INTO appointment(docId, patientId, date, startTime, status , longitude ,  latitude, disease) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(
      sql,
      [docId, patientId, date, startTime, status, longitude, latitude, disease],
      function (err, result) {
        if (err) {
          res.status(400).json({ error: err.message });
        } else {
          res
            .status(201)
            .json({
              id: result.insertId,
              message: "appointment created successfully",
            });
        }
      }
    );
  },

  //   createAppointment: async function (req, res) {
  //     try {
  //       const appData = req.body;
  //       //validations
  //       //Checking for all data fields
  //       if (
  //         !appData.patientId ||
  //         !appData.docId ||
  //         !appData.date ||
  //         !appData.startTime ||
  //         !appData.longitude ||
  //         !appData.latitude
  //       ) {
  //         return res
  //           .status(400)
  //           .json({ error: "Please fill all fields of the appointment form!" });
  //       }

  //       //end time calculation
  //       const endTime = new Date(appData.date.startTime);
  //       endTime.setHours(endTime.getHours() + 2);

  //       const tableData = [
  //         "patientId",
  //         "docId",
  //         "date",
  //         "startTime",
  //         "longitude",
  //         "latitude",
  //         "status",
  //       ];
  //       const result = await appointmentModel.create(
  //         Object.values(appData),
  //         tableData
  //       );

  //       //custom data response
  //       if (result) {
  //         res.status(201).json({
  //           id: result.insertId,
  //           ...appData,
  //           endTime,
  //           message: "Appointment Created Successfully",
  //         });
  //       } else {
  //         return res.status(500).json({ error: "Internal Server Error" });
  //       }
  //     } catch (error) {
  //       res.status(400).json({ error: error.message });
  //     }
  //   },

  deleteAppointment: async function (req, res) {
    try {
      const id = req.params.id;
      const tableData = ["appId"];
      const result = await appointmentModel.delete(id, tableData);
      opStatus(
        "Appointment Deleted!",
        200,
        "Cannot Find Appointments!",
        result,
        res
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateAppointment: async function (req, res) {
    try {
      const data = req.body;
      const id = req.params.id;
      const tableData = ["status"];
      const idData = "appId";
      array = Object.values(data);
      console.log(array);
      console.log(tableData);
      array.push(id);
      const result = await appointmentModel.update(array, tableData, idData);
      opStatus(
        "Appointment Updated!",
        200,
        "Cannot Find Appointment!",
        result,
        res
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = appointmentController;
