import * as mysql from "mysql";
import {CaptchaConfig} from "../classes/CaptchaConfig";

const connection = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_database
});

export function startConnection(){
    return new Promise((res)=>{
        connection.connect((err)=>{
            if(err) {
                console.log(`Error: ${err.stack}`);
                process.exit();
            }
            console.log(`Connected, ID: ${connection.threadId}`);
            connection.query(
                `CREATE TABLE Guilds (
guildID VARCHAR(100) NOT NULL PRIMARY KEY,
role VARCHAR(100), button VARCHAR(255),
message VARCHAR(255),
description VARCHAR(255),
disable BOOLEAN NOT NULL DEFAULT 0,
post VARCHAR(255)
)`,
                (error, results, fields)=>{
                    if(error){
                        if(error.code === "ER_TABLE_EXISTS_ERROR"){
                            return console.log("DB found.");
                        } else {
                            return console.log(error);
                        }
                    }
                    console.log("DB created.");
                }
            );
            console.log("Database successfully initialized.");
            res(connection.threadId);
        });
    });
}

export function getConfiguration(id){
    return new Promise((res,rej)=>{
        connection.query(
            `SELECT * FROM Guilds WHERE guildID = "${id}"`,
            (error, results, fields)=>{
                if(error) rej(error);
                if(results.length === 0){
                    const config = new CaptchaConfig({});
                    createConfiguration(id,config).then(() => {
                        console.log(`${id} added to the database.`);
                    });
                    res(config);
                } else {
                    const config: CaptchaConfig = results[0];
                    results[0].button = JSON.parse(results[0].button.split("'").join("\""));
                    results[0].disable = results[0].disable !== 0;
                    res(config);
                }
            }
        );
    });
}

export function saveConfiguration(id,config,bot){
    bot.db.set(id,config);
    return new Promise((res,rej)=>{
        connection.query(
            `UPDATE Guilds \
SET role = "${config.role}", \
button = "${JSON.stringify(config.button).split("\"").join("'")}", \
message = "${config.message}", \
description = "${config.description}", \
disable = ${config.disable}, \
post = "${config.post}", \
WHERE guildID == "${id}"`,
            (error, results, fields)=>{
                if(error) rej(error);
                res(results);
            }
        );
    });
}

function createConfiguration(id, config){
    return new Promise((res,rej)=>{
        connection.query(
            `INSERT INTO Guilds VALUES (\
"${id}", \
"${config.role}", \
"${JSON.stringify(config.button).split("\"").join("'")}", \
"${config.message}", \
"${config.description}", \
${config.disable}, \
"${config.post}")`,
            (error, results, fields)=>{
                if(error) rej(error);
                res(results);
            }
        );
    });
}

process.on("beforeExit",()=>{
    connection.end();
});