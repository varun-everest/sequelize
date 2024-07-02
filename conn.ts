const { Sequelize } = require('sequelize');

//creating a sequelize instance to connect to the database.
const sequelize = new Sequelize('maindb', 'varun', 'varun', 
    {
        host : 'localhost',
        dialect : 'postgres'
    }
);

async function checkConnection() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been successfully established");
    } catch(err) {
        console.log("Failed to connect to the database ", err);
    }
}

checkConnection();

export {sequelize};