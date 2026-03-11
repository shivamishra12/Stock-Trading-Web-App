import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

  const [form, setForm] = useState({
    symbol: "",
    name: "",
    price: "",
    count: "",
    stockType: "delivery",
    orderType: "buy"
  });

  const [orders, setOrders] = useState([]);
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchPortfolio();
  }, []);

  const fetchOrders = async () => {
    const res = await API.get("/orders");
    setOrders(res.data);
  };

  const fetchPortfolio = async () => {
    const res = await API.get("/stocks");
    setPortfolio(res.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    try {
      await API.post("/orders", form);

      alert("Order placed successfully");

      fetchOrders();
      fetchPortfolio();

    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    }
  };

  const totalInvestment = portfolio.reduce(
    (acc, stock) => acc + stock.totalPrice,
    0
  );

  return (
    <div className="container mt-5">

      <h2 className="mb-4">Trading Dashboard</h2>

      {/* Summary Cards */}

      <div className="row mb-4">

        <div className="col-md-4">
          <div className="card-dark">
            <h5>Total Stocks</h5>
            <h3>{portfolio.length}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card-dark">
            <h5>Total Investment</h5>
            <h3>${totalInvestment}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card-dark">
            <h5>Total Orders</h5>
            <h3>{orders.length}</h3>
          </div>
        </div>

      </div>

      <div className="row">

        {/* Trading Form */}

        <div className="col-md-4">

          <div className="card-dark">

            <h4 className="mb-3">Trade Stock</h4>

            <form onSubmit={placeOrder}>

              <input
                type="text"
                name="symbol"
                placeholder="Symbol"
                className="form-control mb-2"
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="name"
                placeholder="Company Name"
                className="form-control mb-2"
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                className="form-control mb-2"
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="count"
                placeholder="Quantity"
                className="form-control mb-2"
                onChange={handleChange}
                required
              />

              <select
                name="orderType"
                className="form-control mb-3"
                onChange={handleChange}
              >
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>

              <button className="btn btn-success w-100">
                Place Order
              </button>

            </form>

          </div>

        </div>

        {/* Recent Orders */}

        <div className="col-md-8">

          <div className="card-dark">

            <h4 className="mb-3">Recent Orders</h4>

            <table className="table table-dark">

              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>

                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.symbol}</td>
                    <td>{order.orderType}</td>
                    <td>${order.price}</td>
                    <td>{order.count}</td>
                    <td>${order.totalPrice}</td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;