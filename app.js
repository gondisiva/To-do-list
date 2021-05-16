const express = require("express");
const bodyparser = require("body-parser");

const app = express();
let items = [];
let workItems = [];
app.set("view engine",'ejs');
app.use(bodyparser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get('/',function(req,res){
    let today = new Date();
 let options = {
     weekday: "long",
     day:"numeric",
     month:"long"
 };
 let day=today.toLocaleDateString("en-US",options);
    res.render("list",{ListTitle:day,newListItems:items});
});

app.post('/' ,function(req,res){
    let item = req.body.newItem;
    if(req.body.list === "Work"){
       workItems.push(item);
       res.redirect("/work")
    }else{
      items.push(item);
      res.redirect("/");
    }
})

app.get('/work',(req,res) =>{
    res.render("list",{ ListTitle: "Work List", newListItems:workItems});
})

app.listen(3000,function(){
    console.log("server is listening on 3000");
})