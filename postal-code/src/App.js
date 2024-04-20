import React, { useState } from 'react';
import './App.css';


const PincodeLookupApp = () => {
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postalData, setPostalData] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);

  const handlePincodeChange = (e) => {
    const { value } = e.target;
    setPincode(value);
  };

  const handleLookup = async () => {
    if (pincode.length !== 6) {
      setError('Postal code should be 6 digits');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();

      if (data && data[0]?.Status === 'Success') {
        setPostalData(data[0]?.PostOffice || []);
        setFilteredResults(data[0]?.PostOffice || []);
      } else {
        setError('Error fetching postal data');
      }
    } catch (error) {
      setError('Error fetching postal data');
    }

    setLoading(false);
  };

  const handleFilter = (query) => {
    const filtered = postalData.filter((office) =>
      office.Name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResults(filtered);
  };

  return (
    <div>
      <input type="text" value={pincode} onChange={handlePincodeChange} />
      <button onClick={handleLookup}>Lookup</button>
      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <input type="text" onChange={(e) => handleFilter(e.target.value)} />
      {filteredResults.length === 0 && <div>No results found</div>}
      {filteredResults.map((office) => (
        <div key={office.Name}>
          <p>Post Office Name: {office.Name}</p>
          <p>Pincode: {office.Pincode}</p>
          <p>District: {office.District}</p>
          <p>State: {office.State}</p>
        </div>
        
      ))}
    </div>
  );
};

export default PincodeLookupApp;
