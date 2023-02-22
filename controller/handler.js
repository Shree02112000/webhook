const db = require("../models")
const webhook = db.webHook
const sequelize=require("sequelize");
const Op = sequelize.Op;
const moment = require("moment");
const createHookValidate = require("../validator/validate")
const updateHookValidate = require("../validator/validate")


module.exports.createWebhook = async (event) => {

    try {
      
      const {event_type,webhook_url,cmp_id } = JSON.parse(event.body);
      const validate = await createHookValidate.validateAsync
      const newWebhook = await webhook.create({ event_type,webhook_url,cmp_id },validate);
  
      return {
        statusCode: 200,
        body: JSON.stringify(newWebhook),
      };
    } catch (error) {
      console.error(error);
  
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create webhook.' }),
      };
    }
  };

  module.exports.updateWebhook = async (event) => {
    try {
      const validate = await updateHookValidate.validateAsync
      const updateWebhook = JSON.parse(event.body);
      let obj  = { event_type:updateWebhook.event_type,
                  webhook_url:updateWebhook.webhook_url,
                  cmp_id:updateWebhook.cmp_id }
           let updatedwebhook=  await webhook.update( validate,
        obj,
        { where: { id:updateWebhook.id } }
      );
  
      return {
        statusCode: 200,
        body: JSON.stringify(updatedwebhook),
      };
    } catch (error) {
      console.error(error);
  
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to update webhook.' }),
      };
    }
  };

  module.exports.listWebhooks = async (event) => {
    try {
      const { page = 1, limit = 10 } = event.queryStringParameters || {};
    
      const { count, rows } = await webhook.findAndCountAll({ where:{is_deleted:0},
        offset: (page - 1) * limit,
        limit,
      });
      let list = rows.map(a=>{
        return {
          id:a.id ,
          event_type:a.event_type,
          webhook_url:a.webhook_url,
          cmp_id:a.cmp_id,
          is_active:a.is_active,
          is_deleted:a.is_deleted,
          added_dt:moment(a.added_dt).format('D MMM YYYY'),
          added_ts:moment(a.added_ts).format('D MMM YYYY, hh:mm A'),
          updated_dt:moment(a.updated_dt).format('D MMM YYYY'),
          updated_ts:moment(a.updated_ts).format('D MMM YYYY, hh:mm A'),
        }
      })
      return {
        statusCode: 200,
        body: JSON.stringify({ count,list}),
      };
    } catch (error) {
      console.error(error);
  
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to list webhooks.' }),
      };
    }
  };

  module.exports.deleteWebhook = async (event) => {
    try {
      const { id } = JSON.parse(event.body);
      var date = new Date();
     const result =await webhook.update({is_deleted:1,updated_ts:date,updated_dt:date},{ where: { id:id} });
  
      return {
        statusCode: 200,
        body:JSON.stringify({message:"deleted succesfully" ,result})
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to delete webhook.' }),
      };
    }
  };
  
  