import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className=' black b f3'>
                {'This magic brain will detect faces in your pictures!!!'}
            </p>
            <div className='center'>
                <div className=' center form pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange} placeholder='Enter your picture link'/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>DETECT!</button>
                </div>
            </div>
        </div>
    );
}
export default ImageLinkForm;
