import React from 'react';
import SimpleNavBar from '../../components/SimpleNavBar';

function PageNotFound() {
    return (
        <>
         <SimpleNavBar></SimpleNavBar>
        <div className="mt-5">
            <h1 className='text-center text-muted'>Esta página no existe...</h1>
        </div>
        </>
     );
}

export default PageNotFound;