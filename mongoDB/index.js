const mongodb = require('mongodb');
const { MongoClient } = mongodb;

require('dotenv').config();

const main = async () => {
	const client = await MongoClient.connect(process.env.MONGODB_URL, { useUnifiedTopology: true });
	console.log('Successfully connected to DB');

	const db = client.db(process.env.DB_NAME);
	const test_collection = db.collection("test_collection");

	// await test_collection.insertMany([
	// 	{
	// 		username: "Tesla",
	// 		email: "tesla@email.com",
	// 		age: 18,
	// 		accepted: true
	// 	}
	// ]);

	console.log(
    await test_collection.find({ $or: [{ username: "Mango" }, { username: "Tesla" }] }).toArray()
  );
}

main();
