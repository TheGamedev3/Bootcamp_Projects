

### Delete

1. Delete a comment with a specific ID.

```
db.comments.find({ _id:ObjectId('5a9427648b0beebeb69579e7') })
db.comments.deleteOne({ _id:ObjectId('5a9427648b0beebeb69579e7') })
db.comments.find({ _id:ObjectId('5a9427648b0beebeb69579e7') })
```


2. Delete all comments made for "The Matrix".

```
db.movies.find({ title:'The Matrix' }) // _id: ObjectId('573a139bf29313caabcf3d23')
db.comments.find({ movie_id: ObjectId('573a139bf29313caabcf3d23') })
db.comments.deleteMany({ movie_id: ObjectId('573a139bf29313caabcf3d23') })
db.comments.find({ movie_id: ObjectId('573a139bf29313caabcf3d23') })
```


3. Delete all movies that do not have any genres.

```
db.movies.find({ $or:[{genres:{$exists:false}},{genres:{$size:0}}] })
db.movies.deleteMany({ $or:[{genres:{$exists:false}},{genres:{$size:0}}] })
db.movies.find({ $or:[{genres:{$exists:false}},{genres:{$size:0}}] })
```

