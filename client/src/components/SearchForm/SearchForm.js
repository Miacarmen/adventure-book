import React, { useState } from 'react'
import { collapseTagsString } from "../../utils/tagConversion";

const SearchForm = (props) => {
  const [ searchCriteria, setSearchCriteria ] = useState([]);

  function onSubmitSearchRequest(e) {
    e.preventDefault();
    props.onRequestSearch(searchCriteria);
  }

  function onSearchCriteriaChanged(e) {
    let value = e.target.value;
    value = collapseTagsString(value);
    setSearchCriteria(value);
  }

  return (
    <div className="container form-control">
      <form className="searchForm max-w-xs" onSubmit={onSubmitSearchRequest}>
        <div className="input-group input-group-sm md:input-group-lg">
          <input
            type="text"
            name="criteria"
            placeholder="#sailing #hiking #surfing..."
            className="input input-bordered "
            onChange={onSearchCriteriaChanged}
          />
          <button className="btn bg-accent border-none hover:bg-accent-focus btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchForm;
