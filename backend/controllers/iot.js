const { createRecordService, registerDeviceService, getDevicesService } = require('../services/iot')
module.exports = {
  createRecord: async (req, res) => {
    const { data, id } = req.body
    await createRecordService(data, id)
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
  }
}