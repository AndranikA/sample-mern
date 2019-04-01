import spinner from './spinner.gif';
import  React from 'react';

export default () => {
  return (
    <div>
      <img src={spinner} alt="Loading..." style={{width: '200px', margin: 'auto', display: 'block'}}/>
    </div>
  )
}