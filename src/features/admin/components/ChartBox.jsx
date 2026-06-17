const ChartBox = ({ title }) => {
    return (
      <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm h-64">
        <h3 className="text-sm font-medium text-gray-500 mb-4">
          {title}
        </h3>
  
        <div className="flex items-center justify-center h-full text-gray-400">
          Chart goes here
        </div>
      </div>
    );
  };
  
  export default ChartBox;
  