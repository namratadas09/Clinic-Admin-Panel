const express = require("express");
const app = express();

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
	.connect(db.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to the database!" + db.url);
	})
	.catch((err) => {
		console.log("Cannot connect to the database!", err);
		process.exit();
	});
require("./app/routes/user.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/patient.routes")(app);
require("./app/routes/clinic.routes")(app);
require("./app/routes/appointment.routes")(app);
require("./app/routes/discount.routes")(app);
require("./app/routes/doctor.routes")(app);


const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

module.exports = server;
