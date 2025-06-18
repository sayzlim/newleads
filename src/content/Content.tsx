import { JSX } from 'react';

export default function Content(): JSX.Element {
  return (
    <div id='my-ext' className='p-4 space-y-2 bg-white shadow rounded' data-theme='light'>
      <h2 className='text-lg font-bold'>Generated Leads</h2>
      <div id='leads-container'>No leads generated yet.</div>
    </div>
  );
}
