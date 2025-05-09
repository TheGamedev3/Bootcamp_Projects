

### Aggregate

1. Aggregate movies to count how many were released each year and display from the earliest year to the latest.

```
db.movies.aggregate([
  { $group: { _id: "$year", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]).toArray().map(obj=>`${obj._id} (${obj.count})`)
```

Output:
```
[
  '1896 (2)',   '1903 (1)',   '1909 (1)',   '1911 (2)',   '1913 (1)',
  '1914 (3)',   '1915 (2)',   '1916 (2)',   '1917 (2)',   '1918 (1)',
  '1919 (1)',   '1920 (4)',   '1921 (5)',   '1922 (3)',   '1923 (2)',
  '1924 (6)',   '1925 (3)',   '1926 (6)',   '1927 (4)',   '1928 (8)',
  '1929 (7)',   '1930 (10)',  '1931 (20)',  '1932 (18)',  '1933 (20)',
  '1934 (23)',  '1935 (31)',  '1936 (30)',  '1937 (31)',  '1938 (38)',
  '1939 (20)',  '1940 (24)',  '1941 (24)',  '1942 (30)',  '1943 (32)',
  '1944 (23)',  '1945 (28)',  '1946 (33)',  '1947 (28)',  '1948 (56)',
  '1949 (52)',  '1950 (54)',  '1951 (54)',  '1952 (45)',  '1953 (64)',
  '1954 (47)',  '1955 (67)',  '1956 (67)',  '1957 (71)',  '1958 (75)',
  '1959 (71)',  '1960 (73)',  '1961 (68)',  '1962 (70)',  '1963 (69)',
  '1964 (86)',  '1965 (77)',  '1966 (87)',  '1967 (80)',  '1968 (88)',
  '1969 (105)', '1970 (120)', '1971 (106)', '1972 (121)', '1973 (111)',
  '1974 (103)', '1975 (107)', '1976 (116)', '1977 (122)', '1978 (127)',
  '1979 (130)', '1980 (164)', '1981 (168)', '1982 (176)', '1983 (160)',
  '1984 (197)', '1985 (188)', '1986 (188)', '1987 (222)', '1988 (251)',
  '1989 (231)', '1990 (223)', '1991 (236)', '1992 (268)', '1993 (272)',
  '1994 (304)', '1995 (371)', '1996 (405)', '1997 (439)', '1998 (511)',
  '1999 (512)', '2000 (578)', '2001 (609)', '2002 (620)', '2003 (600)',
  '2004 (677)', '2005 (710)', '2006 (773)', '2007 (806)', '2008 (882)',
  ... 30 more items
]
```

In summary, aggregation, loops through each element
The grouping, groups the elements together by the _id, which is the year
it totals it and stores the count, and gets sorted in ascending order


2. Calculate the average IMDb rating for movies grouped by director and display from highest to lowest.

```
db.movies.aggregate([
  { $group: { _id: "$directors", avgScore: { $avg: "$imdb.rating" } } },
  { $sort: { _id: -1 } },
  { $limit: 20 }
]).toArray().map(obj=>`${obj._id} (${obj.avgScore})`)
```

Output:
```
[
  'èzgèr Yildirim (6.633333333333333)',
  'èzer Kiziltan (7.5)',
  'èystein Karlsen (5.8)',
  'èva Gèrdos (6.9)',
  'ètienne Chatiliez (6.9)',
  'èsleik Engmark (6)',
  'èskar Thèr Axelsson (6.8)',
  'èskar Jènasson (6.8)',
  'èscar Aibar (5.6000000000000005)',
  'èron Gauder (6.1)',
  'èric Tessier (6.6)',
  'èngel Izquierdo (5.7)',
  'èmèr Atay,Selim Demirdelen,Kudret Sabanci,Yècel Yolcu,èmit ènal (7.4)',
  'èmile Gaudreault (6.8)',
  'èmer Vargi (8.2)',
  'èlèonore Faucher (7)',
  'èlvaro Fernèndez Armero (5.4)',
  'èlvaro Dèaz Lorenzo (5.2)',
  'èlvaro Brechner (6.8)',
  'èlie Chouraqui (7.2)'
]
```
