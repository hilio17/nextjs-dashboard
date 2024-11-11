'use client'

import React from 'react'; function ConfirmDialog({ title, onConfirm, onCancel, subTitle, }: { title: string, onConfirm: any, onCancel: any, subTitle?: string }) {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="mb-4">{subTitle}</p>
        <div className="flex justify-end">
          <button onClick={onCancel} className="px-4 py-2 mr-2 bg-gray-300 rounded">Cancelar</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">Confirmar</button>
        </div>
      </div>
    </div>
  );
} export default ConfirmDialog