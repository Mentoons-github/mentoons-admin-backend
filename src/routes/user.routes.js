const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, "Name should be more than 3 characters"],
    maxlength: [50, "Name should be less than 50 characters"],
    required: [true, "username is a required field"],
    validate: {
      validator: (value) => /^[a-zA-Z\s]+$/.test(value),
      message: "Name should contain only letters and spaces",
    },
  },
  email: {
    type: String,
    required: [true, "email is a required field"],
    validate: {
      validator: (value) => {
        validator.isEmail(value);
      },
      message: "please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "password is a required field"],
    validate: {
      validator: function (value) {
        const errors = [];
        if (!/[A-Z]/.test(value)) {
          errors.push("Password must contain atleast one uppercase letter");
        }
        if (!/[a-z]/.test(value)) {
          errors.push("Password must contain atlease one lowercase letter");
        }
        if (!/[0-9]/.test(value)) {
          errors.push("Password must contain atleast one number");
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          errors.push("Password must contain atleast one special character");
        }
        if (errors.length > 0) {
          throw new Error(errors.join(", "));
        }
        return true;
      },
      message: (props) => props.reason.message,
    },
  },
});

const User = mongoose.model("User", userSchema);
