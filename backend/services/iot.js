const { pool } = require('../config/database')

module.exports = {
  createRecordService: async (data, id) => {
    try {
      const username = pool.query(
        `SELECT iot_user.username FROM iot_device WHERE iot_device.id = $1
        JOIN iot_user ON iot_device.email = iot_user.email
        `
      )
      pool.query('INSERT INTO iot_data(data,id,username) VALUES ($1,$2.$3)', [data, id, username])
      let socket = req.app.get('socket')
      socket.emit(username, {data: data, id: id})
      res.sendStatus(200)
    } catch (err) {
      console.log(err)
      res.sendStatus(500)
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
  }
}