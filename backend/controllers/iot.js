const { createRecordService, registerDeviceService } = require('../services/iot')
module.exports = {
  createRecord: async (req, res) => {
    const { data, id } = req.body
    await createRecordService(data, id)
  },
  registerDevice: async (req,res) => {
    const { id , email } = req.body
    console.log(req)
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
  }
}