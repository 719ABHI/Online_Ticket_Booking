// const express = require('express');
// const path = require('path');
// const mongoose = require('mongoose');
// const nodemailer = require('nodemailer'); // Import nodemailer for email notifications
// const app = express();
// const port = 3003;

// const cors = require('cors');
// app.use(cors());


// // Set up MongoDB connection (replace with your MongoDB URI)
// //const dbURI = 'mongodb://soukhya:soukhya@cluster0-shard-00-00.vhp9e.mongodb.net:27017,cluster0-shard-00-01.vhp9e.mongodb.net:27017,cluster0-shard-00-02.vhp9e.mongodb.net:27017/?ssl=true&replicaSet=atlas-r0byv9-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'; 
// const dbURI='mongodb://localhost:27017/trainbooking'; // Local MongoDB URI for development

// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch((err) => console.log('MongoDB connection error: ', err));

// // Define user schema
// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });

// // Create model for user
// const User = mongoose.model('User', userSchema);

// // Define train schema
// const trainSchema = new mongoose.Schema({
//     name: String,
//     availableSeats: Number,
//     timing: String,
//     source: String,
//     destination: String,
//     bookedSeats: { type: [String], default: [] },
// });


// // Create model for train
// const Train = mongoose.model('Train', trainSchema);
// // module.exports = Train;


// // Define the ticket schema and model
// const ticketSchema = new mongoose.Schema({
//     name: String,
//     address: String,
//     contactNumber: String,
//     age: Number,
//     fromStation: String,
//     toStation: String,
//     travelDate: String,
//     departureTime: String,
//     totalAmount: String,
//     bookingId: String,
//     bookedSeats: String,
//     userEmail: String,
// }, { timestamps: true });

// const Ticket = mongoose.model('Ticket', ticketSchema);

// // Middleware to parse JSON data
// app.use(express.json());

// // Serve static files like index.html and other assets
// app.use(express.static(path.join('C:', 'Users', 'soura', 'Downloads', 'Project')));








// app.post('/api/sendTicketEmail', async (req, res) => {
//     try {
//         const emailData = req.body; // Get email data from request
//         const { userEmail, name, address, contactNumber, age, fromStation, toStation, travelDate, departureTime, totalAmount, bookingId, bookedSeats } = emailData;
//         console.log("User Email: ", emailData.userEmail);
        

//         if (!userEmail) {
//             throw new Error('Recipient email address is missing');
//         }

//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: '02fe22bcs148klescet.ac.in@gmail.com',
//                 pass: 'nwye fpob gkij jhtr',
//             },
//         });

//         const mailOptions = {
//             from: '02fe22bcs148klescet.ac.in@gmail.com',
//             to: emailData.userEmail,
//             subject: 'Train Ticket Booking Confirmation',
//             html: `
//                 <h1>GREENY TICKET Booking Confirmation</h1>
//                 <p>Dear ${emailData.name},</p>
//                 <p>Your booking has been confirmed. Here are the details:</p>
//                 <ul>
//                     <li><strong>Booking ID:</strong> ${emailData.bookingId}</li>
//                     <li><strong>From:</strong> ${emailData.fromStation}</li>
//                     <li><strong>To:</strong> ${emailData.toStation}</li>
//                     <li><strong>Date:</strong> ${emailData.travelDate}</li>
//                     <li><strong>Departure Time:</strong> ${departureTime}</li>
//                     <li><strong>Booked Seats:</strong> ${bookedSeats}</li>
//                     <li><strong>Total Amount:</strong> $${emailData.totalAmount}</li>
//                 </ul>
//                 <p>Thank you for using our service!</p>
//             `,
//         };

//         await transporter.sendMail(mailOptions);
//         res.json({ success: true }); // Respond with success
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.json({ success: false, message: error.message });
//     }
// });

// // API endpoint to save ticket details
// app.post('/api/saveTicket', async (req, res) => {
//     try {
//         const ticketData = req.body;
//         const departureTime = ticketData.departureTime || 'Not available';
     
//         // Create a new ticket document
//         const ticket = new Ticket(ticketData);

