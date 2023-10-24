const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    Firstname: {
        required: true,
        type: String
    },
    Lastname: {
        required: true,
        type: String
    },
    Empid: {
        required: false,
        type: String
    },
    Empemail: {
        type: String,
        required: true,
        unique: true
    },
    EmpContactNo: {
        required: true,
        type: Number,
        length: 10
    },
    AddressLine1: {
        required: false,
        type: String
    },
    AddressLine2: {
        required: false,
        type: String
    },
    Pincode: {
        required: true,
        type: Number
    },
    City: {
        required: true,
        type: String
    },
    State: {
        required: true,
        type: String
    },
    BankName: {
        required: true,
        type: String
    },
    Ifsc: {
        required: true,
        type: Number
    },
    AccountNo: {
        required: true,
        type: Number
    },
    Salary: {
        required: true,
        type: Number
    },
    BankBranch :{
        required : true,
        type : String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

Schema.path('Empemail').validate(async (Empemail) => {
    const emailCount = await mongoose.models.list.countDocuments({ Empemail });
    return !emailCount;
}, 'Empemail already exists');

const user_Signup = mongoose.model('list', Schema);

module.exports.get = async (limit) => {
    try {
        const users = await user_Signup.find().limit(limit);
        return users;
    } catch (error) {
        throw error;
    }
};
