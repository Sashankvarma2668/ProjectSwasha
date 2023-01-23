import React from 'react'

const info = (props) => {
  return (
    <tr className=' border-2 text-center'>
    <td className='border-r-2 text1'>{props.name}</td>
    <td>
   <div className='pt-10'> <a className='text-blue-400 text1'href={props.url} > {props.url} (link is external)</a></div>
  <div className='pb-10'>(External website that opens in a new window)</div>
  </td>
    <td className='border-l-2 text1'>{props.status}</td>
  </tr>
  )
}

export default info