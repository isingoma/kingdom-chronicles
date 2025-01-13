import React from 'react';
import { Book } from 'lucide-react';
import type { BibleBook } from '../types';

interface BookDisplayProps {
  book: BibleBook;
}

export const BookDisplay: React.FC<BookDisplayProps> = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center mb-8">
      <div className="flex justify-center mb-4">
        <Book className="w-12 h-12 text-indigo-600" />
      </div>
      <h2 className="text-3xl font-bold mb-2">{book.name}</h2>
      <p className="text-gray-600">{book.description}</p>
    </div>
  );
};