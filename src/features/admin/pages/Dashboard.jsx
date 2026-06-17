import StatCard from "../components/StateCard.jsx";
import ChartBox from "../components/ChartBox.jsx";
import OrdersTable from "../components/OrdersTable.jsx";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$204.4K" change="+12%" />
        <StatCard title="Orders" value="5,200" change="+8%" />
        <StatCard title="Customers" value="3,100" change="+5%" />
        <StatCard title="Pending Orders" value="120" change="-2%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartBox title="Sales Overview" />
        <ChartBox title="Customer Analytics" />
        <ChartBox title="Order Status" />
      </div>

      <OrdersTable />
    </div>
  );
};

export default Dashboard;
