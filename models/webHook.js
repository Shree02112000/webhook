
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
          createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          },
          createdDt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          },
          updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          },
          updatedDt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          }
     
},
{tableName:"webhook",timestamps:true}
)
};
