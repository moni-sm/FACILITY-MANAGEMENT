import mongoose from 'mongoose';

//define the schema for a service
const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim:true,
  },
  description: {
    type: String,
    required: true,
    trim:true,
  },
  price: {
    type: Number,
    required: true,
    min:0,
  },
  category: {
    type: String,
    required: true,
    trim:true,
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt:{
    type: Date,
    default: Date.now,
  },

},{timestamps:true});//automaticall adds reatedat and updatedAt fields

const Service = mongoose.model('Service',serviceSchema);
export default Service;