
module.exports=function(sequelize,DataTypes){
    return sequelize.define("webhookschema",{
        
        event_type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isIn: [['reimbursement_accepted', 'reimbursement_rejected']],
            }
        },
        webhook_url:{
            type:DataTypes.STRING,
            allowNull:false,
            validate: {
                isUrl: true,
              },
        },
        cmp_id:{
            type:DataTypes.INTEGER,
            unique:true
        },
        is_active: {
            type: DataTypes.INTEGER,
            defaultValue: 1
          },
          is_deleted: {
            type: DataTypes.INTEGER,
            defaultValue:0
          },
          added_dt: {
            type: DataTypes.DATE,
            defaultValue:DataTypes.NOW
            
          },
          added_ts: {
            type: DataTypes.DATE,
            defaultValue:DataTypes.NOW
            
          },
          updated_dt: {
            type: DataTypes.DATE,
            defaultValue:DataTypes.NOW
            
          },
          updated_ts: {
            type: DataTypes.DATE,
            defaultValue:DataTypes.NOW
            
          }
     
},
{tableName:"webhooks",timestamps:false}
)
};
