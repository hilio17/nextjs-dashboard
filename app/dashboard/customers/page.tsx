import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchFilteredCustomers } from '@/app/lib/data';
import { Metadata } from 'next';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/customers/table';

 
export const metadata: Metadata = {
  title: 'Clientes',
};
 
export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const customer = await fetchFilteredCustomers(query);

  return (
    <div className="w-full">
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table customers={customer} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={currentPage} />
      </div>
    </div>
  );
}