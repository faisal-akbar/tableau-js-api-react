import React from 'react';

const Footer = () => (
    <footer className="mt-3 py-2">
        {/* <!-- Copyright --> */}
        <div className="text-center  py-2">
            &copy;{' '}
            {new Date().getFullYear() === 2021 ? 2021 : `${2021} - ${new Date().getFullYear()}`}{' '}
            Copyright:{' '}
            <a className="text-info" href="http://dsfaisal.com/" target="_blank" rel="noreferrer">
                Faisal Akbar | dsfaisal.com
            </a>
        </div>
    </footer>
);

export default Footer;
