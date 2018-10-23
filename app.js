const express = require('express')
const app = express()
const port = process.env.PORT || 3000
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'mysql642.umbler.com',
  port: '41890',
  user     : 'edu',
  password : '6code384',
  database : 'my_bd'
});
 


app.get('/', function (req, res) {
    connection.connect();
 
    executeSQL('select * from teste', function(results){
        res.send(results)
    })

})
 
app.listen(port, function(){
    console.log(`rodando na porta: ${port}`)
})

const executeSQL = function(stringSQL, callbeck){
   
    connection.query(stringSQL, function(error, results, fields){
    
        var rows;

        if(error) {
        
            rows = JSON.parse(JSON.stringify(error));
            callbeck(rows);
            console.log(rows);

        }else{
            
            rows = JSON.parse(JSON.stringify(results));
            callbeck(rows);
        }

        console.log("executou SQL:" + stringSQL);
    });
    
    
}

module.exports = app;