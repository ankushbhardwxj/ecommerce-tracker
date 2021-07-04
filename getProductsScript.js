const axios = require("axios");
const fs = require("fs");

async function getProds() {
  let res = await axios({
    method: "GET",
    url: "https://fakestoreapi.com/products/",
  });
  let jsonString = JSON.stringify(res.data);
  let writeData = `let products = ${jsonString}`;
  fs.writeFile("Products.js", writeData, (err) => {
    if (err) throw err;
  });
}

getProds();
