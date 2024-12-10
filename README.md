
# MongoDB Aggregation Queries

## Problem Statement

This project involves building aggregation pipelines for the MongoDB sample dataset (`mflix` database). The goal is to solve a series of queries using MongoDB aggregation operations to fetch and manipulate data. 

## Questions

### Question 1:
Write an aggregation pipeline to find the title of the movie along with all comments associated with it from the `movies` collection.

**Output Schema**:
```json
{
  "title": "string",
  "comments": [
    {
      "name": "string",
      "email": "string",
      "text": "string",
      "date": "ISODate"
    }
  ]
}
```

### Question 2:
Write an aggregation pipeline to count the number of comments for each movie, and include the movie title and the count of comments.

**Output Schema**:
```json
{
  "title": "string",
  "commentCount": "integer"
}
```

### Question 3:
Write an aggregation pipeline to find the top 5 movies with the highest average IMDb rating, including the title, IMDb rating, and total number of comments for each movie.

**Output Schema**:
```json
{
  "title": "string",
  "imdbRating": "double",
  "commentCount": "integer"
}
```

### Question 4:
Write an aggregation pipeline to get a list of all unique cast members across all movies and count how many movies each cast member appeared in.

**Output Schema**:
```json
{
  "castMember": "string",
  "movieCount": "integer"
}
```

### Question 5:
Write an aggregation pipeline to find movies released before (not including) 1950 that have an average IMDb rating of 7.0 or higher. Include the title, IMDb rating, release year, genres, and the first 2 comments (if any) for each movie.

**Output Schema**:
```json
{
  "title": "string",
  "releaseYear": "integer",
  "genres": ["string"],
  "imdbRating": "double",
  "comments": [
    {
      "name": "string",
      "text": "string"
    }
  ]
}
```

## Testing the Aggregation Pipelines

To test the aggregation queries, I used the following script that connects to a MongoDB Atlas cluster and executes the aggregation pipeline defined in a JSON file.

### Script: `app.js`

```javascript
const fs = require('fs');
const { MongoClient } = require('mongodb');

// add MONGO_URI in your env file 
const uri = process.env.MONGO_URI;
const dbName = 'sample_mflix';    

async function testAggregation() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  // Load the aggregation pipeline from the JSON file (Replace the File name for checking different files)
  const pipeline = JSON.parse(fs.readFileSync('5.json', 'utf-8'));

  // Execute the aggregation pipeline
  const result = await db.collection('movies').aggregate(pipeline).toArray();
  
  // Convert the result to a more readable format (stringifying the _id)
  const resultWithStringId = result.map(item => ({
    ...item,
    _id: item._id.toString()
  }));

  // Print the result in a pretty format
  console.log(JSON.stringify(resultWithStringId, null, 2));

  await client.close();
}

testAggregation().catch(console.error);
```

### Explanation of the Script

- This script reads the aggregation pipeline from the Json files.
- It connects to MongoDB Atlas using the provided connection string and runs the aggregation pipeline on the `movies` collection.
- The result is processed to stringify the `_id` field for readability.
- Finally, the result is logged in a pretty-printed format for inspection.

## Conclusion

This project provides hands-on experience in building complex MongoDB aggregation queries while considering performance optimization. You will be working with data joining, filtering, sorting, and projecting, which are key operations in data processing with MongoDB.
