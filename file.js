const fs = require("fs");
const http = require("http");

// fs.readFile("./sample.json", "utf8", (err, data) => {
//   if (err) {
//     console.log("Cannot Open File");
//     return;
//   }
//   const jsonData = JSON.parse(data);
//   const filteredData = jsonData.filter((user) => user.amount > 1500);
//   fs.writeFile("./data.json", JSON.stringify(filteredData), (err) => {
//     if (err) {
//       console.log("Error Writing File");
//       return;
//     }
//   });
// });

