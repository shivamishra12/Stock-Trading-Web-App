import { useEffect, useState } from "react";
import API from "../services/api";

function Portfolio() {

  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {

    const res = await API.get("/stocks");

    setStocks(res.data);

  };

  return (
    <div className="container mt-5">

      <h2>Your Portfolio</h2>

      <table className="table table-dark mt-4">

        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Invested</th>
          </tr>
        </thead>

        <tbody>

          {stocks.map((stock) => (
            <tr key={stock._id}>
              <td>{stock.symbol}</td>
              <td>{stock.name}</td>
              <td>${stock.price}</td>
              <td>{stock.count}</td>
              <td>${stock.totalPrice}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Portfolio;