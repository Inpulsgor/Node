const mongodb = require('mongodb');
const { MongoClient } = mongodb;

const DB_NAME = 'test_db';

const main = async () => {
	const client = await MongoClient.connect(MONGO_DB_URL, {
		// useNewUrlParser: true,
		useUnifiedTopology: true
	});
	console.log('Successfully connected to DB');

	const db = client.db(DB_NAME);
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
