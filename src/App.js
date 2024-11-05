import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        "http://localhost:3001/"
      );
      setFetchedData(data);
    };
    getData();
  }, []);


  if (!fetchedData || fetchedData.length === 0) {
    return <div>Loading...</div>; // or any placeholder
}

  console.log("data 1: ", fetchedData.data[0]);

  const newData = fetchedData.data[0];

  const {cityname, temperature, conditions, searchedat} = newData;

  
  return (
    <div className="App">
      <h1>test</h1>
      <ul>
      <li>{cityname}</li>
      <li>{temperature}</li>
      <li>{conditions}</li>
      <li>{searchedat}</li>
      </ul>
    </div>
  );
}

export default App;