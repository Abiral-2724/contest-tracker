import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="w-full bg-slate-50 border-t py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-sm text-slate-700 flex items-center">
            Made with 
            <span className="mx-1 text-red-500 animate-pulse">
              <Heart size={16} fill="currentColor" />
            </span> 
            by Abiral Jain
          </p>
          
          <Separator className="w-24 bg-slate-200" />
          
          <div className="flex space-x-4">
            <Button variant="link" size="sm" className="text-slate-600 hover:text-slate-900">
              About
            </Button>
            <Button variant="link" size="sm" className="text-slate-600 hover:text-slate-900">
              Contact
            </Button>
            <Button variant="link" size="sm" className="text-slate-600 hover:text-slate-900">
              Privacy
            </Button>
          </div>
          
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Contest Tracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;