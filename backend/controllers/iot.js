const { createRecordService, registerDeviceService, getDevicesService, getUserService, getTotalUsed } = require('../services/iot')
module.exports = {
  createRecord: async (req, res) => {
    const { data, id } = req.body
    let socket = req.app.get('socket')
    let email = await getUserService(id)
    try {
      await createRecordService(data, id, email, socket)
      res.sendStatus(200)
    } catch {
      res.sendStatus(500)
    }
  },
  registerDevice: async (req,res) => {
    const { id , email } = req.body
    try{
      const response = await registerDeviceService(id,email)
      if(response == 'Duplicate'){
        res.sendStatus(409)
      }else{
        res.sendStatus(201)

      }
    }catch(err){
      res.sendStatus(500)
    }
  },
  getDevices: async (req,res)=> {
    const { email } = req.query
    try{
      const response = await getDevicesService(email)
      res.send(response)
    }catch(err){
      res.sendStatus(500)
    }
  },

  getSum : async ( req , res ) => {
    const { email } = req.query
    try {
      const response = await getTotalUsed(email)
      console.log(response)
      res.send(response)
    } catch (error) {
      res.sendStatus(500)
    }
  }
}