const express = require('express')
const app = express()
const port = process.env.PORT || 3000
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host: '191.252.193.192',
  port: '3306',
  user: 'root',
  password: '6code384',
  database: 'teste'
});
 


app.get('/', function (req, res) {
    connection.connect();
 
    executeSQL('select * from tabela', function(results){
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