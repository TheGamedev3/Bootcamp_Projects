

### Update

1. Add a new field "available_on" with the value "Sflix" to "The Matrix".

```
db.movies.find({ title:'The Matrix' }, {title:1})
db.movies.updateOne({ _id: ObjectId('573a139bf29313caabcf3d23')}, {$set:{available_on: 'Sflix'}})
db.movies.find({ title:'The Matrix' }, {title:1, available_on:1})
```

Output:
```
{
  _id: ObjectId('573a139bf29313caabcf3d23'),
  title: 'The Matrix',
  available_on: 'Sflix'
}
```


2. Increment the metacritic of "The Matrix" by 1.


```
db.movies.find({ title:'The Matrix' }, {title:1 , metacritic:1}) // 73
db.movies.updateOne({ _id: ObjectId('573a139bf29313caabcf3d23')}, { $inc: { metacritic: 1 } })
db.movies.find({ title:'The Matrix' }, {title:1, metacritic:1}) // 74
```


3. Add a new genre "Gen Z" to all movies released in the year 1997.

```
db.movies.updateMany({ year:1997 }, {$addToSet:{genres:"Gen Z"}})
db.movies.find({ genres:"Gen Z" }, {title:1 , _id:0, genres:1}).limit(5).toArray()
```

Output:
```
[
  {
    genres: [ 'Short', 'Animation', 'Gen Z' ],
    title: 'Estèria do Gato e da Lua'
  },
  { genres: [ 'Comedy', 'Romance', 'Gen Z' ], title: 'The Unfish' },
  { genres: [ 'Action', 'Comedy', 'Crime', 'Gen Z' ], title: 'Airbag' },
  {
    genres: [ 'Biography', 'Drama', 'Sport', 'Gen Z' ],
    title: 'Breaking the Surface: The Greg Louganis Story'
  },
  {
    genres: [ 'Comedy', 'Drama', 'Romance', 'Gen Z' ],
    title: 'Commandments'
  }
]
```


4. Increase IMDb rating by 1 for all movies with a rating less than 5.

```
db.movies.find({ 'imdb.rating':{$lt:5} }, {title:1,_id:0,'imdb.rating':1}).limit(5).toArray()
db.movies.updateMany({ 'imdb.rating':{$lt:5} }, { $inc: { 'imdb.rating': 1 } })
db.movies.find({ 'imdb.rating':{$lt:5} }, {title:1,_id:0,'imdb.rating':1}).limit(5).toArray()
```

Output:
```
[
  { title: 'Santa Claus', imdb: { rating: 3.4 } },
  {
    title: 'Schulmèdchen-Report 2. Teil - Was Eltern den Schlaf raubt',
    imdb: { rating: 4.9 }
  },
  { title: 'The Bees', imdb: { rating: 3.9 } },
  { title: 'Empire of the Ants', imdb: { rating: 4.8 } },
  { title: 'Exorcist II: The Heretic', imdb: { rating: 4.7 } }
]
```
