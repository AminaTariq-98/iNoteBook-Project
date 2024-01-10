import React from 'react'

export default function Alert(props) {

   const captilized= (word)=>{
    if(word === 'danger'){
      word = 'error'
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
   }
   
  return (
    <div style={{height:"55px"}}> 
  { props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
    <strong>{captilized (props.alert.type)}</strong> {captilized (props.alert.msg)}
  </div>}
  </div>
  )
}
