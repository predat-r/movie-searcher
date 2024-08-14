import React, { useEffect } from "react";
import SearchBar from "./SearchBar";
import SortingButton from "./SortingButton";
import ResultContainer from "./ResultContainer";
import { useState } from "react";

function App() {
  const [searchResults, setsearchResults] = useState([]);
  const [sortingType, setSortingType] = useState(-1);
  const [sortedbyRelevance, setsortedbyRelevance] = useState([]);
  let title, titleID, releaseYear, plot, image;
  function searchMovie(searchParam) {
    const url = `https://imdb231.p.rapidapi.com/api/imdb/main-search-query/v1?searchTerm=${searchParam}&type=Movies&limit=5&languageCountry=en_US`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "8dfede117amsha9638b8a704feedp121ff5jsnfb6b4e43f076",
        "x-rapidapi-host": "imdb231.p.rapidapi.com",
      },
    };
    SearchApiCall(url, options);
  }
  function getTitlePlot(titleID) {
    const url = `https://imdb231.p.rapidapi.com/api/imdb/title-plot-query/v1?id=${titleID}&languageCountry=en_US`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "8dfede117amsha9638b8a704feedp121ff5jsnfb6b4e43f076",
        "x-rapidapi-host": "imdb231.p.rapidapi.com",
      },
    };
    return TitlePlotCall(url, options);
  }
  async function SearchApiCall(url, options) {
    console.log("api call started...");
    const response = await fetch(url, options);
    const result = await response.json();
    console.log("api fetched");
    displayResults(result);
  }
  async function TitlePlotCall(url, options) {
    console.log("api call 2 started");
    const response = await fetch(url, options);
    const result = await response.json();
    console.log("api call 2 read");
    return result;
  }
  async function displayResults(result) {
    const resultTitles = result.data.mainSearch.edges;
    let newSearchResults = [];
    if (resultTitles) {
      for (let index = 0; index < resultTitles.length; index++) {
        title = resultTitles[index].node.entity.titleText.text;
        if (resultTitles[index].node.entity.releaseYear.year)
          releaseYear = resultTitles[index].node.entity.releaseYear.year;
        titleID = resultTitles[index].node.entity.id;
        if (resultTitles[index].node.entity.primaryImage)
          image = resultTitles[index].node.entity.primaryImage.url;
        const TitlePlot = await getTitlePlot(titleID);
        if (TitlePlot.data.title.plot)
          plot = TitlePlot.data.title.plot.plotText.plainText;
        newSearchResults.push({ title, titleID, releaseYear, plot, image });
      }

      setsearchResults(newSearchResults);
      setsortedbyRelevance(newSearchResults);
    }
  }
  function setSortingState(value) {
    setSortingType(value);
  }
  useEffect(() => {
    sortResults(sortingType);
  }, [sortingType]);
  function sortResults(sortingType) {
    let sortedResults = [...searchResults];
    switch (sortingType) {
      case "-1": //default
        break;
      case "0": //relevance
        setsearchResults(sortedbyRelevance);

        break;
      case "1": //latest
      console.log(sortedResults);
        sortedResults.sort((a, b) => b.releaseYear - a.releaseYear);
        console.log(sortedResults);
        setsearchResults(sortedResults);

        break;
      case "2": //oldest
        sortedResults.sort((a, b) => a.releaseYear - b.releaseYear);
        setsearchResults(sortedResults);
        break;

      default:
        break;
    }
  }

  return (
    <div className=" overflow-scroll w-screen h-screen flex flex-col justfy-center items-center  ">
      <h1 className=" mt-6 font-inter text-blue-950 text-5xl font-bold text-center">
        Search Your Favorite Movies.
      </h1>
      <SearchBar search={searchMovie}></SearchBar>

      <div className="flex flex-row mt-28 justify-between w-[85vw] font-inter  text-blue-400">
        <p>
          {searchResults.length > 0 ? searchResults.length + " Results" : ""}
        </p>
        {searchResults.length != 0 ? (
          <SortingButton sortResultsBy={setSortingState}></SortingButton>
        ) : null}
      </div>

      <ResultContainer Result={searchResults}></ResultContainer>
    </div>
  );
}

export default App;
