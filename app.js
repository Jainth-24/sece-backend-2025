var express = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const app = express();
//Middleware
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/expense").then(() => {
  console.log("connected to database");
});

const expenseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
});
const Expenses = mongoose.model("Expenses", expenseSchema);

app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expenses.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
});
app.get("/api/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expenses.findOne({ id });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Error in fetching expenses" });
  }
});

app.post("/api/expenses", async (req, res) => {
  const { title, amount } = req.body;
  try {
    const newExpense = new Expenses({
      id: uuidv4(),
      title: title,
      amount: amount,
    });
    const savedExpense = await newExpense.save();
    res.status(200).json(savedExpense);
  } catch (err) {
    res.status(500).json({ message: "Error in creating expense" });
  }
});

app.put("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  const { title, amount } = req.body;
  try {
    const updateExpense = await Expenses.findOneAndUpdate(
      { id },
      { title, amount }
    );
    if (!updateExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Updated Sucessfully !" });
  } catch (error) {
    res.status(500).json({ message: "Error in updating expense" });
  }
});
app.delete("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedExpense = await Expenses.findOneAndDelete({ id });
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error in deleting expense" });
  }
});

// const students = [
//   {
//     name: "Suriya",
//     age: 20,
//     roll: 1,
//   },
//   { name: "Vijay", age: 21, roll: 2 },
// ];

// app.get("/api/sayhello", (req, res) => {
//   res.send("Hello CCE");
//   res.end();
// });

// app.get("/api/students", (req, res) => {
//   res.status(200).json(students);
// });
// app.get("/api/students/:rollno", (req, res) => {
//   const { rollno } = req.params;
//   const student = students.find((student) => student.roll == rollno);
//   if (!student) {
//     res.status(404).json({ message: "Student not found" });
//   } else {
//     res.status(200).json(student);
//   }
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
