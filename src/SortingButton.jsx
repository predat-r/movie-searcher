import React from "react";

function SortingButton({sortResultsBy}) {
  return (
    <select
      defaultValue={"sort"}
      onChange={(e) => {

        sortResultsBy(e.target.value)}
    }
      className="bg-blue-200 rounded-md w-24  h-6 appearance-none text-center "
    >
      <option value="-1">sort</option>
      <option value="0">Relevance</option>
      <option value="1">Latest</option>
      <option value="2">Oldest</option>
    </select>
  );
}

export default SortingButton;
