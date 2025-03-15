import React from 'react';
import { FaBookmark, FaRegBookmark, FaYoutube } from 'react-icons/fa';
import moment from 'moment';

const ContestCard = ({ contest, isBookmarked, onBookmark, isPast }) => {
  const timeRemaining = moment(contest.startTime).fromNow();
  
  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'Codeforces':
        return 'bg-red-100 text-red-800';
      case 'CodeChef':
        return 'bg-green-100 text-green-800';
      case 'LeetCode':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{contest.name}</h3>
          <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${getPlatformColor(contest.platform)}`}>
            {contest.platform}
          </span>
        </div>
        <button 
          onClick={() => onBookmark(contest._id)}
          className="text-gray-400 hover:text-yellow-500 focus:outline-none"
        >
          {isBookmarked ? <FaBookmark className="text-yellow-500" /> : <FaRegBookmark />}
        </button>
      </div>
      
      <div className="mt-3 text-sm text-gray-600">
        <p>Start: {moment(contest.startTime).format('MMM D, YYYY [at] h:mm A')}</p>
        <p>Duration: {moment.duration(moment(contest.endTime).diff(moment(contest.startTime))).asHours().toFixed(1)} hours</p>
        {!isPast && <p>Starts {timeRemaining}</p>}
      </div>
      
      <div className="mt-3 flex space-x-2">
        <a 
          href={contest.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Go to contest →
        </a>
        
        {isPast && contest.solutionUrl && (
          <a 
            href={contest.solutionUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
          >
            <FaYoutube className="mr-1" /> Solution
          </a>
        )}
      </div>
    </div>
  );
};

export default ContestCard;