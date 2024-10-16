import React from 'react'
import { XIcon } from 'lucide-react'

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
}

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Attention</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
            aria-label="Fermer la modale"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 text-gray-800 dark:text-gray-200">
          {children}
        </div>
      </div>
    </div>
  )
}
