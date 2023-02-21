
module.exports=function(sequelize,DataTypes){
    return sequelize.define("webhookschema",{
        
        event_type: {
            type: DataTypes.ENUM('reimbursement_accepted', 'reimbursement_rejected'),
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
            type:DataTypes.INTEGER
        },
        isActive: {
            type: DataTypes.INTEGER,
            defaultValue: 1
          },
          isDeleted: {
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
{tableName:"webhook",timestamps:true}
)
};
