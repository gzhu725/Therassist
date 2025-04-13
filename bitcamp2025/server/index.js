const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// the thing that connects to the mongodb database
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());



// MongoDB connection
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// schema
const clientSchema = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    therapist_name: String,
    summary: String,
    journals: [String],
    sessions: [String]
})
const therapistSchema = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    client_list: [String]
})

const ClientModel = mongoose.model('clients', clientSchema);
const TherapistModel = mongoose.model('therapists', therapistSchema);

// GET all clients
app.get("/clients/", async (req, res) => {
    const data = await ClientModel.find({}) // all clients
    res.json({success: true, data: data })
});
app.get("/therapists/", async (req, res) => {
    const data = await TherapistModel.find({}) // all therapists
    res.json({success: true, data: data })
});

// get all clients for a therapist
app.get("/getClients/:therapistName", async (req, res) => {
    const therapistName = req.params.therapistName;
    try{
        const clients = await ClientModel.find({ therapist_name: therapistName })
        res.send(clients);

    } catch (err) {
        console.error("Error fetching clients by therapist name:", err);
        res.status(500).json({ success: false, error: err.message });
  }
});

// get data for specific client 
// sessions
app.get("/clients/getData/:clientName", async (req, res) => {
    const client_name = req.params.clientName;
    // 
    try{
        const client = await ClientModel.findOne({ name: client_name }).select("sessions");
        if (!client) {
            return res.status(404).json({ success: false, message: "Client not found" });
        }
        res.send( client.sessions );

    } catch (err) {
        console.error("Error fetching data for client:", err);
        res.status(500).json({ success: false, error: err.message });
  }
});

// get summary for client 
app.get("/clients/getSummary/:clientName", async (req, res) => {
    const client_name = req.params.clientName;
    try{
        const client_summary = await ClientModel.findOne({ name: client_name }).select("summary -_id");
        if (!client_summary) {
            return res.status(404).json({ success: false, message: "Client summary not found" });
        }
        const summaryvalue = client_summary.summary;
        res.send(summaryvalue);

    } catch (err) {
        console.error("Error fetching summary for client:", err);
        res.status(500).json({ success: false, error: err.message });
  }
});


// get journals
app.get("/clients/getJournals/:clientName", async (req, res) => {
    const client_name = req.params.clientName;
    // 
    try{
        const client = await ClientModel.findOne({ name: client_name }).select("journals");
        if (!client) {
            return res.status(404).json({ success: false, message: "Client not found" });
        }
        const journals = client.journals;
        res.json(journals);
    } catch (err) {
        console.error("Error fetching data for client:", err);
        res.status(500).json({ success: false, error: err.message });
  }
});




// add data 
app.post("/clients/create", async (req, res) => {
    console.log(req.body);
    const data = new ClientModel(req.body)
    await data.save()
    res.send({success: true})
})
app.post("/therapists/create", async (req, res) => {
    console.log(req.body);
    const data = new TherapistModel(req.body)
    await data.save()
    res.send({success: true})
})

// PUT data to client 
app.put("/clients/update", async (req, res) => {
    try {
        // body includes name and img_data
        const name = req.body.name;
        const newData = req.body.img_data;
        console.log(req.body)
        
        await ClientModel.findOneAndUpdate({
            name: name,
        }, {
            $addToSet: {sessions: newData}
        })
        res.send({success: true, message: "data updated"})
    } catch  (err) {
        console.error("PUT /update error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});
// PUT data to client 
app.put("/clients/updateJournals", async (req, res) => {
    try {
        // body includes name and journal entry
        const name = req.body.name;
        const newData = req.body.journal_entry;
        // console.log(req.body)
        
        await ClientModel.findOneAndUpdate({
            name: name,
        }, {
            $addToSet: {journals: newData}
        })
        res.send({success: true, message: "data updated"})
    } catch  (err) {
        console.error("PUT update journals error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// PUT summary to client
app.put("/clients/updateSummary", async (req, res) => {
    try {
        // body includes client name and new summary
        const name = req.body.name;
        const newData = req.body.summary;
        console.log(req.body)
        
        await ClientModel.findOneAndUpdate({
            name: name,
        }, {
            $set: {"summary": newData}
        })
        res.send({success: true, message: "summary updated"})
    } catch  (err) {
        console.error("put summary error:", err);
        res.status(500).json({ success: false, error: err.message });
    }

});

app.post('/postUser', async (req, res) => {
    try {
      const newUser = new UserModel({ name: req.body });
      await newUser.save();

      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  




// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
