const Cryptr = require('cryptr');
const user_Signup = require('../model/models.js');

exports.Dao_index = async function (req, res) {
  try {
    const user = await user_Signup.get();
    res.json({
      status: "Success",
      message: "Got user details Successfully",
      data: user
    });
  } catch (err) {
    res.json({
      status: "Error",
      message: err
    });
  }
};

exports.Dao_view = async function (req, res) {
  try {
    const user = await user_Signup.find({ email: req.params.email });
    res.json({
      message: "User Signup Details",
      data: user
    });
  } catch (err) {
    res.send(err);
  }
};

exports.Dao_update = async function (req, res) {
  try {
    const user = await user_Signup.findOne({ email: req.params.useremail });
    if (!user) {
      return res.json({
        status: "Error",
        message: "User not found"
      });
    }
    // const cryptr = new Cryptr('Employee');
    // const enc = cryptr.encrypt(req.body.password);
    // const dec = cryptr.decrypt(enc);

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

    await user.save();
    res.json({
      message: "*** User details updated successfully ***",
      data: user
    });
  } catch (err) {
    res.json({
      status: "Error",
      message: err
    });
  }
};

exports.Dao_Delete = async function (req, res) {
  try {
    const user = await user_Signup.deleteOne({ email: req.params.useremail });
    res.json({
      status: "Success",
      message: "*** User Deleted Successfully ***",
      data: user
    });
  } catch (err) {
    res.json({
      status: "Error",
      message: err
    });
  }
};
