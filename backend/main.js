const express = require("express")
const app = express()
const mysql = require("mysql")
const bcrypt = require("bcrypt")
var cors = require('cors')

app.use(express.json())
app.use(cors());

const db = mysql.createPool({
    connectionLimit: 100,
    host: "127.0.0.1",       //This is your localhost IP
    user: "root",         // "newuser" created in Step 1(e)
    password: "",  // password for the new user
    database: "fteema",      // Database name
    port: "3306"             // port name, "3306" by default
})
db.getConnection((err, connection) => {
    if (err) throw (err)
    console.log("DB connected successful: " + connection.threadId)
})


//CREATE USER
app.post("/createUser", async (req, res) => {
    const user = req.body.name;
    const fullname = req.body.fullname;
    const tel = req.body.tel;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM users WHERE user = ?"
        const search_query = mysql.format(sqlSearch, [user])
        const sqlInsert = "INSERT INTO users(userId,user,password,fullname,phone) VALUES (0,?,?,?,?)"
        const insert_query = mysql.format(sqlInsert, [user, hashedPassword,fullname,tel])
        // ? will be replaced by values
        // ?? will be replaced by string
        await connection.query(search_query, async (err, result) => {
            if (err) throw (err)
            console.log("------> Search Results")
            console.log(result.length)
            if (result.length != 0) {
                connection.release()
                console.log("------> User already exists")
                res.sendStatus(409)
            }
            else {
                await connection.query(insert_query, (err, result) => {
                    connection.release()
                    if (err) throw (err)
                    console.log("--------> Created new User")
                    console.log(result.insertId)
                    res.sendStatus(201)
                })
            }
        }) //end of connection.query()
    }) //end of db.getConnection()
})

//LOGIN 
app.post("/login", (req, res) => {
    const user = req.body.name
    const password = req.body.password
    db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "Select * from users where user = ?"
        const search_query = mysql.format(sqlSearch, [user])
        await connection.query(search_query, async (err, result) => {
            connection.release()

            if (err) throw (err)
            if (result.length == 0) {
                console.log("--------> User does not exist")
                res.send({msg:"user not found"}).status(404)
            }
            else {
                const hashedPassword = result[0].password
                //get the hashedPassword from result
                if (await bcrypt.compare(password, hashedPassword)) {
                    console.log("---------> Login Successful")
                    res.send({ msg: `${user} is logged in!`, code: 200 })
                }
                else {
                    console.log("---------> Password Incorrect")
                    res.send({msg:"Password incorrect!",code:400}).status(401)
                } //end of bcrypt.compare()
            }//end of User exists i.e. results.length==0
        }) //end of connection.query()
    }) //end of db.connection()
}) //end of app.post()

const port = process.env.PORT | 5000

app.listen(port,
    () => console.log(`Server Started on port ${port}...`))
