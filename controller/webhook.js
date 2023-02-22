const db = require("../models")
const webhook = db.webhook
const sequelize=require("sequelize");
const moment = require("moment");
const {createHookValidate,updateHookValidate} = require("../validator/validate")

function response (showMessage, message, code, responseData) {
  var response = {
      statusCode: 200, body: JSON.stringify({
          "showMessage": showMessage,
          "responseCode": code,
          "responseStatus": code === 1 ? "Error" : "Success",
          "responseMessage": message,
          "response": responseData
      }), headers: {
          'Content-Type': 'application/json; charset=utf-8', 
          'Access-Control-Allow-Origin': '*'
      }
  };

  return response;
}

module.exports.createWebhook = async (event) => {

    try {
      
      const {event_type,webhook_url,cmp_id } = JSON.parse(event.body);
      const validate = await createHookValidate.validateAsync
      const newWebhook = await webhook.create({ event_type,webhook_url,cmp_id },validate);
  
      return response (true,"Webhook created successfully",1)
    } catch (error) {
      console.error(error);
  
      return response(false,"Fail to create webhook",1 ,error)
    }
  };

  module.exports.updateWebhook = async (event) => {
    try {
      const validate = await updateHookValidate.validateAsync
      const updateWebhook = JSON.parse(event.body);
      let obj  = { event_type:updateWebhook.event_type,
                  webhook_url:updateWebhook.webhook_url,
                  cmp_id:updateWebhook.cmp_id }
           let updatedwebhook=  await webhook.update( 
        obj,
        { where: { id:updateWebhook.id } }
      );
  
      return response(true,"Webhook updated successfully",0,updatedwebhook)
        
    } catch (error) {
      console.error(error);
     return response(false,"Fail to update webhook",1 ,error)
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
      return response (true,count,list)
    } catch (error) {
      console.error(error);
  
      return response(false,"Fail to list webhook",1 ,error)
    }
  };

  module.exports.deleteWebhook = async (event) => {
    try {
      const { id,cmp_id } = JSON.parse(event.body);
      var date = new Date();
     const result =await webhook.update({is_deleted:1,updated_ts:date,updated_dt:date},{ where: { id:id ,cmp_id:cmp_id} });
  
      return response (true,"Sucessfully Deleted",result,1)
    } catch (error) {
      console.error(error);
      return response(false,"Fail to delete webhook",1 ,error)
    }
  };
  
  