//         // Save to database
//         await ticket.save();
//         res.status(201).json({ success: true, message: 'Ticket saved successfully!' });
//     } catch (error) {
//         console.error('Error saving ticket:', error);
//         res.status(500).json({ success: false, message: 'Failed to save ticket' });
//     }
// });



// // Route to handle train booking
// app.post('/api/updateBookedSeats', async (req, res) => {
//     console.log("Received request for /api/updateBookedSeats");
//     const { trainId, seats} = req.body;

//     // Sanitize the seats array to ensure all elements are integers
//     const sanitizedSeats = seats.map(seat => parseInt(seat, 10)).filter(Number.isInteger);

//     if (sanitizedSeats.length !== seats.length) {
//         return res.status(400).json({ message: "Invalid seat numbers provided." });
//     }

//     try {
//         // Fetch the train details
//         const train = await Train.findById(trainId);

//         if (!train) {
//             return res.status(404).json({ message: 'Train not found' });
//         }

       
 


//          // Check if any of the requested seats are already booked
//          const alreadyBooked = train.bookedSeats.filter(seat => seats.includes(seat));
//          if (alreadyBooked.length > 0) {
//              return res.status(400).json({
//                  message: `The following seats are already booked: ${alreadyBooked.join(', ')}`,
//              });
//          }

//          const availableSeats = train.availableSeats - train.bookedSeats.length;
//  if (seats.length > availableSeats) {
//      return res.status(400).json({ message: 'Not enough seats available' });
//  }
 
//  console.log("trainId:", trainId);
// console.log("seats:", seats);

//  console.log("Before calling findOneAndUpdate");
//          // Add the new seats to the bookedSeats array (using $addToSet to avoid duplicates)
//          const updatedTrain = await Train.findOneAndUpdate(
//             { _id: trainId },
//             { $addToSet: { bookedSeats: { $each: seats } } },
//             { new: true }  // Ensures the updated document is returned
//         );
//         console.log("Update result:", updatedTrain);
        
       

//         if (updatedTrain.nModified === 0) {
//             return res.status(500).json({ message: 'Failed to update seat bookings' });
//         }

//          if (!updatedTrain) {
//              return res.status(500).json({ message: 'Failed to update seat bookings' });
//          }


//         // Create booking details
//         const bookingDetails = {
//             id: `BOOK${Date.now()}`, // Generate a unique booking ID
//             trainName: updatedTrain.name,
//             from: updatedTrain.source,
//             to: updatedTrain.destination,
//             date: new Date().toISOString().split('T')[0],
//             seats,
//             amount,
//         };


//         // Send email notification
//         await sendEmailNotification(userEmail, bookingDetails);

//         res.json({ success: true, message: 'Booking confirmed', bookingDetails });
//     } catch (error) {
//         console.error('Error booking ticket:', error);
//         res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
//     }
// });






// // Route to handle login
// app.post('/api/login', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const user = await User.findOne({ username });

//         if (!user) {
//             return res.status(401).json({ success: false, message: 'Invalid credentials' });
//         }

//         // Compare password (in a real application, you'd hash and compare passwords)
//         if (user.password === password) {
//             res.json({ success: true, username: user.username });
//         } else {
//             res.status(401).json({ success: false, message: 'Invalid credentials' });
//         }
//     } catch (error) {
//         console.error("Error logging in:", error);
//         res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
//     }
// });

// // Route to handle user registration
// app.post('/api/register', async (req, res) => {
//     const { username, email, password } = req.body;

//     try {
//         const existingUser = await User.findOne({ $or: [{ username }, { email }] });

//         if (existingUser) {
//             return res.status(400).json({ success: false, message: 'Username or email already exists' });
//         }

//         const newUser = new User({ username, email, password });
//         await newUser.save();

//         res.json({ success: true, message: 'Registration successful' });
//     } catch (error) {
//         console.error("Error registering user:", error);
//         res.status(500).json({ success: false, message: 'Registration failed. Please try again later.' });
//     }
// });

// // Route to handle train search based on from, to, and date
// app.get("/api/searchTrains", async (req, res) => {
//     const { from, to, date } = req.query;

//     if (!from || !to || !date) {
//         return res.status(400).json({ error: "Missing parameters" });
//     }

