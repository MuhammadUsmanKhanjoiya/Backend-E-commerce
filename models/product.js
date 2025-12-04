import express from "express";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description:{ type: String, required: true },
  image: { type: Array, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  size: { type: Array, required: true },
  bestseller: { type: String, required: true },
   
},{timestamps:true});

const productModel = mongoose.model('products',productSchema);
export default  productModel;