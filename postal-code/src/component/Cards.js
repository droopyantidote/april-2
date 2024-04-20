import React from 'react'

function Cards({item}) {
  return (
    <div className='card'>
      <p>Name : {item.Name}</p>
      <p>Branch Type : {item.BranchType
}</p>
      <p>Delivery Status : {
item.DeliveryStatus}</p>
      <p>District : {item.
District}</p>
      <p>Division : {item.Division
}</p>
    </div>
  )
}

export default Cards