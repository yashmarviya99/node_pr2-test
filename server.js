const express = require("express")

const app = express();

app.use(express.json());

let users = [
    { id: 1, name: "Yash", age: 19 },
    { id: 2, name: "Dwarkesh", age: 20 },
];

// ALL DATA : GET
app.get("/all-users", (req, res) => {
    return res.status(200).json({ mesage: "User fatch Succesfully", users })
});


// ADD TO DATA : POST
app.post("/add-users", (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age
    };
    users.push(newUser)
    return res.status(201).json({ mesage: "User addeed sucsesfiully", newUser });
});


// SPECIFIC USER FATCH ONLY : GET
app.get("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((userId) => userId.id === id);
    return res.status(200).json({ mesage: "User Data fatched", user });
});


// UPDATE : PATCH
app.patch("/update/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((userId) => userId.id === id);
    user.name = req.body.name;
    return res.status(200).json({ user })
});


// FULL OBJECT UPDATE : PUT
app.put("/update-user/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({
            mesage: "User not Found"
        });
    };

    users[userIndex] = {
        id: id,
        name: req.body.name,
        age: req.body.age
    };

    return res.status(200).json({mesage: "User updated sucesfully",user: users[userIndex]});
});


// DELETE USER : DELETE
app.delete("/delete/:id",(req,res)=>{
    const id =  parseInt(req.params.id);
    users = users.filter((userId)=>userId.id !== id);
    return res.status(201).json({mesage: "User Deleted", users});
});



app.listen(5000, () => {
    console.log("Server is working");
});