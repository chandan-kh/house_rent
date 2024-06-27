import express from "express";
import mysql from "mysql2"; 
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

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

// const db = mysql.createConnection({
//     user : 'root',
//     host : 'localhost',
//     password : 'Hassan@123',
//     database : 'houserentdb',
// })

const db = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

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


app.post('/appointments', (req, res) => {
    const { tenant_id, owner_id, house_id } = req.body;
  
    const sql = 'INSERT INTO appointments (tenant_id, owner_id, house_id) VALUES (?, ?, ?)';
    const values = [tenant_id, owner_id, house_id];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error creating appointment:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      console.log('Appointment created successfully');
      res.status(200).json({ message: 'Appointment created successfully' });
    });
  });
  
// app.post('/ownerlanding',(req,res) =>{

//     const sql = "INSERT INTO house (`address`,`rent_amt`,`number_of_occupants`,`city`,`contact_no`,`property_type`,`description`,`house_image`,`owner_id`) VALUES (?)";
//     const values = [
//         req.body.address,
//         req.body.rentAmount,
//         req.body.occupants,
//         req.body.city,
//         req.body.contactNumber,
//         req.body.propertyType,
//         req.body.description,
//         req.body.image,
//         req.body.owner_id,
//     ];
//     db.query(sql, [values], (err, result) => {
//         if (err) {
//             console.log(err);
//             return res.json(err);
//         } else {
//             console.log('Home inserted successfully !');
//             res.json({ message: 'Home added !', result });
//         }
//     });
// })


app.post('/ownerlanding', (req, res) => {
    const ownerId = req.body.owner_id;

    const countHousesQuery = "SELECT COUNT(*) AS houseCount FROM house WHERE owner_id = ?";
    db.query(countHousesQuery, [ownerId], (err, result) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        console.log(result);
        const houseCount = result[0].houseCount;
        if (houseCount >= 3) {
            return res.json({ message: 'Payment required for additional houses', redirectToPayment: true });
        } else {
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
                    console.log('Home inserted successfully!');
                    res.json({ message: 'Home added!', result });
                }
            });
        }
    });
});



app.post('/registerbuilding', (req, res) => {
    const ownerId = req.body.owner_id;

            const sql = "INSERT INTO house (`address`,`rent_amt`,`number_of_occupants`,`city`,`contact_no`,`property_type`,`description`,`house_image`,`owner_id`,`building_id`) VALUES (?)";
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
                req.body.building_id
            ];
            db.query(sql, [values], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.json(err);
                } else {
                    console.log('Home inserted successfully!');
                    res.json({ message: 'Home added!', result });
                }
            });
        });


app.get('/ownerprofile/houses', (req, res) => {
    const ownerID = owner_id;
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

// app.get('/search/houses', (req, res) => {
//     const { location, rent } = req.query;
    
//     // Modify the SQL query to filter houses by location and rent
//     const sql = "SELECT * FROM house WHERE address LIKE ? OR rent_amt <= ?";
//     const searchLocation = `%${location}%`;
  
//     db.query(sql, [searchLocation, rent], (err, results) => {
//       if (err) {
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
//       res.json(results);
//     });
// });


app.get('/search/houses', (req, res) => {
    const { location, rent } = req.query;
    let sql;
    let params;
  
    if (location && rent) {
      // If both location and rent are provided, filter houses by location and rent
      sql = "SELECT * FROM house WHERE address LIKE ? AND rent_amt <= ?";
      params = [`%${location}%`, rent];
    } else if (location) {
      // If only location is provided, filter houses by location
      sql = "SELECT * FROM house WHERE address LIKE ?";
      params = [`%${location}%`];
    } else if (rent) {
      // If only rent is provided, filter houses by rent
      sql = "SELECT * FROM house WHERE rent_amt <= ?";
      params = [rent];
    } else {
      // If no search criteria provided, fetch all houses
      sql = "SELECT * FROM house";
      params = [];
    }
  
    db.query(sql, params, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(results);
    });
  });
  
  

  app.post('/payments', (req, res) => {
    const { rentAmount, date, tenant_id, owner_id, house_id } = req.body;
    const sql = `
        INSERT INTO payments (rent_amt, date, tenant_id, owner_id, house_id)
        SELECT ?, ?, ?, ?, ? 
        FROM (SELECT COUNT(*) as count FROM house WHERE house_id = ? AND owner_id = ? AND tenant_id = ?) as houseCount
        WHERE houseCount.count > 0;
    `;
    const values = [rentAmount, date, tenant_id, owner_id, house_id, house_id, owner_id, tenant_id];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting payment data into database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (result.affectedRows === 0) {
            console.log('The house is not registered.');
            res.status(400).json({ error: 'The house is not registered.' });
        } else {
            console.log('Payment data inserted successfully');
            res.status(200).json({ message: 'Payment data inserted successfully' });
        }
    });
});



app.post('/tenanthouseregister', (req, res) => {
    const { tenant_id, owner_id, house_id } = req.body;
    const sql = 'UPDATE house SET tenant_id = ? WHERE owner_id = ? AND house_id = ?';
    const values = [tenant_id, owner_id, house_id];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error Registering House:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Registered Successfully');
        res.status(200).json({ message: 'Registered Successfully' });
      }
    });
});


app.post('/leavehouse', (req, res) => {
    const { owner_id, house_id } = req.body;
    const sql = 'UPDATE house SET tenant_id = NULL WHERE owner_id = ? AND house_id = ?';
    const values = [owner_id, house_id];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error Registering House:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Registered Successfully');
        res.status(200).json({ message: 'Registered Successfully' });
      }
    });
});


app.get('/tenantprofile/houses', (req, res) => {
    const tenantID = req.query.tenant_id;
    const sql = "SELECT * FROM house WHERE tenant_id = ?";
    db.query(sql, [tenantID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});



app.get('/paymentreminders/:tenant_id', (req, res) => {
    const tenantId = req.params.tenant_id;
    const sql = "SELECT * FROM payment_reminders WHERE tenant_id = ?";
    db.query(sql, [tenantId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});


// Import required modules and set up your MySQL connection

app.get('/paymentInsights/:owner_id', (req, res) => {
    const owner_id = req.params.owner_id;
    db.query('CALL GetPaymentInsights(?)', [owner_id], (error, results) => {
        if (error) {
            console.error('Error fetching payment insights:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log(results[0]);
        res.status(200).json(results[0]);
    });
});


// Backend routes


// Backend route to get buildings with houses
app.get('/buildings/:owner_id', (req, res) => {
    const ownerId = req.params.owner_id;
    const sql = "SELECT * FROM house WHERE owner_id = ?";
    db.query(sql, [ownerId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
  });
  
  app.get('/appointments/owner/:owner_id', (req, res) => {
    const owner_id = req.params.owner_id;
  
    const sql = 'SELECT * FROM appointments WHERE owner_id = ?';
    
    db.query(sql, [owner_id], (err, results) => {
      if (err) {
        console.error('Error fetching owner appointments:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json(results);
    });
  });
  


app.listen(4000,()=>{
console.log("Connected to backend");
})

 