//     try {
//         // Query the Train model to get trains matching the source, destination, and date
//         const trains = await Train.find({ source: from, destination: to });

//         if (trains.length === 0) {
//             return res.status(404).json({ message: "No trains available for this route" });
//         }

//         res.json(trains);
//     } catch (error) {
//         console.error("Error fetching trains:", error);
//         res.status(500).json({ error: "Something went wrong. Please try again later." });
//     }
// });


// // Example for Express.js backend
// // Route to handle fetching train details
// app.get('/api/trainDetails', async (req, res) => {
//     try {
//         const train = await Train.findOne();  // Assuming you're looking for the first train document
//         if (!train) {
//             return res.status(404).json({ success: false, message: 'Train data not found.' });
//         }
//         res.json(train);  // Send the train data as JSON
//     } catch (error) {
//         console.error('Error fetching train data:', error);
//         res.status(500).json({ success: false, message: 'Something went wrong.' });
//     }
// });


// const UserInput = mongoose.model('UserInput', new mongoose.Schema({
//     input: {
//         type: String,
//         required: true,
//         trim: true,
//     }
// }));

// // API endpoint to store user input
// app.post('/api/storeInput', async (req, res) => {
//     try {
//         const { userInput } = req.body;  // Get input from the request body

//         // Create a new document with the input
//         const newInput = new UserInput({ input: userInput });

//         // Save the document to the database
//         await newInput.save();

//         // Send response back to the front-end
//         res.json({ success: true, message: 'Input saved successfully!' });
//     } catch (error) {
//         console.error('Error saving input:', error);
//         res.status(500).json({ success: false, message: 'Error saving input.' });
//     }
// });


// // Route to serve the homepage (index.html)
// app.get('/', (req, res) => {
//     res.sendFile(path.join('C:', 'Users', 'soura', 'Downloads', 'New folder', 'index.html'));
// });

// // Start the server and listen on the specified port
// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });








// const express = require('express');
// const path = require('path');
// const mongoose = require('mongoose');
// const nodemailer = require('nodemailer');
// const cors = require('cors');

// const app = express();
// const port = 3003;

// app.use(cors());
// app.use(express.json());

// // MongoDB URI (change this as per deployment environment)
// const dbURI = 'mongodb://localhost:27017/trainbooking';

// mongoose.connect('mongodb://host.docker.internal:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch((err) => console.log('MongoDB connection error:', err));

// // ======= MONGOOSE SCHEMAS =======

// // User schema
// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });
// const User = mongoose.model('User', userSchema);

// // Train schema
// const trainSchema = new mongoose.Schema({
//     name: String,
//     availableSeats: Number,
//     timing: String,
//     source: String,
//     destination: String,
//     bookedSeats: { type: [String], default: [] },
// });
// const Train = mongoose.model('Train', trainSchema);

// // Ticket schema
// const ticketSchema = new mongoose.Schema({
//     name: String,
//     address: String,
//     contactNumber: String,
//     age: Number,
//     fromStation: String,
//     toStation: String,
//     travelDate: String,
//     departureTime: String,
//     totalAmount: String,
//     bookingId: String,
//     bookedSeats: String,
//     userEmail: String,
// }, { timestamps: true });
// const Ticket = mongoose.model('Ticket', ticketSchema);

// // ======= ROUTES =======

// // Serve frontend (optional, adjust path as needed)
// app.use(express.static(path.join(__dirname, 'public')));

// // Email sender helper
// async function sendEmailNotification(userEmail, bookingDetails) {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: '02fe22bcs148klescet.ac.in@gmail.com',
//             pass: 'nwye fpob gkij jhtr',
//         },
//     });

