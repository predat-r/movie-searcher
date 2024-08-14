import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

function ResultContainer({ Result }) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults(Result);


    
  }, [Result]);

  return (
    <div className="flex flex-col w-[90vw] h-screen overflow-scroll p-5 mt-2">
      {searchResults &&
        searchResults.map((item, index) => (
          <MovieCard
            key={index}
            title={item.title}
            releaseYear={item.releaseYear}
            plot={item.plot}
            image ={item.image}
            
           
            index={index}
          />
        ))}
    </div>
  );
}

export default ResultContainer;
