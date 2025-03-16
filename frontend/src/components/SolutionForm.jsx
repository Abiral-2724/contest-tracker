import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, Youtube, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SolutionForm = ({ contests, onSubmit }) => {
  const [contestId, setContestId] = useState('');
  const [solutionUrl, setSolutionUrl] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!contestId || !solutionUrl) {
      setError('Please select a contest and provide a YouTube URL');
      return;
    }
    
    // YouTube URL validation
    if (!solutionUrl.includes('youtube.com') && !solutionUrl.includes('youtu.be')) {
      setError('Please enter a valid YouTube URL');
      return;
    }
    
    setError('');
    onSubmit(contestId, solutionUrl);
    setSolutionUrl('');
  };
  
  return (
    <Card className="w-full dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold flex items-center gap-2 dark:text-gray-100">
          <Youtube size={20} className="text-red-600" />
          Add Solution Link
        </CardTitle>
        <CardDescription className="dark:text-gray-400">
          Add YouTube solutions for programming contests
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contest" className="dark:text-gray-300">Contest</Label>
            {contests && contests.length > 0 ? (
              <Select
                value={contestId}
                onValueChange={setContestId}
              >
                <SelectTrigger id="contest" className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                  <SelectValue placeholder="Select a contest" className="text-gray-400 dark:text-gray-400" />
                </SelectTrigger>
                <SelectContent className="bg-gray-50 dark:bg-gray-700">
                  {contests.map(contest => (
                    <SelectItem 
                      key={contest._id} 
                      value={contest._id}
                      className="dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      {contest.name} ({contest.platform})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="text-sm text-gray-500 dark:text-gray-400 p-2 border rounded-md dark:border-gray-600">
                No contests available without solutions
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="solutionUrl" className="dark:text-gray-300">YouTube Solution URL</Label>
            <div className="flex items-center space-x-2">
              <Link size={18} className="text-gray-400" />
              <Input
                id="solutionUrl"
                type="url"
                value={solutionUrl}
                onChange={(e) => setSolutionUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="flex-1 placeholder:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      
      <CardFooter>
        <Button 
          type="submit" 
          onClick={handleSubmit}
          className="w-full rounded-lg bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white"
          disabled={!contestId || contests.length === 0}
        >
          <Youtube size={16} className="mr-2" />
          Add Solution
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SolutionForm;