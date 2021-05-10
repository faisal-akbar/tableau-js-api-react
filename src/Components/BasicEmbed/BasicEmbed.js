import React, { useEffect, useRef } from 'react';

const { tableau } = window;

const BasicEmbed = () => {
    document.title = 'Basic Embed';
    // Set up the arguments to pass into the Tableau Viz function
    const ref = useRef(null);
    const url = 'https://public.tableau.com/views/ReactTableaujsapi-RegionalSampleWorkbook/Obesity';

    const options = {
        hideTabs: true,
        hideToolbar: true,
        onFirstInteractive() {
            console.log('The viz is loaded');
        },
    };

    // This function will be run on page load to initialize our viz.
    const initViz = () => {
        new tableau.Viz(ref.current, url, options);
    };

    // Initialize viz when the page loadsyarn
    useEffect(() => {
        initViz();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // useEffect(initViz, []);

    return (
        <>
            <div className="d-flex justify-content-center mt-4">
                <div className="vizStyle" ref={ref} />
            </div>
        </>
    );
};

export default BasicEmbed;
