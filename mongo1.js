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
// const brew=new Brewery(
//   {
//     "id": "b54b16e1-ac3b-4bff-a11f-f7ae9ddc27e0",
//     "name": "MadTree Brewing 2.0",
//     "brewery_type": "regional",
//     "address_1": "5164 Kennedy Ave",
//     "address_2": null,
//     "address_3": null,
//     "city": "Cincinnati",
//     "state_province": "Ohio",
//     "postal_code": "45213",
//     "country": "United States",
//     "longitude": "-84.4137736",
//     "latitude": "39.1885752",
//     "phone": "5138368733",
//     "website_url": "http://www.madtreebrewing.com",
//     "state": "Ohio",
//     "street": "5164 Kennedy Ave"
// }
// );
// brew.save()
// .then(results => {
//   console.log('Breweries in Ohio:', results);
// })
// .catch(err => {
//   console.error('Error:', err);
// });
// Brewery.insertMany([
 
 
//   {
//     "id": "5128df48-79fc-4f0f-8b52-d06be54d0cec",
//     "name": "(405) Brewing Co",
//     "brewery_type": "micro",
//     "address_1": "1716 Topeka St",
//     "address_2": null,
//     "address_3": null,
//     "city": "Norman",
//     "state_province": "Oklahoma",
//     "postal_code": "73069-8224",
//     "country": "United States",
//     "longitude": "-97.46818222",
//     "latitude": "35.25738891",
//     "phone": "4058160490",
//     "website_url": "http://www.405brewing.com",
//     "state": "Oklahoma",
//     "street": "1716 Topeka St"
// },
// {
//     "id": "9c5a66c8-cc13-416f-a5d9-0a769c87d318",
//     "name": "(512) Brewing Co",
//     "brewery_type": "micro",
//     "address_1": "407 Radam Ln Ste F200",
//     "address_2": null,
//     "address_3": null,
//     "city": "Austin",
//     "state_province": "Texas",
//     "postal_code": "78745-1197",
//     "country": "United States",
//     "longitude": null,
//     "latitude": null,
//     "phone": "5129211545",
//     "website_url": "http://www.512brewing.com",
//     "state": "Texas",
//     "street": "407 Radam Ln Ste F200"
// },
// {
//     "id": "34e8c68b-6146-453f-a4b9-1f6cd99a5ada",
//     "name": "1 of Us Brewing Company",
//     "brewery_type": "micro",
//     "address_1": "8100 Washington Ave",
//     "address_2": null,
//     "address_3": null,
//     "city": "Mount Pleasant",
//     "state_province": "Wisconsin",
//     "postal_code": "53406-3920",
//     "country": "United States",
//     "longitude": "-87.88336350209435",
//     "latitude": "42.72010826899558",
//     "phone": "2624847553",
//     "website_url": "https://www.1ofusbrewing.com",
//     "state": "Wisconsin",
//     "street": "8100 Washington Ave"
// }
// ])
// .then(results => {
//     console.log('Breweries in Ohio:', results);
//   })
//   .catch(err => {
//     console.error('Error:', err);
//   });
  // Brewery.deleteMany(
  //   {})
  // .then(results => {
  //     console.log('Breweries in Ohio:', results);
  //   })
  //   .catch(err => {
  //     console.error('Error:', err);
  //   });
//  Brewery.find({ })
// .then(results => {
//   console.log('Breweries in Ohio:', results);
// })
// .catch(err => {
//   console.error('Error:', err);
// });
module.exports=Brewery;
