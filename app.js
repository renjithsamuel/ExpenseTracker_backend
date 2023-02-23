const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const {getExpenses, getExpensesById, postExpense, deleteExpenseById, updateElementById, checkAdmin, loggerFunc, deleteExpenseBody, updateTotalBudget,getTotalBudget} = require('./controller/expenseController');
const app = express();
app.use(express.json())
app.use(helmet());
app.use(cors());
app.use(loggerFunc);

let mongodbString = 'mongodb://localhost:27017/ExpenseTracker';

mongoose.set("strictQuery",false);
mongoose.connect(mongodbString).then(()=>console.log('connected!!'));

// const db = mongoose.connection;
// db.on("error",console.error.bind(console,"connection error : "));
// db.once("open",function(){
//     console.log("connected successfully!!")
// });

app.get('/api/v1/expenses',getExpenses);
app.get('/api/v1/expense/:id',getExpensesById);
app.post('/api/v1/expenses',postExpense);
app.delete('/api/v1/expense/:id',deleteExpenseById);
app.delete('/api/v1/expenses',deleteExpenseBody);
app.put('/api/v1/expense/:id',updateElementById);
app.get('/api/v1/totalbudget',getBudget);
app.post('/api/v1/totalbudget', postBudget);

app.put('/api/v1/totalbudget',updateBudget);


app.get('/api/v1/health',(req,res)=>{
    let message = {message : "Its working perfectly",status: "success"};
    res.status(200).json(message);
});
let port = 80;
app.listen(port,()=>{
    console.log(`Server started at ${port}`);
})
