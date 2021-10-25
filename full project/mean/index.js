const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql')

var app = express();

app.use(cors());
app.use(bodyParser.json());

// db connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jarvo',
    database: 'simpledb'
});

// let check the connection
db.connect(function (err, res) {
    if (err) {
        throw err
    }
    else {
        console.log("connection is successed we move to further process!!!!");
    }
})

// get method

app.get('/wall', function (req, res) {

    db.query("SELECT * from wallmart ", function (err, result, fields) {
        if (err) {
            throw err
        }

        if (result.length > 0) {
            res.send({
                message: 'all data set',
                data: result
            })
        }
    });
});


// get all datas from sql  here we filter specific id or some ex:(WHERE id = 1)

app.get('/wall/:id', function (req, res) {
    var wallID = req.params.id

    db.query("SELECT * from wallmart WHERE id = ?", [wallID], function (err, result) {
        if (err) {
            throw err
        }

if(result.length>0){
    res.send({
        message:'get data',
        status:1,
        data:result
    })
}
    });
});

// post mwethod

app.post('/wall', function (req, res) {

    console.log(req.body.params);
    // var name= req.body.name;
    // var city = req.body.city;
    // var designation = req.body.designation;
    var params = req.body


    db.query("INSERT INTO wallmart SET ?", params, function (err, result, fields) {
        res.json({
            status: 1,
            message: "data inserted succesfully",
            data: result

        });
    });
});

// Delete

app.delete('/wall/:id', function (req, res) {


    db.query('DELETE from wallmart WHERE ID = ?', [req.params.id], function (err, result, fields) {
        if (err) {
            throw err

        }
        if (result) {
            res.send({
                status: 1,
                message: 'Succesfully Deleted'
            })
        }

    });
});


// this is another delete method
// app.delete('/wall/:id', function (req, res) {



//     db.query('DELETE from wallmart WHERE ID = ?', [req.params.id], function (err, result, fields) {
//         if (err) {
//           throw err

//         }

//       else{

//          res.send(result)

//       }


//         });
//     });



//put method

app.put('/wall/:id', function (req, res) {
   var params = req.body
    var name = params.name;
    var email = params.email;
    var mobile = params.mobile;
    var wall_id = params.wall_id;

    console.log(req.body.wall_id, 'Edit has been updated');



    db.query("Update wallmart SET  name = ?, email = ?, mobile = ? WHERE id = ?", [name, email, mobile, wall_id], function (err, result, fields) {
        
        
        if(err){
            throw err
        }
        res.json({
            status: 1,
            message: "Updated your datas successfully",
            data: result
        });
    });
});

app.use('/', function (req, res) {
    res.send("welcome to our mean stack page")
})

app.listen(2000, () => {
    console.log('port is ready ');
})  