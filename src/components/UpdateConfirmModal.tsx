import React from 'react';
import { motion } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';

interface FormData {
  title: string;
  content: string;
  excerpt?: string;
  type: 'blog' | 'survey';
}

interface UpdateConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data?: FormData) => void;
  type: 'blog' | 'survey';
  isEditing: boolean;
}

export const UpdateConfirmModal: React.FC<UpdateConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  type,
  isEditing
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            {isEditing ? 'İçeriği Güncelle' : 'İçeriği Oluştur'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-gray-900">
                {isEditing ? 'İçeriği güncellemek üzeresiniz' : 'Yeni içerik oluşturmak üzeresiniz'}
              </h4>
              <p className="mt-2 text-sm text-gray-500">
                {isEditing 
                  ? `${type === 'blog' ? 'Blog yazısı' : 'Araştırma sonucu'} güncellenecek. Devam etmek istiyor musunuz?`
                  : `Yeni bir ${type === 'blog' ? 'blog yazısı' : 'araştırma sonucu'} oluşturulacak. Devam etmek istiyor musunuz?`
                }
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 p-4 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            İptal
          </button>
          <button
            onClick={() => onConfirm()}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isEditing ? 'Güncelle' : 'Oluştur'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}; 