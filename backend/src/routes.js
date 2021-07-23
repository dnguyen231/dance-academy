const router = require('express').Router();
const knex = require('knex');
var session = require('express-session');
require('dotenv').config();

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        port: process.env.DATABASE_PORT,
    },
});

router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

/*
**----------------------------------- public route ----------------------------------
*/

// POST: create new user and add them to the database
// INSERT INTO Customers (CustID, Fname, Lname, DOB, Phone, Address, Email, Password) 
// VALUES (value1, value2, …) RETURNING *;
router.route('/signup')
  .get(function (req, res) {
    // res.sendFile(__dirname + '/static/signup.html')
  })
  .post
  (function (req, res) {
    if(!req.session.loggedin)
    {
        const {fname, lname, dob, phone, address, email, password} = req.body;
        var custid           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 8; i++) {
            custid += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        db('customers')
            .insert({
                custid: custid,
                fname: fname,
                lname: lname,
                dob: dob,
                address: address,
                email: email,
                password: password,
                phone: phone,
            })
            .then(() => {
                console.log('User Added');
                return res.json({ msg: 'User Added' });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    else return res.send('Please log out');
});

// GET: return intructors 
// SELECT fname, lname FROM Instructors;
router.get('/instructors', (req, res) => {
    db.select( 'fname', 'lname')
    .from('instructors')
    .then((data) => {
        console.log(data);
        res.json(data);
    })
    .catch((err) => {
        console.log(err);
    });
});

// GET: return all classes in the future date and its availability
// SELECT max(classes.capacity) - count(take.classid) AS availability, 
// max(classes.name) as name,
// max(classes.type) as type,
// max(classes.level) as level,
// max(classes.genre) as genre,
// max(classes.datetime) as datetime,
// max(classes.duration) as duration,
// max(classes.price) as price,
// max(classes.individual) as individual
// FROM Classes natural join Take
// WHERE datetime > now() group by classid;
router.get('/schedule', (req, res) => {
    db.select([db.raw("MAX(classes.capacity) - count(take.classid) AS availability")])
        .max('classes.name',{as:'name'}).max('classes.type',{as:'type'}).max('classes.level',{as:'level'})
        .max('classes.genre',{as:'genre'})
        .max('classes.datetime',{as:'datetime'}).max('classes.duration',{as:'duration'}).max('classes.price',{as:'price'})
        .max('classes.individual',{as:'individual'})
        .from('classes').joinRaw('natural join take')
        .where('classes.datetime','>','NOW()')
        .groupBy('take.classid')
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});


// GET: return all the upcoming classes that are available
// SELECT classid, name FROM Classes WHERE datetime > NOW() and availability > 0;
router.get('/available-schedule', (req, res) => {
    db.select('classid', 'name')
        .from('classes')
        .where('classes.datetime','>','NOW()')
        .andWhere('availability', '=','TRUE')
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

// POST: log in
// SELECT * FROM Customers WHERE email = 'value' AND password = 'value';
// SELECT * FROM Instructors WHERE email = 'value' AND password = 'value';
router.route('/login')
  .get(function (req, res) {
    res.sendFile(__dirname + '/static/login.html')
  })
  .post
  (function (req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let role = req.body.role;
  if (email && password) {
    if(role == 'customer')
    {
        db.select('*').from('customers').where({email:email, password: password}).then((data) => 
        {
            // req.session = {};
            if (data.length > 0) {
                console.log('Logined successfully!');
                req.session.loggedin = true;
                req.session.email = email;
                req.session.userid = data[0].custid;
                req.session.fname = data[0].fname;
                req.session.lname = data[0].lname;
                req.session.customer = true;
                // console.log(data[0].custid);
                // res.redirect('/home');
                res.json(
                    {
                        msg: 'Logined successfully!',
                        customer: req.session.customer,
                        success: true,
                        userid: data[0].custid,
                        email: data[0].email,
                        fname:  data[0].fname,
                        lname: data[0].lname,
                        dob: data[0].dob,
                        phone: data[0].phone,
                        address: data[0].address
                }
                );
            } else {
                res.json('Incorrect Username and/or Password!');
                console.log('Incorrect Username and/or Password!');
            }
        })
    }
    else if(role == 'instructor')
    {
        db.select('*').from('instructors').where({email:email, password: password}).then((data) => 
        {
            if (data.length > 0) {
                console.log('Logined successfully!');
                req.session.loggedin = true;
                req.session.email = email;
                req.session.fname = data[0].fname;
                req.session.lname = data[0].lname;
                req.session.userid = data[0].instructorid;
                req.session.instructor = true;
                // console.log(data[0].instructorid);
                // res.redirect('/home');
                res.json(
                    {
                        instructor: req.session.instructor,
                        msg: 'Logined successfully!',
                        success: true,
                        userid: data[0].instructorid,
                        email: data[0].email,
                        fname:  data[0].fname,
                        lname: data[0].lname,
                        dob: data[0].dob,
                        phone: data[0].phone
                }
                );
            } else {
                res.json('Incorrect Username and/or Password!');
                console.log('Incorrect Username and/or Password!');
            }
        })
  }}
  else {console.log('Please enter Username and Password!');}
})

/*--------------------------------- private route ---------------------------*/

// POST: log out
router.get('/logout', function(req, res){
    if (req.session.loggedin)
    {
        req.session.loggedin = false;
        req.session.customer = false;
        req.session.instructor = false;
        console.log('Log out successfully!');
        res.redirect('/');
    }
});

// GET: home after login or logout
router.get('/dashboard', function(req, res){
	if (req.session.loggedin){
        if(req.session.customer)
            res.sendFile(__dirname + '/static/user-dashboard.html');
        if(req.session.instructor)
            res.sendFile(__dirname + '/static/instructor-dashboard.html');
	} 
    else
        res.send('Please login to view this page!');
});

// GET: profile for each user
// SELECT * FROM Customers WHERE custid = 'value';
// SELECT * FROM Instructors WHERE custid = 'value';
router.get('/dashboard/info', (req, res) => {
    if (req.session.loggedin && req.session.customer) {
        const custid = req.session.userid;
        db.select('*')
            .from('customers')
            .where('custid', '=', custid)
            .then((data) => {
                console.log(data);
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
            });
	} 
    else if (req.session.loggedin && req.session.instructor) {
        const instructorid = req.session.userid;
        db.select('*')
            .from('instructors')
            .where('instructorid', '=', instructorid)
            .then((data) => {
                console.log(data);
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
            });
	} 
    else {
		res.send('Please login to view this page!');
	}
});

// PATCH: update profile
// UPDATE Customers SET phone = 'value', dob ='value' 
// WHERE custid = 'value';

router.route('/dashboard/profile')
.get(function (req, res) {
    if (req.session.loggedin && req.session.customer || req.session.loggedin && req.session.instructor) {
        res.sendFile(__dirname + '/static/profile.html')
    }
})
.post(function (req, res) { 
    if(req.session.loggedin && req.session.customer)
    {
        const custid = req.session.userid;
        const Fname = req.body.fname;
        const Lname = req.body.lname;
        const DOB = req.body.dob;
        const Address = req.body.address;
        const Phone = req.body.phone;
        db('customers').where('custid', '=', custid).update(
            { fname: Fname,
                lname: Lname,
                dob: DOB,
                address: Address,
                phone: Phone
            })
            .then(() => {
                console.log(Fname, Lname, DOB, Phone, Address);
                console.log('Completed the update for ' + custid);
                return res.send('Update completed for ' + custid);
            }).catch((err) => {
                console.log(err);
            });
    }
    else if(req.session.loggedin && req.session.instructor)
    {
        const instructorid = req.session.userid;
        const Fname = req.body.fname;
        const Lname = req.body.lname;
        const DOB = req.body.dob;
        const Phone = req.body.phone;
        // const {Fname, Lname, DOB, Address, Phone} = req.body;
        db('instructors').where('instructorid', '=', instructorid).update(
            { fname: Fname,
                lname: Lname,
                dob: DOB,
                phone: Phone
            })
            .then(() => {
                console.log(Fname, Lname, DOB, Phone);
                console.log('Completed the update for ' + instructorid);
                return res.send('Update completed for ' + instructorid);
            }).catch((err) => {
                console.log(err);
            });
        
    }
    else res.send('Please log in to view this page');
});

/*----- customers view -----*/

//POST: Book the class
//INSERT INTO Orders (OrderID, CustID, OrderedDate, PaymentType, Status) VALUES (value1, value2, …) RETURNING *;
//INSERT INTO Place_Order (OrderID, CustID) VALUES (value1, value2, …) RETURNING *;
//INSERT INTO Order_List (OrderID, ClassID, Quantity) VALUES (value1, value2, …) RETURNING *;
//INSERT INTO Take (ClassID, Custid) VALUES (value1, value2, …) RETURNING *;
var num; 
router.route('/dashboard/checkout')
.get(function (req, res) {
    db('orders').count('orderid',{as:'total'}).then((data) => {
        num = data[0].total
        console.log(num + ' ' + data[0].total)
    });
  res.sendFile(__dirname + '/static/booking.html')
})
.post(function (req, res) {
    if (req.session.loggedin && req.session.customer) {
        let classid = req.body.classid;
        let quantity = req.body.quantity;
        let paymenttype = req.body.payment;

        const custid = req.session.userid;

        num++;
        var orderid = 'od' + num;
        const status = 'Successful';

        console.log(num);
        console.log(orderid);

        //get datetime
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var ordereddate = date+' '+time;

        //1. add data to table 'orders'
        db('orders')
        .insert({
            orderid: orderid,
            custid: custid,
            ordereddate: ordereddate,
            paymenttype: paymenttype,
            status: status,
        })
        .then(() => {
            console.log('Order has been added to table Orders' + classid +' ' + quantity + ' ' + paymenttype);
            return res.json({ 
                msg: 'Please collect your reciept',
                orderid: orderid,
                classid: classid,
                quantity: quantity,
                payment: paymenttype, 
            });
        })
        .catch((err) => {
            console.log(err);
        });

        //2. add data to table 'place_order'
        db('place_order')
        .insert({
            orderid: orderid,
            custid: custid,
            ordereddate: ordereddate,
        })
        .then(() => {
            console.log('Order has been added to table place_order');
            return res.json({ msg: 'Order has been added to table place_order' });
        })
        .catch((err) => {
            console.log(err);
        });

        //3. add data to table 'order_list'
        db('order_list')
        .insert({
            orderid: orderid,
            classid: classid,
            quantity: quantity,
        })
        .then(() => {
            console.log('Order has been added to table order_list');
            return res.json({ msg: 'Order has been added to table order_list'});
        })
        .catch((err) => {
            console.log(err);
        });
         //3. add data to table 'take'
         db('take')
         .insert({
             classid: classid,
             custid: custid,
         })
         .then(() => {
             console.log('Order has been added to table take');
             return res.json({ msg: 'Order has been added to table take'});
         })
         .catch((err) => {
             console.log(err);
         });
	} 
    else {
		res.send('Please login to view this page!');
	}
});

// GET: see orders they have placed for, order by from newest to oldest
// SELECT * FROM orders o, order_list l WHERE custid = 'e910b4728' and o.orderid = l.orderid order by ordereddate desc;
router.get('/dashboard/order', (req, res) => {
    if (req.session.loggedin && req.session.customer) {
        const custid = req.session.userid;
        db.select('*').from('orders').joinRaw('natural join order_list').where('custid', '=', custid).orderBy('ordereddate', 'desc')
          .then((data) => {
            console.log(data);
            res.json(data);
            })
            .catch((err) => {
                console.log(err);
            });
	} 
    else {
		res.send('Please login to view this page!');
	}
});

// GET: see detail of a specific class they booked for (info, price, instructors, rooms, ... )
// SELECT classes.classid, classes.name, classes.type, classes.level, classes.genre, classes.datetime, classes.duration, classes.price, classes.individual, 
// R.roomid, R.floor, take.attendance, I.fname, I.lname, I.email
// FROM Classes natural join Take natural join teach AS T, Rooms R, Instructors I
// WHERE classes.held = R.roomid and T.instructorid = I.instructorid and take.custid = 'e910b4728' AND classes.classid = 'b005';

router.get('/dashboard/orders/:classid', (req, res) => {
    if (req.session.loggedin && req.session.customer) {
        const custid = req.session.userid;
        const classid = req.params.classid;
        db.select(['classes.classid', 'classes.name', 'classes.type', 'classes.level','classes.genre', 'classes.datetime', 'classes.duration', 'classes.price',
        'classes.individual','rooms.roomid', 'rooms.floor', 'take.attendance', 'instructors.fname', 'instructors.lname', 'instructors.email'])
        .from('classes')
        .joinRaw('natural join take').where({custid:custid, classid:classid})
        .joinRaw('natural join teach')
        .join('instructors', 'teach.instructorid', '=', 'instructors.instructorid')
        .join('rooms', 'rooms.roomid', '=', 'classes.held')
          .then((data) => {
            // console.log(data);
            res.json(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    else {
		res.send('Please login to view this page!');
	}
});

/*-------- instructors view --------*/

// GET: return all classes teached by the user, count how many students booked for each
// SELECT T.classid, MAX(C.name),MAX(C.type),MAX(C.level), MAX(C.genre), MAX(C.availability), MAX(C.datetime), 
// MAX(C.duration), MAX(C.individual), MAX(R.roomID), MAX(R.floor), Max(R.capacity)
// COUNT(T.custid)
// FROM Teach natural join Classes as C, Rooms R, Take T
// WHERE instructorid ='oliver0129' and C.held = R.roomid and T.classid = C.classid 
// GROUP BY T.classid;
router.get('/dashboard/your-class', (req, res) => {
    if (req.session.loggedin && req.session.instructor) {
        const instructorid = req.session.userid;
        db.select('take.classid')
        .max('classes.name',{as:'name'}).max('classes.type',{as:'type'}).max('classes.level',{as:'level'})
        .max('classes.genre',{as:'genre'}).max('classes.availability',{as:'availability'})
        .max('classes.datetime',{as:'datetime'}).max('classes.duration',{as:'duration'})
        .max('classes.individual',{as:'individual'})
        .max('rooms.roomid',{as:'roomid'}).max('rooms.floor',{as:'floor'})
        .max('rooms.capacity',{as:'capacity'})
        .count('take.custid',{as:'total_students'})
        .from('teach')
        .joinRaw('natural join classes')
        .where('instructorid', '=', instructorid)
        .join('rooms', 'rooms.roomid', '=', 'classes.held')
        .joinRaw('natural join take')
        .groupBy('take.classid')
          .then((data) => {
            console.log(data);
            res.json(data);
            })
            .catch((err) => {
                console.log(err);
            });
	} 
    else {
		res.send('Please login to view this page!');
	}
});

// GET: return students information for each of the instructor's class
// SELECT * FROM Teach NATURAL JOIN Take AS T, Customers C WHERE classid = 'b005' AND instructorid ='oliver0129' AND C.custid = T.custid;
router.get('/dashboard/your-class/:classid', (req, res) => {
    if (req.session.loggedin && req.session.instructor) {
        const instructorid = req.session.userid;
        const classid = req.params.classid;
        db.select('*')
        .from('teach')
        .joinRaw('natural join take').where({classid:classid, instructorid:instructorid})
        .joinRaw('natural join customers')
          .then((data) => {
            console.log(data);
            res.json(data);
            })
            .catch((err) => {
                console.log(err);
            });
	} 
    else {
		res.send('Please login to view this page!');
	}
});

// POST: allow instructors edit their active classes information
// UPDATE Classes SET DateTime = DateTime + 7 WHERE DateTime BETWEEN '07-26-2021' AND '07-30-2021';
router.route('/dashboard/your-class/update')
.post(function (req, res) { 
    if(req.session.loggedin && req.session.instructor)
    {
        const {classid, name, type, level, genre, availability, datetime, individual, roomid, capacity} = req.body;
        db('classes')
        .where('classid','=',classid).andWhere('datetime','>','NOW()')
        .update({
            name: name,
            type: type,
            level: level,
            genre: genre,
            availability: availability,
            datetime : datetime,
            individual: individual,
            capacity:capacity,
            held: roomid,
        }).then(() => {
            console.log('Modified ' + classid);
            return res.json({ msg: 'Your class ' + classid + ' has been updated!'});
        })
        .catch((err) => {
            console.log(err);
        });
    }
});

module.exports = router;