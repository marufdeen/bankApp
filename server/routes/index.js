import express from 'express';
import user from '../controller/user';
import transaction from '../controller/transaction';
import verifyToken from '../middlewares/verifyToken';
import { isUserValid } from '../middlewares/checkAuth';
import { validateSignup, validateSignin, validateEdit } from '../middlewares/userCredentials';
import { validateAmount, checkAmountAndBalance, checkAccountNumber } from '../middlewares/transactionCredentials';
import User from '../controller/user';
const app = express.Router();

// User Routes
app.post('/register', validateSignup, user.userRegister);
app.post('/login', validateSignin, user.userLogin);
app.put('/edit', verifyToken, isUserValid, validateEdit, user.editProfile);
app.get('/users', user.getAllUsers);
app.get('/users/:userId', user.getSingleUser);
app.get('/balance', verifyToken, isUserValid, User.checkBalance);

// Transaction Routes
app.post('/deposit', verifyToken, isUserValid, validateAmount, transaction.depositMoney);
app.post('/withdraw', verifyToken, isUserValid, checkAmountAndBalance, transaction.withdrawMoney);
app.post('/transfer', verifyToken, isUserValid, checkAmountAndBalance, checkAccountNumber, transaction.transferMoney)

export default app
