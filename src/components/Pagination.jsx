// import React, { useState } from 'react';

// const Pagination = ({ postsPerPage, totalPages, itemsToPaginate, paginate }) => {
 
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(itemsToPaginate / postsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <nav>
//       <ul className=''>
//         {pageNumbers.map(number => (
//           <li key={number} className='page-item'>
//             <a onClick={() => paginate(number)} href='#!' className='page-link'>
//               {number}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Pagination;