//     const mailOptions = {
//         from: '02fe22bcs148klescet.ac.in@gmail.com',
//         to: userEmail,
//         subject: 'Train Ticket Booking Confirmation',
//         html: `
//             <h1>GREENY TICKET Booking Confirmation</h1>
//             <p>Your booking has been confirmed:</p>
//             <ul>
//                 <li><strong>Booking ID:</strong> ${bookingDetails.id}</li>
//                 <li><strong>Train:</strong> ${bookingDetails.trainName}</li>
//                 <li><strong>From:</strong> ${bookingDetails.from}</li>
//                 <li><strong>To:</strong> ${bookingDetails.to}</li>
//                 <li><strong>Date:</strong> ${bookingDetails.date}</li>
//                 <li><strong>Seats:</strong> ${bookingDetails.seats.join(', ')}</li>
//                 <li><strong>Amount:</strong> $${bookingDetails.amount}</li>
//             </ul>
//         `
//     };

//     await transporter.sendMail(mailOptions);
// }

// // Register
// app.post('/api/register', async (req, res) => {
//     const { username, email, password } = req.body;
//     try {
//         const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//         if (existingUser) {
//             return res.status(400).json({ success: false, message: 'Username or email already exists' });
//         }
//         const newUser = new User({ username, email, password });
//         await newUser.save();
//         res.json({ success: true, message: 'Registration successful' });
//     } catch (error) {
//         console.error("Registration error:", error);
//         res.status(500).json({ success: false, message: 'Registration failed' });
//     }
// });

// // Login
// app.post('/api/login', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = await User.findOne({ username });
//         if (!user || user.password !== password) {
//             return res.status(401).json({ success: false, message: 'Invalid credentials' });
//         }
//         res.json({ success: true, username: user.username, email: user.email });
//     } catch (error) {
//         console.error("Login error:", error);
//         res.status(500).json({ success: false, message: "Login failed" });
//     }
// });

// // Save Ticket
// app.post('/api/saveTicket', async (req, res) => {
//     try {
//         const ticket = new Ticket(req.body);
//         await ticket.save();
//         res.status(201).json({ success: true, message: 'Ticket saved successfully' });
//     } catch (error) {
//         console.error("Save ticket error:", error);
//         res.status(500).json({ success: false, message: 'Failed to save ticket' });
//     }
// });

// // Send Email
// app.post('/api/sendTicketEmail', async (req, res) => {
//     try {
//         const data = req.body;
//         await sendEmailNotification(data.userEmail, {
//             id: data.bookingId,
//             trainName: data.trainName,
//             from: data.fromStation,
//             to: data.toStation,
//             date: data.travelDate,
//             seats: [data.bookedSeats],
//             amount: data.totalAmount,
//         });
//         res.json({ success: true });
//     } catch (error) {
//         console.error('Send email error:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // Update booked seats
// app.post('/api/updateBookedSeats', async (req, res) => {
//     const { trainId, seats, userEmail, amount } = req.body;

//     try {
//         const train = await Train.findById(trainId);
//         if (!train) return res.status(404).json({ message: 'Train not found' });

//         const alreadyBooked = train.bookedSeats.filter(seat => seats.includes(seat));
//         if (alreadyBooked.length > 0) {
//             return res.status(400).json({ message: `Seats already booked: ${alreadyBooked.join(', ')}` });
//         }

//         const availableSeats = train.availableSeats - train.bookedSeats.length;
//         if (seats.length > availableSeats) {
//             return res.status(400).json({ message: 'Not enough seats available' });
//         }

//         const updatedTrain = await Train.findByIdAndUpdate(
//             trainId,
//             { $addToSet: { bookedSeats: { $each: seats } } },
//             { new: true }
//         );

//         const bookingDetails = {
//             id: `BOOK${Date.now()}`,
//             trainName: updatedTrain.name,
//             from: updatedTrain.source,
//             to: updatedTrain.destination,
//             date: new Date().toISOString().split('T')[0],
//             seats,
//             amount
//         };

//         await sendEmailNotification(userEmail, bookingDetails);

//         res.json({ success: true, message: 'Booking confirmed', bookingDetails });
//     } catch (error) {
//         console.error('Booking error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });







const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

// Serve static frontend files (HTML, CSS, JS, etc.) from current directory
app.use(express.static(path.join(__dirname)));

// MongoDB connection (adjust your URI accordingly)
const dbURI = 'mongodb://localhost:27017/trainbooking'; // or your real connection string
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// ======= MONGOOSE SCHEMAS =======

