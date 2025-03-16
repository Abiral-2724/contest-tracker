import React from 'react';

const FilterBar = ({ selectedPlatforms, onChange }) => {
  const platforms = ['Codeforces', 'CodeChef', 'LeetCode'];
  
  const handleToggle = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      onChange(selectedPlatforms.filter(p => p !== platform));
    } else {
      onChange([...selectedPlatforms, platform]);
    }
  };
  
  const handleSelectAll = () => {
    onChange(platforms);
  };
  
  const handleClearAll = () => {
    onChange([]);
  };
  
  return (
    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex justify-between mb-3">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">Filter Platforms</h3>
        <div className="space-x-2 text-sm">
          <button 
            onClick={handleSelectAll}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            Select All
          </button>
          <button 
            onClick={handleClearAll}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            Clear All
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => (
          <label 
            key={platform} 
            className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${
              selectedPlatforms.includes(platform)
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 mr-2 text-blue-600 dark:text-blue-500"
              checked={selectedPlatforms.includes(platform)}
              onChange={() => handleToggle(platform)}
            />
            {platform}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;