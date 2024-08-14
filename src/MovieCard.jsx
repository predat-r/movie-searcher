import React from "react";

function MovieCard({ title, releaseYear, plot, image}) {
  return (
    <div className="bg-indigo-100  shadow-xl rounded-lg  h-2/4 flex-shrink-0 flex flex-row w-full mt-6 p-5">
      <img className="h-full w-52 box-border" src={image} alt="" />
      <div className=" ml-6 flex flex-col w-3/4 h-full">
        <h1 className="font-inter font-bold text-2xl text-blue-950">{title}</h1>
        <div className="w-12  mt-1 text-blue-200 pt-1 h-6 text-center text-xs rounded-md bg-indigo-600">
          {releaseYear}
        </div>
        <p className="font-inter font-light text-blue-950  mt-5">{plot}</p>
      </div>
    </div>
  );
}

export default MovieCard;
