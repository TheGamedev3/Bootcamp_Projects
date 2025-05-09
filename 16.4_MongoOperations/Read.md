


### Read

1. Find all movies directed by Christopher Nolan.

```
db.movies.find({directors:'Christopher Nolan'})
db.movies.find({directors:'Christopher Nolan'}, {title: 1})

db.movies
  .find({ directors: 'Christopher Nolan' }, { title: 1, _id: 0 })
  .toArray()
  .map(doc => doc.title)
```

Output:
```
[
  'Following',
  'Memento',
  'Insomnia',
  'Batman Begins',
  'The Dark Knight',
  'The Prestige',
  'Interstellar',
  'The Dark Knight Rises',
  'Inception'
]
```

2.  Find movies that include the genre "Action" and sort (descending) them by year.

```
db.movies.find({ genres:'Action' }).sort({ year:-1 })

db.movies
  .find({ genres:'Action' }, { title: 1, year: 1, _id: 0 })
  .sort({ year:-1 })
  .toArray()
  .map(doc => `${doc.title} (${doc.year})`)
```

Output:
```
[
  'Halo: Nightfall (2014è)',
  'Falling Skies (2011è)',
  'Liquidation (2007è)',
  'Hellsing Ultimate (2006è2012)',
  'Hellsing Ultimate (2006è2012)',
  'Yukikaze (2002è)',
  'Babylon 5 (1994è1998)',
  'The Masked Saint (2016)',
  'Another World (2015)',
  'Hot Pursuit (2015)',
  'The Adderall Diaries (2015)',
  'SuperBob (2015)',
  'Spy (2015)',
  'Racing Extinction (2015)',

   & around two thousand more results...
]
```


3. Find movies with an IMDb rating greater than 8 and return only the title and IMDB information.


```
db.movies.find({ 'imdb.rating':{$gt:8} }, {title: 1, imdb: 1, _id:0})

db.movies.find({ 'imdb.rating':{$gt:8} }, {title: 1, imdb: 1, _id:0}).sort({'imdb.rating':-1}).limit(5).toArray()
```

Output:
```
[
  {
    title: 'Band of Brothers',
    imdb: { rating: 9.6, votes: 183802, id: 185906 }
  },
  {
    title: 'Planet Earth',
    imdb: { rating: 9.5, votes: 82896, id: 795176 }
  },
  {
    title: 'A Brave Heart: The Lizzie Velasquez Story',
    imdb: { rating: 9.4, votes: 45, id: 3735302 }
  },
  {
    title: 'The Civil War',
    imdb: { rating: 9.4, votes: 4624, id: 98769 }
  },
  {
    title: 'The Civil War',
    imdb: { rating: 9.4, votes: 4625, id: 98769 }
  }
]
```



4. Find movies that starred both "Tom Hanks" and "Tim Allen".

```
db.movies.find({ cast:{$all:['Tom Hanks', 'Tim Allen']} }, {title: 1, _id:0})
    .toArray()
    .map(doc => `${doc.title}`)
```

Output:
```
[
  'Toy Story',
  'Toy Story 2',
  'Toy Story 3',
  'Toy Story of Terror',
  'Toy Story That Time Forgot'
]
```


5. Find movies that starred both and only "Tom Hanks" and "Tim Allen".

```
db.movies.find({ cast:{$all:['Tom Hanks', 'Tim Allen'], $size:2} }, {title: 1, _id:0})
    .toArray()
    .map(doc => `${doc.title}`)
```

Output:
```
[
  'Toy Story',
  'Toy Story 2',
  'Toy Story 3',
  'Toy Story of Terror',
  'Toy Story That Time Forgot'
]
```


6. Find comedy movies that are directed by Steven Spielberg.

```
db.movies.find({ directors:'Steven Spielberg' }, {title:1, genres:1, _id:0})

db.movies.find({ directors:'Steven Spielberg', genres: 'Comedy' })
    .toArray()
    .map(doc => `${doc.title}`)
```

Output:
```
[ 'The Sugarland Express', 'Hook', 'The Terminal', 'The Terminal' ]
```
