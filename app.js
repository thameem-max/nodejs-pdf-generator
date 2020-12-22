let express = require("express");
let app = express();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
const fs = require('fs'); 
let students = [
   {name: "Joy",
    email: "joy@example.com",
    city: "New York",
    country: "USA"},
   {name: "John",
    email: "John@example.com",
    city: "San Francisco",
    country: "USA"},
   {name: "Clark",
    email: "Clark@example.com",
    city: "Seattle",
    country: "USA"}
];
app.get("/generateReport", (req, res) => {
    ejs.renderFile(path.join(__dirname, './views/', "report-template.ejs"), {students: students}, (err, data) => {
    if (err) {
          res.send(err);
    } else {
        let options = {
            "height": "11.25in",
            "width": "8.5in",
            "header": {
                "height": "20mm"
            },
            "footer": {
                "height": "20mm",
            },
        };
        pdf.create(data, options).toFile("report.pdf", function (err, data) {
            if (err) {
                res.send(err);
            } else {
                var data =fs.readFileSync(path.join(__dirname, "report.pdf"));
                res.contentType("application/pdf");
                res.send(data);
            }
        });
    }
});
})
app.listen(3000);