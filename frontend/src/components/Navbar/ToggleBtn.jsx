import React from 'react';

export default function ToggleBtn({thememode,toggle}) {
  return (
 
      <div className='box-border mt-2'>

      <label 
      class="relative inline-flex items-center mb-5 cursor-pointer mt-2"

      >
       <input 
       type="checkbox" 
       value={thememode}
       class="sr-only peer"
       onChange={toggle}
       checked={thememode==="dark"}
       />
       <div class="w-11 h-6 bg-green-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-100 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-400"></div>
        {/* <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Default toggle</span> */}
       </label>
      </div>

  );
}