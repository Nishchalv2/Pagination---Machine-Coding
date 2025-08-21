import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const PAGE_SIZE = 10;
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const noOfPages = Math.ceil(products.length / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  useEffect(() => {
    fetchData();
  }, []);

  function handlePage(page) {
    setCurrentPage(page);
  }

  function previousPage() {
    setCurrentPage((prev) => prev - 1);
  }

  function nextPage() {
    setCurrentPage((prev) => prev + 1);
  }

  async function fetchData() {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    setProducts(json.products);
  }
  return products.length === 0 ? (
    <h1>No Products Available</h1>
  ) : (
    <div className="App">
      <h1>Pagination</h1>
      <div className="product-container">
        {products.slice(start, end).map((p) => (
          <div key={p.id} className="product-card">
            <img className="img-size" src={p.thumbnail} alt="" srcset="" />
            <span>{p.title}</span>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          disabled={currentPage === 0}
          onClick={previousPage}
          className="pagination-button"
        >
          {"<"}
        </button>
        {[...Array(noOfPages).keys()].map((n) => (
          <button
            onClick={() => {
              handlePage(n);
            }}
            className="pagination-button"
          >
            {n}
          </button>
        ))}
        <button
          disabled={currentPage === noOfPages - 1}
          onClick={nextPage}
          className="pagination-button"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
