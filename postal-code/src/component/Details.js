import React, { useState } from "react";
import Cards from "./Cards";

function Details({ searchParam, response }) {
  const [filterdata, setFilterdata] = useState(response.data[0].PostOffice);

  const filter = (e) => {
    const param = e.target.value.trim().toLowerCase();

    if (!param) {
        // If input is empty, reset the filterdata to the original data
        setFilterdata(response.data[0].PostOffice);
      } else {
        // If input is not empty, filter the data based on the input value
        setFilterdata(() => {
          return response.data[0].PostOffice.filter((item) =>
            item.Name.toLowerCase().includes(param)
          );
        });
      }

  };

  return (
    <div>
      <div className="wrapper">
        <p className="label">Pincode : {searchParam}</p>
        <p className="label">Message : {response.data[0].Message}</p>

        <div>
          <input
            className="filter"
            type="text"
            placeholder="Filter"
            onChange={filter}
          />
        </div>
      </div>

      <div className="card-wrapper">
        {filterdata.map((item, index) => {
          return <Cards key={index} item={item} />;
        })}
      </div>
    </div>
  );
}

export default Details;