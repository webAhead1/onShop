const db = require("../../database/connection.js");

function register(data){
    if (data.pass !== data.confirmpass){
        console.log("passwords do not match!");
        return;
    }
    db.query(`SELECT * FROM shop_users WHERE email='${data.email}'`).then((result)=>{
        if (result.rows.length > 0){
            console.log("email already exists");
        }else {
            db.query(`INSERT INTO shop_users (email, password) values('${data.email}','${data.pass}')`).then((result) => {
                console.log("Added (i think)");
                console.log(result.rows);
            });
        }  
    });
}

function login(data){
    db.query(`SELECT * FROM shop_users where email='${data.email}' AND password='${data.password}'`).then((result) => {
        if (result.rows.length > 0){
            return true;
        }else{
            console.log("email/pass are incorrect");
        }
    });
}

module.exports = {register, login};