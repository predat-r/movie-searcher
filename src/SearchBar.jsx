import React, { useEffect, useState } from "react";

function SearchBar({ search }) {
  const [searchParam, setSearhParam] = useState("");
  return (
    <div className="flex flex-row w-2/3 h-14 relative">
      <input
        onChange={(e) => {
          setSearhParam(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.keyCode == 13) {
            search(searchParam);
          }
        }}
        placeholder="Type here...."
        className="w-full p-3 h-full rounded-md shadow-lg  bg-blue-200 mt-5 "
      />
      <img
        onClick={() => {
          search(searchParam);
        }}
        className="absolute top-[3.9vh] right-[2vw]"
        src="src/assets/icons8-search-30.png"
      />
    </div>
  );
}

export default SearchBar;
