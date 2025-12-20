import productModel from "../models/product.js";
import { v2 as cloudinary } from "cloudinary";

const AddProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );
    let imageUrls = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = new productModel({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      size: sizes ? JSON.parse(sizes) : [],
      bestseller: bestseller === "true" ? true : false,
      image: imageUrls,
      date: Date.now(),
    });
    console.log(productData);
    const product = new productModel(productData);
    await product.save();

    res.status(200).json({ message: "product successfully added" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "some thing went wrong", error: error.message });
  }
};

const RemoveProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ message: "remove producct  succesfullly" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "some thing went wrong", error: error.message });
  }
};

const Singleproduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.status(200).json({ success :true , product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "some thing went wrong", error: error.message });
  }
};

const ListProduct = async (req, res) => {
  try {
    const product = await productModel.find({});
    res.status(200).json({success: true, message: "list of product successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "some thing went wrong", error: error.message });
  }
};

export { AddProduct, RemoveProduct, Singleproduct, ListProduct };
