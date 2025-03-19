import React from 'react';

const FilterBar = ({ selectedPlatforms, onChange }) => {
  const platforms = [
    {
      id: 'Codeforces',
      name: 'Codeforces',
      logo: 'https://store-images.s-microsoft.com/image/apps.48094.14504742535903781.aedbca21-113a-48f4-b001-4204e73b22fc.503f883f-8339-4dc5-8609-81713a59281f'
    },
    {
      id: 'CodeChef',
      name: 'CodeChef',
      logo: 'https://yt3.googleusercontent.com/hN4RNGp3WbykRUGlxIauQ0Rtl55z6uaz1wjB7mllzWa1hGEvIUoQfPWmCBuAkr75HmiwXXi07a4=s900-c-k-c0x00ffffff-no-rj'
    },
    {
      id: 'LeetCode',
      name: 'LeetCode',
      logo: 'https://cdn.iconscout.com/icon/free/png-256/free-leetcode-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-4-pack-logos-icons-2944960.png?f=webp&w=256'
    }
  ];

  const handleToggle = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      onChange(selectedPlatforms.filter(p => p !== platform));
    } else {
      onChange([...selectedPlatforms, platform]);
    }
  };

  const handleSelectAll = () => {
    onChange(platforms.map(p => p.id));
  };

  const handleClearAll = () => {
    onChange([]);
  };

  return (
    <div className="mb-6 p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
        <h3 className="font-semibold text-gray-900 dark:text-gray-50 text-lg">Filter Platforms</h3>
        <div className="flex space-x-3 text-sm">
          <button
            onClick={handleSelectAll}
            className="px-3 py-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-700 focus:ring-opacity-50"
          >
            Select All
          </button>
          <button
            onClick={handleClearAll}
            className="px-3 py-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 focus:ring-opacity-50"
          >
            Clear All
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {platforms.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.id);
          return (
            <label
              key={platform.id}
              className={`inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all ${
                isSelected
                  ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-2 border-blue-300 dark:border-blue-600 shadow-sm'
                  : 'bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={isSelected}
                onChange={() => handleToggle(platform.id)}
              />
              <div className={`w-6 h-6 flex items-center justify-center rounded-md mr-2.5 overflow-hidden ${
                isSelected
                  ? 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                <img src={platform.logo} alt={platform.name} className="w-5 h-5 object-contain" />
              </div>
              {platform.name}
              {isSelected && (
                <svg className="w-4 h-4 ml-2 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default FilterBar;