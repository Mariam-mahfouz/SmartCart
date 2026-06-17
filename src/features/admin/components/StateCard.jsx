const StatCard = ({ title, value, change }) => {
    const isPositive = change.startsWith("+");
  
    return (
      <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm">
        <p className="text-sm text-gray-500">{title}</p>
  
        <div className="flex items-end justify-between mt-3">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            {value}
          </h3>
  
          <span
            className={`text-sm font-medium ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {change}
          </span>
        </div>
      </div>
    );
  };
  
  export default StatCard;
  