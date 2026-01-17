import { createFileRoute } from '@tanstack/react-router';

import { SheetsMethods } from '@/libs/sheets';

const Sheets = new SheetsMethods();

export const Route = createFileRoute('/api/sheets')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const id = url.searchParams.get('id');

          if (!id) {
            const data = await Sheets.findAll();
            return new Response(JSON.stringify({ data }), {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            });
          } else {
            const data = await Sheets.findById(id);
            return new Response(JSON.stringify({ data }), {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            });
          }
        } catch (error) {
          console.log('GET handler ~ error:', error);
          return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      },

      POST: async ({ request }) => {
        try {
          let newData = await request.json();
          if (typeof newData === 'string') newData = JSON.parse(newData);

          const result = await Sheets.appendRow(newData);
          if (!result) throw new Error('Failed Add Row');

          return new Response(
            JSON.stringify({
              message: 'Successfully Add Row',
              data: { ...result, ...newData },
            }),
            {
              status: 201,
              headers: { 'Content-Type': 'application/json' },
            },
          );
        } catch (error) {
          console.log('POST handler ~ error:', error);
          return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      },

      PUT: async ({ request }) => {
        try {
          let newData = await request.json();
          if (typeof newData === 'string') newData = JSON.parse(newData);

          if (!newData?.id) throw new Error('No ID found in request');

          const result = await Sheets.updateRow(newData);
          if (!result) throw new Error(`Failed Updated for ID: ${newData.id}`);

          return new Response(
            JSON.stringify({
              message: `Successfully Updated for ID: ${newData.id}`,
            }),
            {
              status: 201,
              headers: { 'Content-Type': 'application/json' },
            },
          );
        } catch (error) {
          console.log('PUT handler ~ error:', error);
          return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      },
    },
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div></div>;
}
