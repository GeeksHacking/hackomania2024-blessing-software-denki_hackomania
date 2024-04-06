const { createRecordService } = require('../services/iot')
module.exports = {
  createRecord: async (req, res) => {
    const { data, id } = req.body
    await createRecordService(data, id)
  } 
}