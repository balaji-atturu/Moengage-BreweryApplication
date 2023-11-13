const express = require("express")
// const collection = require("./mongo")
//const brewery = require("./mongo1")
const cors = require("cors")
const app = express()
app.use(express.urlencoded({ extended: true }));
const bodyParser = require('body-parser');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/moengage")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})
const brewerySchema =new  mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  brewery_type: {
    type: String,
  },
  address_1: {
    type: String,
  },
  address_2: {
    type: String,
  },
  address_3: {
    type: String,
  },
  city: {
    type: String,
  },
  state_province: {
    type: String,
  },
  postal_code: {
    type: String,
  },
  country: {
    type: String,
  },
  longitude: {
    type: String,
  },
  latitude: {
    type: String,
  },
  phone: {
    type: String,
  },
  website_url: {
    type: String,
  },
  state: {
    type: String,
  },
  street: {
    type: String,
  },
  rating:{
    type:Number,
  },
review:{
  type: String,
}
});

const Brewery = mongoose.model("moengage", brewerySchema);
const brew=new Brewery(
  {
    "id": "b54b16e1-ac3b-4bff-a11f-f7ae9ddc27e0",
    "name": "MadTree Brewing 2.0",
    "brewery_type": "regional",
    "address_1": "5164 Kennedy Ave",
    "address_2": null,
    "address_3": null,
    "city": "Cincinnati",
    "state_province": "Ohio",
    "postal_code": "45213",
    "country": "United States",
    "longitude": "-84.4137736",
    "latitude": "39.1885752",
    "phone": "5138368733",
    "website_url": "http://www.madtreebrewing.com",
    "state": "Ohio",
    "street": "5164 Kennedy Ave"
}
);

 Brewery.find({ })
.then(results => {
  console.log('Breweries in Ohio:', results);
})
.catch(err => {
  console.error('Error:', err);
});
module.exports=Brewery;
