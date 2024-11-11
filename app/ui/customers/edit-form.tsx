'use client';

import React from 'react';
import { useActionState } from 'react';
import { StateCustomers, updateCustomer} from '@/app/lib/actions';
// import { CustomerForm } from '@/app/lib/definitions';
import { UserIcon, AtSymbolIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

const editCustomerEdit = ( {customers} : {customers: any}) => {
  const initialState: StateCustomers = { message: null, errors: {} };
  const updateCustomerWithId = updateCustomer.bind(null, customers.id);
  const [state, formAction] = useActionState(updateCustomerWithId, initialState);

   
  return (
    <form action={formAction}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
            <input type="hidden" name="id" value={customers.id} />
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Ingresa el Nombre
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                step="0.01"
                                defaultValue={customers.name}
                                placeholder="Ingrese Nombre del cliente"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="name-error"
                            />
                            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    <div id="amount-error" aria-live="polite" aria-atomic="true">
                        {state?.errors?.name &&
                            state.errors.name.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Ingresa el Correo
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                step="0.01"
                                defaultValue={customers.email}
                                placeholder="Ingrese Correo del cliente"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="email-error"
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    <div id="amount-error" aria-live="polite" aria-atomic="true">
                        {state?.errors?.email &&
                            state.errors.email.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="image_url" className="mb-2 block text-sm font-medium">
                        Url de su imagen
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="image_url"
                                name="image_url"
                                type="text"
                                step="0.01"
                                defaultValue={customers.image_url}
                                placeholder="Ingrese url del su imagen"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="image-error"
                            />
                            <PhotoIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    <div id="image-error" aria-live="polite" aria-atomic="true">
                        {state?.errors?.image_url &&
                            state.errors.image_url.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <Link
                        href="/dashboard/customers"
                        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                        Cancelar
                    </Link>
                    <Button type="submit" >Editar Cliente</Button>
                </div>
            </div>
        </form>
  )
}

export default editCustomerEdit