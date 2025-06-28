// File: src/components/SetupGuide.jsx
import React, { useState } from 'react';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';

const tasksList = [
  { id: 1, label: 'Update statutory information' },
  { id: 2, label: 'Import opening data' },
  { id: 3, label: 'Account creation' },
  { id: 4, label: 'Item creation' },
  { id: 5, label: 'Configure invoice' },
  { id: 6, label: 'Set invoice templates' },
];

export default function SetupGuide() {
  const [completed, setCompleted] = useState([1]); // example: task 1 done

  const toggleTask = id => {
    setCompleted(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const progress = Math.round((completed.length / tasksList.length) * 100);

  return (
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Setup Guide */}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">Setup Guide</h3>
        <p className="text-gray-600 mb-4 text-sm">
          Get started by completing the setup tasks below
        </p>

        <ul className="space-y-2 mb-4">
          {tasksList.map(task => {
            const done = completed.includes(task.id);
            return (
              <li
                key={task.id}
                className={`flex items-center space-x-2 p-2 rounded-lg border ${
                  done ? 'bg-gray-100 border-gray-200' : 'border-gray-200'
                }`}
                onClick={() => toggleTask(task.id)}
              >
                {done ? (
                  <FiCheckSquare className="text-blue-600 w-5 h-5" />
                ) : (
                  <FiSquare className="text-gray-400 w-5 h-5" />
                )}
                <span className={`${done ? 'line-through text-gray-400' : ''}`}>
                  {task.id}. {task.label}.
                </span>
              </li>
            );
          })}
        </ul>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="h-2 rounded-full bg-blue-600"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm font-medium">
          Setup in progress, <span className="font-bold">{completed.length}</span> out of{' '}
          <span className="font-bold">{tasksList.length}</span> tasks have been completed
        </p>
      </div>
    </div>
  );
}

