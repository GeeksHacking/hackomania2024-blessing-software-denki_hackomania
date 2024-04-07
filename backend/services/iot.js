const { pool } = require('../config/database')
const { getUserService } = require('./auth')

module.exports = {
  createRecordService: async (data, id, email, socket) => {
    try {
      pool.query('INSERT INTO iot_data(id,data) VALUES ($1,$2)', [id, data])
      console.log(email)
      socket.emit(email, {data: data, id: id})
    } catch (err) {
      console.log(err)
    }
  },
  registerDeviceService : async ( id, email ) => {
    try{
      const response = await pool.query(`INSERT INTO iot_device(id,email) VALUES ($1,$2)`,[id,email])
      return response
    }catch(err){

      if(err.code = '23505'){
        let response = 'Duplicate'
        return response
      }else{

        throw err
      }
    }
  },
  getDevicesService: async ( email ) => {
    try{
      const response = await pool.query(`SELECT *
      FROM (
          SELECT 
              iot_data.*,
              iot_device.email,
              ROW_NUMBER() OVER (PARTITION BY iot_device.id ORDER BY iot_data.timestamp DESC) AS rn
          FROM iot_data
          JOIN iot_device ON iot_device.id = iot_data.id
          WHERE iot_device.email = $1
      ) AS ranked
      WHERE rn = 1;`,[email])
      return response.rows
    }catch(err){
      throw err
    }
  },
  getUserService: async ( id ) => {
    try {
      const response = await pool.query(`SELECT iot_user.email FROM iot_user JOIN iot_device ON iot_device.email = iot_user.email WHERE iot_device.id = $1`, [id])
      return response.rows[0].email
    } catch (err) {
      console.log(err)
    }
  },

  getTotalUsed : async ( email ) => {
    try {
       const response = await pool.query(`select SUM(data) from iot_device JOIN iot_data ON iot_device.id = iot_data.id WHERE iot_device.email = $1`,[email])
       return response.rows[0]
    } catch (error) {
      console.log(error)
    }
  }
}