'use client'

import { deleteCustomers } from '@/app/lib/actions';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import ConfirmDialog from '../confirmation';




export function CreateCustomers() {
  return (
    <Link
      href="/dashboard/customers/create"
      className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Registrar Cliente</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCustomers({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/customers/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}



export function DeleteCustomers({ id, }: { id: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const [actionConfirmed, setActionConfirmed] = useState(false);


  const handleOpenDialog = () => { setIsDialogOpen(true); };
  const handleCloseDialog = () => { setIsDialogOpen(false); };
  const handleConfirm = () => {
    const deleteCustomersWithId = deleteCustomers.bind(null, id);
    setActionConfirmed(true);
    setIsDialogOpen(false);
    deleteCustomersWithId()
  };

  //const deleteCustomersWithId = deleteCustomers.bind(null, id);

  return (
    <>
      <form action={handleOpenDialog} >
        <button type='submit' className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
      {isDialogOpen && (<ConfirmDialog title="¿Eliminar este cliente?" subTitle='¿Estas seguro que deseas eliminar este cliente?' onConfirm={handleConfirm} onCancel={handleCloseDialog} />)}

    </>

  );
}
