// sqlite3 package used to create an sqlite database
var sqlite3 = require("sqlite3").verbose();

// create an sqlite database in-memory
var db = new sqlite3.Database(':memory:');

// express package used to create a server
var express = require('express');

// create an express instance to define our server
var app = express();

// include cors to allow for requests from our ReactJS app running on a different port
var cors = require('cors');

// accept requests from any origin
app.use(cors({origin: '*'}));

// startup a collection of data to manage
db.serialize(function(){
  // create a fresh version of the locations table
  db.run("DROP TABLE IF EXISTS Locations");
  db.run("CREATE TABLE Locations (id INTEGER, latitude REAL, longitude REAL, description TEXT, subtitle TEXT, address TEXT)");

  // insert initial records into locations table
  var stmt = db.prepare("INSERT INTO Locations VALUES (?,?,?,?,?,?)");
  stmt.run("1", "43.254406", "-79.867308", "Green Gross Main Center", "Main Branch", "2 King St W, Hamilton, ON. Postal Code: L8P 1A1");
  stmt.run("2", "43.257992", "-79.869754", "Nations Fresh Food", "Healty Food", "2 King St W #445, Hamilton, ON Postal Code: L8P 1A2");
  stmt.run("3", "43.234586", "-79.877792", "Walmart Supercentre", "Supermarket", "675 Upper James St, Hamilton, ON Postal Code: L9C 2Z5");
  stmt.run("4", "43.251538", "-79,852623", "Giorgio's NoFrills", "Tasty Meals", "435 Main St E, Hamilton, ON Postal Code: L8N 1K1");
  stmt.run("4", "43.253736", "-79.860992", "Green Foods", "Restaurant", "284 King St E, Hamilton, Ontario L8N 1B7, Canada");
  stmt.finalize();
  
   // create a fresh version of the locations table
   db.run("DROP TABLE IF EXISTS Products");
   db.run("CREATE TABLE Products (id INTEGER, displayName TEXT, imageFile TEXT, price REAL)");
 
   // insert initial records into locations table
   var stmt = db.prepare("INSERT INTO Products VALUES (?,?,?,?)");
   stmt.run("1", "Broccoli", "broccoli.png", "0.99");
   stmt.run("2", "Onion", "onion.png", "1.29");
   stmt.run("3", "Carrot", "carrot.png", "0.79");
   stmt.run("4", "Potato", "potato.png", "0.89");
   stmt.run("5", "Tomato", "tomato.png", "1.39");
   stmt.run("6", "Apples", "apples.png", "0.99");
   stmt.run("7", "Oranges", "oranges.png", "1.19");
   stmt.run("8", "Bananas", "bananas.png", "0.79");
   stmt.run("9", "Berries", "berries.png", "2.99");
   stmt.run("10", "Watermelon", "watermelon.png", "1.89");
   stmt.finalize();
});

// Make the backend available at localhost:3001/api
app.get("/api/locations", function(req,res) {
	// log to console that an api request has been received
    console.log("API REQUEST RECEIVED");
	
	// return all of the animals in the inventory as a JSON array
	if (req.query.act == "getall") {
  	  db.all("SELECT id, latitude, longitude, description, subtitle, address FROM Locations",
		function(err, results) {
			if (err) {
				// console log error, return JSON error message
				console.log(err);
				res.json({"error" : "Could not get locations"});
			}
			else {
				// send debug info to console
				console.log(JSON.stringify(results));
				// send back table data as JSON data
				res.json(results);
				
			}
		});
	}

	else if (req.query.act == "add") {
		db.run("INSERT INTO Locations(id,latitude,longitude,description,subtitle,address) VALUES (?,?,?,?,?)", 
			[req.query.id, 
			req.query.latitude,
			req.query.longitude, 
			req.query.description,
			req.query.subtitle,
			req.query.address
		],
			function(err, results) {
				if (err) {
					// console log error, return JSON error message
					console.log(err);
					res.json({"error" : "Could not insert location"});
				}
				else {
					console.log(results);
					res.json({"status" : "Add location successful"});
				}
				
			});
	}

	else if (req.query.act == "delete") {
		db.run("DELETE FROM Locations WHERE id=?", 
			[req.query.id],
			function(err, results) {
				if (err) {
					// console log error, return JSON error message
					console.log(err);
					res.json({"error" : "Could not delete location"});
				}
				else {
					console.log(results);
					res.json({"status" : "Delete location successful"});
				}
			});
	}

	// if no act is found
	else {
	  res.json({'error': 'act not found'});	
	}
});

app.get("/api/products", function(req,res) {
	// log to console that an api request has been received
    console.log("API REQUEST RECEIVED TO PRODUCTS");
	
	// return all of the animals in the inventory as a JSON array
	if (req.query.act == "getall") {
  	  db.all("SELECT id, displayName, imageFile, price FROM Products",
		function(err, results) {
			if (err) {
				// console log error, return JSON error message
				console.log(err);
				res.json({"error" : "Could not get products"});
			}
			else {
				// send debug info to console
				console.log(JSON.stringify(results));
				// send back table data as JSON data
				res.json(results);
				
			}
		});
	}
	// if no act is found
	else {
	  res.json({'error': 'act not found'});	
	}
});

// catch all case if no route found
app.get('*',function (req, res) {
  res.json({'error': 'route not found'});
});

// run the server
var server = app.listen(3001, function(){
  console.log("Green Gross System Server listening on port 3001!")
});

