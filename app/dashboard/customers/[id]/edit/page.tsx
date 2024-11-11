import Form from '@/app/ui/customers/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomersById, } from '@/app/lib/data';
import { notFound } from 'next/navigation';


export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const customers = await fetchCustomersById(id)

      if (!customers) {
        notFound();
      }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Clientes', href: '/dashboard/customers' },
                    {
                        label: 'Editar Cliente',
                        href: `/dashboard/customers/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form customers={customers} />
        </main>
    );
}