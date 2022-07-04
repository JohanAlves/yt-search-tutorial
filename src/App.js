import { useState } from "react";
import "./App.css";
import { SEARCHDATA } from "./data/searchData";

function App() {
  const [search, setSearch] = useState("");
  const [searchTimer, setSearchTimer] = useState();
  const [loading, setLoading] = useState(false);

  const updateSearch = (e) => {
    setLoading(true);
    clearTimeout(searchTimer);
    setSearchTimer(
      setTimeout(() => {
        setSearch(e.target.value);
        setLoading(false);
      }, 900)
    );
  };

  if (loading) {
    return (
      <div className="bg-purple-600 min-h-screen">
        <div className="max-w-5xl mx-auto flex flex-col justify-center items-center p-10 ">
          <input
            type="text"
            name="search"
            autoComplete="off"
            placeholder="Type your search..."
            className="border border-gray-500 w-full h-full rounded-md opacity-80 p-3"
            onChange={updateSearch}
          />

          <div className="flex justify-center gap-4 mt-7 w-full text-white">
            <h1>Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-purple-600 min-h-screen ">
      <div className="max-w-5xl mx-auto flex flex-col justify-center items-center p-10">
        <input
          type="text"
          name="search"
          autoComplete="off"
          placeholder="Type your search..."
          className="border border-gray-500 w-full h-full rounded-md opacity-80 p-3"
          onChange={updateSearch}
        />
        <div className="grid grid-cols-3 gap-4 mt-7 w-full ">
          {SEARCHDATA.filter((data) => {
            console.log("new request");
            if (search === "") return data;
            else if (data.name.toLowerCase().includes(search.toLowerCase()))
              return data;
            else if (data.phone.includes(search)) return data;
            else if (data.email.toLowerCase().includes(search.toLowerCase()))
              return data;
          }).map((data, index) => {
            return (
              <div
                key={index}
                className="bg-gray-100 rounded-md shadow-md shadow-purple-800 break-words p-3"
              >
                <div className="text-lg font-semibold mb-2">{data.name}</div>
                <div className="text-sm">{data.phone}</div>
                <div className="text-sm">{data.email}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
