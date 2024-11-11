'use client'

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';
import ConfirmDialog from '../confirmation';
import { useState } from 'react';


export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Crear Factura</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}



export function DeleteInvoice({ id }: { id: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  //const [actionConfirmed, setActionConfirmed] = useState(false);


  const handleOpenDialog = () => { setIsDialogOpen(true); };
  const handleCloseDialog = () => { setIsDialogOpen(false); };
  const handleConfirm = () => {
    const deleteInvoiceWithId = deleteInvoice.bind(null, id);
    //setActionConfirmed(true);
    setIsDialogOpen(false);
    deleteInvoiceWithId()
  };

  //const deleteInvoiceWithId = deleteInvoice.bind(null, id)
  return (
    <>
      <form action={handleOpenDialog }>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
      {isDialogOpen && (<ConfirmDialog title="¿Eliminar esta factura?" subTitle='¿Estas seguro que deseas eliminar esta factura?' onConfirm={handleConfirm} onCancel={handleCloseDialog} />)}
    </>
  );
}
