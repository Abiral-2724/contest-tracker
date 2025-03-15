import React, { useState } from 'react';

const SolutionForm = ({ contests, onSubmit }) => {
  const [contestId, setContestId] = useState('');
  const [solutionUrl, setSolutionUrl] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!contestId || !solutionUrl) {
      return;
    }
    
    onSubmit(contestId, solutionUrl);
    setSolutionUrl('');
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Solution Link</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Contest</label>
          <select
            value={contestId}
            onChange={(e) => setContestId(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Select a contest</option>
            {contests.map(contest => (
              <option key={contest._id} value={contest._id}>
                {contest.name} ({contest.platform})
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Solution URL</label>
          <input
            type="url"
            value={solutionUrl}
            onChange={(e) => setSolutionUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        
        <button
          type="submit"
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
        >
          Add Solution
        </button>
      </form>
    </div>
  );
};

export default SolutionForm;
