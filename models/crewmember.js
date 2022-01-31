const sequelize= require('../sequelize');
const {DataTypes} = require('sequelize');

const CrewMember= sequelize.define('CrewMember',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5,255]
        }
    },
    role: {
        type: DataTypes.ENUM,
        allowNull:false,
        values: ['Captain','Boatswain','Quartermaster','Sailing Master','Cabin boy'],
        validate:{
            isIn: [['Captain','Boatswain','Quartermaster','Sailing Master','Cabin boy']]
        }
    }
    
});

module.exports= CrewMember;