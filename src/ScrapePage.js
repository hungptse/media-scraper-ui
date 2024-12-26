import React, { useState, useEffect } from "react";
import { HttpStatusCode } from "axios";
import "./App.css";
import { get, post } from "./helper/api-caller";
import { useNavigate } from "react-router-dom";

function ScrapePage() {
  const [media, setMedia] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [filterType, setFilterType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await get("/media", {
        page,
        type: filterType,
        search: searchText,
      });
      if (response && response.status === HttpStatusCode.Ok) {
        setMedia(response.data.data);
        setMaxPage(response.data.totalPages);
        setTotalItems(response.data.totalItems);
      } else {
        navigate("/login");
      }
    };
    fetchData();
  }, [page, filterType, searchText]);

  useEffect(() => {
    setPage(1);
  }, [searchText]);

  const sendUrl = async () => {
    const response = await post("/scrape", {
      urls: url.split(","),
    });
    console.log(response);
  };

  return (
    <div>
      <h1>Media Scraper</h1>

      <textarea
        type="text"
        placeholder="Please input urls need scrape with delimiter is ','"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <span></span>
      <button onClick={sendUrl}>Send</button>
      <br />

      <span>Type: </span>
      <select
        onChange={(e) => setFilterType(e.target.value)}
        value={filterType}
      >
        <option value="">All</option>
        <option value="image">Images</option>
        <option value="video">Videos</option>
      </select>

      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={() => setPage(1)}>Search</button>

      <br />
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Pre Page
      </button>
      <span>Total items:{totalItems}</span>
      <button disabled={page === maxPage} onClick={() => setPage(page + 1)}>
        Next Page
      </button>
      {/* Grid container for media */}
      <div className="grid-container">
        {media.map((item) => (
          <div key={item.id} className="grid-item">
            {item.type === "image" ? (
              <img src={item.url} alt="scraped media" className="media-item" />
            ) : (
              <video src={item.url} controls className="media-item"></video>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScrapePage;
