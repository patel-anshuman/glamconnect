const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    // isAdmin:{type:Boolean, default:true},
    role: { type: String, default: "user", enum: ["admin", "user"] },
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
}

)


const UserModel = mongoose.model("user", userSchema)

module.exports = UserModel