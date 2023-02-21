const db = require("../models")
const webhook = db.webHook
const sequelize=require("sequelize");
const Op = sequelize.Op;

module.exports.createWebhook = async (event) => {
  console.log(webhook,"ssddd")
    try {
      const {event_type,webhook_url,cmp_id } = JSON.parse(event.body);
  
      const newWebhook = await webhook.create({ event_type,webhook_url,cmp_id });
  
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
      
      const updateWebhook = JSON.parse(event.body);
      let obj  = { event_type:updateWebhook.event_type,
                  webhook_url:updateWebhook.webhook_url,
                  cmp_id:updateWebhook.cmp_id }
           let updatedwebhook=  await webhook.update(
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
  
      const { count, rows } = await webhook.findAndCountAll({
        offset: (page - 1) * limit,
        limit,
      });
  
      return {
        statusCode: 200,
        body: JSON.stringify({ count, rows }),
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

     const result =await webhook.destroy({ where: { id} });
  
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
  
  