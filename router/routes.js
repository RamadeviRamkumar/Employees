let router = require('express').Router();
const Cryptr = require('cryptr');
var cryptr = new Cryptr("Employee")

router.get('/api',function(req,res){
    res.json({
        status : 'API Works',
        message : 'Welcome to User Signin/Signup API'
    });
});

const user_Signup = require('../model/models.js');

router.post('/signin',(req,res) => {
    user_Signup.findOne({ Empemail : req.body.Empemail }, function(err,user){
        
        if (user === null) {
            return res.status(400).send({
                message : "The given User cannot be found."
            })
        }
        else {
            var dec = cryptr.decrypt(user.password);
            var enc = cryptr.encrypt(req.body.password);
            user.save(function (err){
            if (req.body.password === dec) {
                return res.status(201).send({
                    message : "Signin Successfully",
                    data: {
                        Empemail : req.body.Empemail,
                        UserName : req.body.UserName,
                        password  : enc
                    }
                })
            }
            else {
                return res.status(400).send({
                    message : "Password incorrect"
                });
            }
        })
        }
        
    })    
    
});
const emailCount = require('../model/models.js');

    router.post('/details',async (req,callback) => {
        var cryptr = new Cryptr('Employee');
        // var enc = cryptr.encrypt(req.body.password);
        // var dec = cryptr.decrypt(enc);
    
        var user = new user_Signup();
        user.Firstname = req.body.Firstname;
    user.Lastname = req.body.Lastname;
    user.Empid = req.body.Empid;
    user.Empemail = req.body.Empemail;
    user.EmpContactNo = req.body.EmpContactNo;
    user.AddressLine1 = req.body.AddressLine1;
    user.AddressLine2 = req.body.AddressLine2;
    user.Pincode = req.body.Pincode;
    user.City = req.body.City;
    user.State = req.body.State;
    user.BankName = req.body.bankName;
    user.Ifsc = req.body.Ifsc;
    user.AccountNo = req.body.AccountNo;
    user.BankBranch = req.body.BankBranch;
    user.Salary = req.body.Salary;
    user.password = enc;

       await user.save(function (err) {              
                if(err)        
                    callback.json("User Already Registered")    
                else {                    
                callback.json({
                message : "*** Employee Details ***",
                 data: {
                    Firstname : req.body.Firstname,
                    Lastname : req.body.Lastname,
                    Empid : req.body.Empid,
                    EmpContactNo : req.body.EmpContactNo,
                    Empemail : req.body.Empemail,
                    AddressLine1 : req.body.AddressLine1,
                    AddressLine2 : req.body.AddressLine2,
                    Pincode : req.body.Pincode,
                    City : req.body.City,
                    State : req.body.State,
                    BankName : req.body.BankName,
                    Ifsc : req.body.Ifsc,
                    AccountNo : req.body.AccountNo,
                    BankBranch : req.body.BankBranch,
                    Salary : req.body.Salary,     
                }
                })            
            }
        })       
        }) 

var Controller = require('../controller/controller.js');
router.route('/Employees')
.get(Controller.index)

router.route('/Employees/:Empemail')
.get(Controller.view)
.patch(Controller.update)
.put(Controller.update)
.delete(Controller.Delete);

module.exports = router;
