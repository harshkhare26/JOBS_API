const express = require('express')
const router = express.Router()

const {getAlljobs,getjob,updatejob,createjob,deletejob} = require('../controllers/jobs')

router.route('/').get(getAlljobs).post(createjob)
router.route('/:id').get(getjob).patch(updatejob).delete(deletejob)

module.exports = router