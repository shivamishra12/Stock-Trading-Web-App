import { useEffect, useState } from "react";
import API from "../services/api";

function Transactions() {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {

    const res = await API.get("/transactions");

    setTransactions(res.data);

  };

  return (
    <div className="container mt-5">

      <h2>Transaction History</h2>

      <table className="table table-dark mt-4">

        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Payment Mode</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>

          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td>{tx.type}</td>
              <td>${tx.amount}</td>
              <td>{tx.paymentMode}</td>
              <td>{tx.time}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Transactions;