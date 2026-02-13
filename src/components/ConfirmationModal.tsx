
import React from 'react';

interface ConfirmationModalProps {
   isOpen: boolean;
   onClose: () => void;
   onConfirm: () => void;
   title: string;
   message: string;
   confirmText?: string;
   cancelText?: string;
   isDestructive?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
   isOpen,
   onClose,
   onConfirm,
   title,
   message,
   confirmText = 'Confirm',
   cancelText = 'Cancel',
   isDestructive = false,
}) => {
   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
         {/* Backdrop */}
         <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
         />

         {/* Modal Content */}
         <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all p-6 scale-100 opacity-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
               {title}
            </h3>

            <p className="text-gray-500 mb-8 leading-relaxed">
               {message}
            </p>

            <div className="flex gap-4 justify-end">
               <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
               >
                  {cancelText}
               </button>

               <button
                  onClick={() => {
                     onConfirm();
                     onClose();
                  }}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold text-white shadow-lg transition-all transform hover:scale-105 ${isDestructive
                        ? 'bg-red-600 hover:bg-red-700 shadow-red-200'
                        : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                     }`}
               >
                  {confirmText}
               </button>
            </div>
         </div>
      </div>
   );
};

export default ConfirmationModal;
