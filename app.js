const fs = require('fs');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const dbName = 'sample_mflix';    

async function testAggregation() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  const pipeline = JSON.parse(fs.readFileSync('2.json', 'utf-8'));
  const result = await db.collection('movies').aggregate(pipeline).toArray();
  // Converted the result to a more readable format by stringifying the _id and pretty-printing the result
  const resultWithStringId = result.map(item => ({
    ...item,
    _id: item._id.toString() 
  }));

  // Printing the result in a pretty format
  console.log(JSON.stringify(resultWithStringId, null, 2));

  await client.close();
}

testAggregation().catch(console.error);
