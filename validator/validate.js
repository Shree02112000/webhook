const joi = require("joi");

module.exports.createHookValidate = joi.object({
    event_type:joi.string().valid('reimbursement_accepted','reimbursement_rejected').required(),
    webhook_url:joi.string().uri().required(),
    cmp_id:joi.number().required()

})

module.exports.updateHookValidate = joi.object({
    event_type:joi.string().valid('reimbursement_accepted','reimbursement_rejected').required(),
    webhook_url:joi.string().uri().required(),
    cmp_id:joi.number().required(),
    id:joi.number().required()

})
