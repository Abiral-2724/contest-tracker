import React from 'react';
import { FaBookmark, FaRegBookmark, FaYoutube } from 'react-icons/fa';
import moment from 'moment';

const ContestCard = ({ contest, isBookmarked, onBookmark, isPast }) => {
  const timeRemaining = moment(contest.startTime).fromNow();
  
  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'Codeforces':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      case 'CodeChef':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'LeetCode':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };
  
  return (
    <div className="border dark:border-gray-700 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{contest.name}</h3>
          <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${getPlatformColor(contest.platform)}`}>
            {contest.platform}
          </span>
        </div>
        <button 
          onClick={() => onBookmark(contest._id)}
          className="text-gray-400 dark:text-gray-500 hover:text-yellow-500 dark:hover:text-yellow-400 focus:outline-none"
        >
          {isBookmarked ? <FaBookmark className="text-yellow-500 dark:text-yellow-400" /> : <FaRegBookmark />}
        </button>
      </div>
      
      <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        <p>Start: {moment(contest.startTime).format('MMM D, YYYY [at] h:mm A')}</p>
        <p>Duration: {moment.duration(moment(contest.endTime).diff(moment(contest.startTime))).asHours().toFixed(1)} hours</p>
        {!isPast && <p>Starts {timeRemaining}</p>}
      </div>
      
      <div className="mt-3 flex space-x-2">
        <a 
          href={contest.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
        >
          Go to contest →
        </a>
        
        {isPast && contest.solutionUrl && (
          <a 
            href={contest.solutionUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm font-medium flex items-center"
          >
            <FaYoutube className="mr-1" /> Solution
          </a>
        )}
      </div>
    </div>
  );
};

export default ContestCard;