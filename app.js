const express=require("express");
const app=express();
const https=require("https");


const mailchimp = require("@mailchimp/mailchimp_marketing");



const bodyParser=require("body-parser");
const { Server } = require("http");
app.use(bodyParser.urlencoded({extended:true}));
app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000");
});
app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
  
});
mailchimp.setConfig({
apiKey:"5d01dad2086c7186f6e23fde9d59eca7-us21",
server:"us21"
});
app.post("/failure",function(req,res){
  res.redirect("/");
});
app.post("/",function(req,res){
  const firstname= req.body.fname;
  const lastname= req.body.mname;
  const email=req.body.lname;
 //*****************************ENTER YOU LIST ID HERE******************************
const listId = "ecd311cc0b";
//Creating an object with the users data
const subscribingUser = {
 firstName: firstname,
 lastName: lastname,
 email: email
};
//Uploading the data to the server
 async function run() {
const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
}
});
//If all goes well logging the contact's id
 res.sendFile(__dirname + "/success.html")
 console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
}

run().catch((e) => res.sendFile(__dirname + "/failure.html"));
});

// api key
// 5d01dad2086c7186f6e23fde9d59eca7-us21
// list id
// ecd311cc0b