db.movies.aggregate([

 {$match: {
     languages: {$elemMatch : {$eq: "English"}},
     "imdb.rating":{$gte: 1},
     "imdb.votes":{$gte: 1},
     year: {$gte: 1990}
 }},
 {$project:
      {"imdb.rating": 1,title:1}
     
  },
 {$addFields:
	 {scaled_votes: {$add: [1, {$multiply: [9, {$divide: [{$subtract:["$imdb.votes",5]},{$subtract: [1521105,5]}]}]}]},
	       
	 }
   
 },
 {$addFields: 
    {           
		normalized_rating: {$avg:["$scaled_votes","$imdb.rating"]}
	}
  },
  {$project: {scaled_votes: 0}},
  {$sort: {normalized_rating: 1}},
  {$limit: 1}
  

])

