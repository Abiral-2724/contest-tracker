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
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between mb-3">
        <h3 className="font-medium">Filter Platforms</h3>
        <div className="space-x-2 text-sm">
          <button 
            onClick={handleSelectAll}
            className="text-blue-600 hover:text-blue-800"
          >
            Select All
          </button>
          <button 
            onClick={handleClearAll}
            className="text-blue-600 hover:text-blue-800"
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
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 mr-2"
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