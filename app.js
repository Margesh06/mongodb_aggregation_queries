const fs = require('fs');
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://admin-Margesh:margesh@cluster0.dgnbguu.mongodb.net/sample_mflix';
const dbName = 'sample_mflix';    

async function testAggregation() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  const pipeline = JSON.parse(fs.readFileSync('5.json', 'utf-8'));
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
