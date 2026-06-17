const OrdersTable = () => {
    return (
      <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Recent Orders
        </h2>
  
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2 text-left">Order ID</th>
              <th className="py-2 text-left">Customer</th>
              <th className="py-2 text-left">Status</th>
              <th className="py-2 text-left">Amount</th>
            </tr>
          </thead>
  
          <tbody>
            <tr className="border-b">
              <td className="py-3">#1023</td>
              <td>Ahmed Ali</td>
              <td className="text-green-500 font-medium">Completed</td>
              <td>$320</td>
            </tr>
  
            <tr className="border-b">
              <td className="py-3">#1024</td>
              <td>Sara Mohamed</td>
              <td className="text-yellow-500 font-medium">Pending</td>
              <td>$180</td>
            </tr>
  
            <tr>
              <td className="py-3">#1025</td>
              <td>Omar Hassan</td>
              <td className="text-red-500 font-medium">Canceled</td>
              <td>$90</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  export default OrdersTable;
  