// User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Train schema
const trainSchema = new mongoose.Schema({
    name: String,
    availableSeats: Number,
    timing: String,
    source: String,
    destination: String,
    bookedSeats: { type: [String], default: [] },
});
const Train = mongoose.model('Train', trainSchema);

// Ticket schema
const ticketSchema = new mongoose.Schema({
    name: String,
    address: String,
    contactNumber: String,
    age: Number,
    fromStation: String,
    toStation: String,
    travelDate: String,
    departureTime: String,
    totalAmount: String,
    bookingId: String,
    bookedSeats: String,
    userEmail: String,
}, { timestamps: true });
const Ticket = mongoose.model('Ticket', ticketSchema);

// ======= EMAIL SENDER =======
async function sendEmailNotification(userEmail, bookingDetails) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '02fe22bcs148klescet.ac.in@gmail.com',
            pass: 'nwye fpob gkij jhtr',
        },
    });

    const mailOptions = {
        from: '02fe22bcs148klescet.ac.in@gmail.com',
        to: userEmail,
        subject: 'Train Ticket Booking Confirmation',
        html: `
            <h1>GREENY TICKET Booking Confirmation</h1>
            <p>Your booking has been confirmed:</p>
            <ul>
                <li><strong>Booking ID:</strong> ${bookingDetails.id}</li>
                <li><strong>Train:</strong> ${bookingDetails.trainName}</li>
                <li><strong>From:</strong> ${bookingDetails.from}</li>
                <li><strong>To:</strong> ${bookingDetails.to}</li>
                <li><strong>Date:</strong> ${bookingDetails.date}</li>
                <li><strong>Seats:</strong> ${bookingDetails.seats.join(', ')}</li>
                <li><strong>Amount:</strong> $${bookingDetails.amount}</li>
            </ul>
        `
    };

    await transporter.sendMail(mailOptions);
}

// ======= ROUTES =======

// Register
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username or email already exists' });
        }
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.json({ success: true, message: 'Registration successful' });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        res.json({ success: true, username: user.username, email: user.email });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Login failed" });
    }
});

// Save Ticket
app.post('/api/saveTicket', async (req, res) => {
    try {
        const ticket = new Ticket(req.body);
        await ticket.save();
        res.status(201).json({ success: true, message: 'Ticket saved successfully' });
    } catch (error) {
        console.error("Save ticket error:", error);
        res.status(500).json({ success: false, message: 'Failed to save ticket' });
    }
});

// Send Email
app.post('/api/sendTicketEmail', async (req, res) => {
    try {
        const data = req.body;
        await sendEmailNotification(data.userEmail, {
            id: data.bookingId,
            trainName: data.trainName,
            from: data.fromStation,
            to: data.toStation,
            date: data.travelDate,
            seats: [data.bookedSeats],
            amount: data.totalAmount,
        });
        res.json({ success: true });
    } catch (error) {
        console.error('Send email error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update booked seats
app.post('/api/updateBookedSeats', async (req, res) => {
    const { trainId, seats, userEmail, amount } = req.body;

    try {
        const train = await Train.findById(trainId);
        if (!train) return res.status(404).json({ message: 'Train not found' });

        const alreadyBooked = train.bookedSeats.filter(seat => seats.includes(seat));
        if (alreadyBooked.length > 0) {
            return res.status(400).json({ message: `Seats already booked: ${alreadyBooked.join(', ')}` });
        }

        const availableSeats = train.availableSeats - train.bookedSeats.length;
        if (seats.length > availableSeats) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        const updatedTrain = await Train.findByIdAndUpdate(
            trainId,
            { $addToSet: { bookedSeats: { $each: seats } } },
            { new: true }
        );

        const bookingDetails = {
            id: `BOOK${Date.now()}`,
            trainName: updatedTrain.name,
            from: updatedTrain.source,
            to: updatedTrain.destination,
            date: new Date().toISOString().split('T')[0],
            seats,
            amount
        };

        await sendEmailNotification(userEmail, bookingDetails);

        res.json({ success: true, message: 'Booking confirmed', bookingDetails });
    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Example backend route (optional)
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from backend!' });
});

// Start the server
app.listen(port,'0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${port}`);
});

