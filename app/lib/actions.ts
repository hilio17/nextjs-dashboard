"use server"
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

// const FormSchema = z.object({
//   id: z.string(),
//   customerId: z.string(),
//   amount: z.coerce.number(),
//   status: z.enum(['pending', 'paid']),
//   date: z.string(),
// });

export async function authenticate(prevState: string | undefined, formData: FormData,) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciales Invalidas.';
        default:
          return 'Algo salió mal.';
      }
    }
    throw error;
  }
}

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Por favor seleccione un cliente.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Por favor ingresa una cantidad mayor a $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Por favor seleccione un estado de factura.',
  }),
  date: z.string(),
});

const FromSchemaCustomer = z.object({
  id: z.string(),
  name: z.string({ invalid_type_error: "Por favor llene este campo" }),
  email: z.string({ invalid_type_error: "Por favor llene este campo" }).email(),
  image_url: z.string({ invalid_type_error: "Por favor llene este campo" })
})

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type StateCustomers = {
  errors?: {
    name?: string[];
    email?: string[];
    image_url?: string[];
  };
  message?: string | null;
};

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {

  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields?.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];


  try {
    await sql` INSERT INTO invoices (customer_id, amount, status, date) VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`;
  } catch (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }




  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}



const CreateCustomers = FromSchemaCustomer.omit({id: true})

export async function createCustomers(prevState: StateCustomers, formData: FormData) {

  
          const validatedFields = CreateCustomers.safeParse({
            name: formData.get('name'),
            email: formData.get('email'),
            image_url: formData.get('image_url'),
          });

          console.log(validatedFields)
          if (!validatedFields.success) {
            return {
              errors: validatedFields.error.flatten().fieldErrors,
              message: 'Missing Fields. Failed to Create Invoice.',
            };
          }
        
          const { name, email, image_url } = validatedFields?.data;

          try {
            await sql` INSERT INTO customers (name, email, image_url) VALUES (${name}, ${email}, ${image_url})`;
          } catch (error) {
            console.log(error)
            return {
              message: 'Database Error: Failed to Create Customer.',
            };
          }

          revalidatePath('/dashboard/customers');
          redirect('/dashboard/customers');
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, prevState: State, formData: FormData,) {

  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;

  } catch (error) {
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }



  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (error) {
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
}

