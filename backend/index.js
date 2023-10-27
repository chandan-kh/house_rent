import express from "express";
import mysql from "mysql2"; 
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());


let owner_id = null;
let tenant_id = null;

// app.get("/loginOwner")
// app.post("/registerOwner")
// app.get("/loginTenant")
// app.post("/registerTenant")
// app.get("/housesForTenant")
// app.post("/listHouseByOwner")

const db = mysql.createConnection({
    user : 'root',
    host : 'localhost',
    password : 'Hassan@123',
    database : 'houserentdb',
})

db.connect((err,res)=>{
    if(!err) {
        console.log('Database connected');
    }
    else{
    console.log(err);
    }
})

app.post('/registerowner', (req, res) => {
    const sql = "INSERT INTO owner (`full_name`,`email`,`password`,`phone_no`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.phonenumber,
    ];

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.log(err);
            return res.json(err);
        } else {
            console.log('User inserted successfully !');
            return res.json(result);
        }
    });
});


app.post('/registertenant', (req, res) => {

    const sql = "INSERT INTO tenant (`full_name`,`email`,`password`, `id_proof`,`phone_no`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.idproofnumber,
        req.body.phonenumber,
    ];

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.log(err);
            return res.json(err);
        } else {
            console.log('User inserted successfully !');
            return res.json({ message: 'User added !', result });
        }
    });
});


// app.post('/loginowner',(req,res) =>{
//     const sql = "SELECT * FROM owner WHERE email = ? AND password = ?";
//     db.query(sql, [req.body.email, req.body.password], (err, data)=>{
//         if(err) return res.json("ERROR");
//         if(data.length > 0){
//             owner_id = data[0].owner_id;
//             return res.json({ message: 'Login Success', owner_id });
//         }
//         else{
//             return res.json("Invalid Email or Password");
//         }
//     });
// });


app.post('/loginowner',(req,res) =>{
    const sql = "SELECT * FROM owner WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data)=>{
        if(err) return res.status(500).json({ message: "Error occurred" });
        if(data.length > 0){
            owner_id = data[0].owner_id;
            console.log(owner_id);
            // Send the success message and owner_id in the response
            return res.status(200).json({ message: "Login Success", owner_id });
        }
        else{
            return res.status(401).json({ message: "Invalid Email or Password" });
        }
    });
});




app.post('/logintenant',(req,res) =>{
    const sql = "SELECT * FROM tenant WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data)=>{
        if(err) return res.status(500).json({ message: "Error occurred" });
        if(data.length > 0){
            tenant_id = data[0].tenant_id;
            console.log(tenant_id);
            // Send the success message and owner_id in the response
            return res.status(200).json({ message: "Login Success", tenant_id });
        }
        else{
            return res.status(401).json({ message: "Invalid Email or Password" });
        }
    });
});

app.post('/ownerlanding',(req,res) =>{

    const sql = "INSERT INTO house (`address`,`rent_amt`,`number_of_occupants`,`city`,`contact_no`,`property_type`,`description`,`house_image`,`owner_id`) VALUES (?)";
    const values = [
        req.body.address,
        req.body.rentAmount,
        req.body.occupants,
        req.body.city,
        req.body.contactNumber,
        req.body.propertyType,
        req.body.description,
        req.body.image,
        req.body.owner_id,
    ];
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.log(err);
            return res.json(err);
        } else {
            console.log('Home inserted successfully !');
            res.json({ message: 'Home added !', result });
        }
    });
})




app.get('/ownerprofile/houses', (req, res) => {
    const ownerID = owner_id;
    // Replace with the actual owner ID or fetch it from your authentication system.
    const sql = "SELECT * FROM house WHERE owner_id = ?";
    db.query(sql, [ownerID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});




app.put('/edithouse/:id',(req,res) =>{

    const sql = "UPDATE house set `address` = ? , `rent_amt` = ? , `number_of_occupants` = ? , `city` = ? , `contact_no` = ? , `property_type` = ? , `description` = ? , `house_image` = ? , `owner_id` = ? WHERE `house_id` = ?";
    const values = [
        req.body.address,
        req.body.rentAmount,
        req.body.occupants,
        req.body.city,
        req.body.contactNumber,
        req.body.propertyType,
        req.body.description,
        req.body.image,
        req.body.owner_id,
    ];

    const id = parseInt(req.params.id); 

    db.query(sql, [...values,id], (err, result) => {
        if (err) {
            console.log(err);
            return res.json(err);
        } else {
            console.log('Home Updated successfully !');
            res.json({ message: 'Home Updated !', result });
        }
    });
})


app.delete('/house/:id',(req, res) => {
    const sql = "DELETE FROM house where house_id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.json("Error Deleting");
        }
        return res.json(results);
    });
});

app.get('/search/houses', (req, res) => {
    const { location, rent } = req.query;
    
    // Modify the SQL query to filter houses by location and rent
    const sql = "SELECT * FROM house WHERE address LIKE ? OR rent_amt <= ?";
    const searchLocation = `%${location}%`;
  
    db.query(sql, [searchLocation, rent], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(results);
    });
  });
  

app.listen(4000,()=>{
    console.log("Connected to backend");
})

 