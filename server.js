var express = require("express"); //using the express framework
var db = require('./db-connections');
var app = express(); // set variable app to be an instance of express framework. From now on, app is the express

app.use(express.json()); // json() is a method inbuilt in express to recognize the incoming Request Object from the web client as a JSON Object.

app.listen(8080, "127.0.0.1"); // start the nodejs to be listening for incoming request @ port 8080
console.log("web server running @ http://127.0.0.1:8080"); // output to console
app.use(express.static("./public")); //static files are to be served from the public folder

var db = require('./db-connections');

//get products
app.route('/product').get(function(req,res){
    var sql = "SELECT * FROM `e-commerce`.product";
    db.query(sql, function(error, result){
        if(error){
            throw error;
        }else{
        //return result as json
            res.json(result)};
    });
});

//get product by ID
app.route('/product/:id').get(function(req,res){
    var sql = "SELECT * FROM `e-commerce`.product WHERE id=?";
    var parameters=[req.params.id];
    db.query(sql, parameters, function(error, result){
        if(error){
            throw error;
        }else{
        //return result as json
            res.json(result)};
    });
});

//add product
app.route('/product').post(function(req,res){
    var sql = "INSERT INTO `e-commerce`.product (name, description, price, category_id, picture) VALUES (?,?,?,?,?) ";
    var parameters=[req.body.name, req.body.description, req.body.price , req.body.category_id, req.body.picture];
    db.query(sql, parameters, function(error, result){
        if(error){
            throw error;
        }else{
            res.json(result)
        };
    });
});

//update product
app.route('/product/:id').put(function(req,res){
    var sql = "UPDATE`e-commerce`.product SET name=?, description=?, price=?, category_id=?, picture=? WHERE id=?";
    var parameters=[req.body.name, req.body.description, req.body.price, req.body.category_id, req.body.picture,req.params.id];
    db.query(sql, parameters, function(error, result){
        if(error){
            throw error;
        }else{
            res.json(result)
        };
    });
});

//delete product
app.route('/product/:id').delete(function(req,res){
    var sql = "DELETE FROM `e-commerce`.product WHERE id=?";
    var parameters=[req.params.id];
    db.query(sql, parameters, function(error, result){
        if(error){
            throw error;
        }else{
            res.json(result)
        };
    });
});

//get category
app.route('/category').get(function(req,res){
    var sql = "SELECT * FROM `e-commerce`.category";
    db.query(sql, function(error, result){
        if(error){
            throw error;
        }else{
        //return result as json
            res.json(result)};
    });
});

//get category by id
app.route('/category/:id').get(function(req,res){
    var sql = "SELECT * FROM `e-commerce`.category WHERE id=?";
    var parameters=[req.params.id];
    db.query(sql,parameters, function(error, result){
        if(error){
            throw error;
        }else{
        //return result as json
            res.json(result)};
    });
});

//add category
app.route('/category').post(function(req,res){
    var sql = "INSERT INTO `e-commerce`.category (name) VALUES (?) ";
    var parameters=[req.body.name];
    db.query(sql, parameters, function(error, result){
        if(error){
            throw error;
        }else{
            res.json(result)
        };
    });
});

//update category
app.route('/category/:id').put(function(req,res){
    var sql = "UPDATE`e-commerce`.category SET name=? WHERE id=?";
    var parameters=[req.body.name, req.params.id];
    db.query(sql, parameters, function(error, result){
        if(error){
            throw error;
        }else{
            res.json(result)
        };
    });
});

//delete category
app.route('/category/:id').delete(function(req,res){
    var sql = "DELETE FROM `e-commerce`.category WHERE id=?";
    var parameters=[req.params.id];
    db.query(sql, parameters, function(error, result){
        if(error){
            throw error;
        }else{
            res.json(result)
        };
    });
});