const connection = require ("connection");

class DataBase {
    constructor(connection){
        this.connection = connection;
    }
    addRole(role){
        return this.connection.query("INSERT INTO role SET ?", role);
    }
}


module.exports = new DataBase(connection);