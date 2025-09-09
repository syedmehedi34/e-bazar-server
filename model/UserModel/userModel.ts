
import mongoose from "mongoose";

const userModelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
   createdAt :{
    type: Date,
    default: Date.now
   }
})

const userModel = mongoose.models.user || mongoose.model('user', userModelSchema);

export default userModel