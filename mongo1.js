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
    "id": "34e8c68b-6146-453f-a4b9-1f6cd99a5ada",
    "name": "1 of Us Brewing Company",
    "brewery_type": "micro",
    "address_1": "8100 Washington Ave",
    "address_2": null,
    "address_3": null,
    "city": "Mount Pleasant",
    "state_province": "Wisconsin",
    "postal_code": "53406-3920",
    "country": "United States",
    "longitude": "-87.88336350209435",
    "latitude": "42.72010826899558",
    "phone": "2624847553",
    "website_url": "https://www.1ofusbrewing.com",
    "state": "Wisconsin",
    "street": "8100 Washington Ave"
}
);
// brew.save()
// .then(results => {
//   console.log('Breweries in Ohio:', results);
// })
// .catch(err => {
//   console.error('Error:', err);
// });
//  Brewery.findOneAndDelete({ state: 'Ohio' })


// Brewery.find({ state: 'Texas' })
// .then(results => {
//   console.log('Breweries in Ohio:', results);
// })
// .catch(err => {
//   console.error('Error:', err);
// });
module.exports=Brewery;
