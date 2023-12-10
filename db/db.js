import { Sequelize, DataTypes  } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './messages.sqlite'
})

try {
    await sequelize.authenticate();
    console.log('conectado a la db')
} catch (error) {
    console.log('no se pudo conectar ', error)
}

//creación de tabla
const Msg = sequelize.define('messages',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username:{
        type:DataTypes.STRING
    },
    msg:{
        type:DataTypes.STRING
    },
    ip:{
        type:DataTypes.STRING
    }},{
        timestamps: false
    }
);

//creación de la tabla
Msg.sync()

export{
    Msg
}