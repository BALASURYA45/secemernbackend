const mdb=require('mongoose')
const signupSchema=mdb.Schema({
    firstName:String,
    lastName:String,
    username:String,
    email:String,
    password:String

})

const signup_Schema=mdb.model("signup",signupSchema)

module.exports=signup_Schema;