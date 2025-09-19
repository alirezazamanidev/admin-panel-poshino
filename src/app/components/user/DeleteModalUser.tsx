'use client';

import { User } from '@/libs/models/user';
import { DeleteUser } from '@/libs/services/user';
import { X, Trash2, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { KeyedMutator } from 'swr';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment } from 'react';

interface DeleteModalUserProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  userMutate: KeyedMutator<any>;
}

export default function DeleteModalUser({
  isOpen,
  onClose,
  user,
  userMutate,
}: DeleteModalUserProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const handleDelete = async () => {
    if (confirmText.toLowerCase() !== 'delete') {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await DeleteUser(user.id);
      if (result) {
        userMutate();
        onClose();
        setConfirmText('');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    setConfirmText('');
    onClose();
  };

  const isDeleteEnabled = confirmText.toLowerCase() === 'delete';

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-2xl border border-gray-200/60 transition-all">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-xl">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <DialogTitle
                      as="h3"
                      className="text-lg font-bold text-gray-900"
                    >
                      حذف کاربر
                    </DialogTitle>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="mb-6">
                  <p className="text-gray-700 text-center mb-4">
                    آیا از حذف کاربر مطمئن هستید؟
                  </p>

                  {/* User Info */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {user?.fullname?.charAt(0) || 'ک'}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {user?.fullname || 'تعریف نشده'}
                        </p>
                        <p className="text-sm text-gray-600">{user?.phone}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-red-600 text-center mb-4">
                    این عمل قابل بازگشت نیست!
                  </p>

                  {/* Confirmation Input */}
                  <div className="mb-4 text-center" >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      برای تأیید حذف، کلمه{' '}
                      <span className="font-bold text-red-600">"delete"</span>{' '}
                      را وارد کنید:
                    </label>
                    <input
                      type="text"
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value)}
                      placeholder="delete"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={handleClose}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors duration-200 disabled:opacity-50"
                  >
                    انصراف
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting || !isDeleteEnabled}
                    className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${
                      isDeleteEnabled && !isDeleting
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isDeleting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        در حال حذف...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        حذف کاربر
                      </>
                    )}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
