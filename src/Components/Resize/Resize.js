import React, { useEffect, useState } from 'react';

const { tableau } = window;

const Resize = () => {
    document.title = 'Get Data';
    const [viz, setViz] = useState(null);
    const [width, setWidth] = useState('750');
    const [height, setHeight] = useState('600');
    const [disabled, setDisabled] = useState('disabled');

    const url =
        'https://public.tableau.com/views/React-Tableau-js-api-animation-RegionalSampleWorkbook/Stocks';

    const initViz = () => {
        const containerDiv = document.getElementById('container');
        const options = {
            hideTabs: true,
            hideToolbar: true,
            onFirstInteractive() {
                console.log('This viz is interactive.');
                setDisabled('');
            },
        };
        setViz(new tableau.Viz(containerDiv, url, options));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(initViz, []);

    const vizStyle = {
        border: '1px solid rgba(0, 0, 0, 0.125)',
        boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.1)',
        borderRadius: '0.25rem',
        display: 'flex',
        justifyContent: 'center',
        padding: '10px',
        margin: '25px',
        width: width + 25,
        height: height + 25,
    };

    const vizResize = () => {
        viz.setFrameSize(parseInt(width, 10), parseInt(height, 10));
    };

    return (
        <div className="d-flex flex-column align-items-center mt-4">
            <div
                style={{ width: '850px' }}
                className="my-2 d-flex justify-content-center align-items-center"
            >
                <input
                    disabled={disabled}
                    className="form-control w-25 mr-2"
                    type="number"
                    placeholder="Width"
                    onChange={(e) => {
                        setWidth(e.target.value);
                    }}
                />
                <input
                    disabled={disabled}
                    className="form-control w-25"
                    type="number"
                    placeholder="Height"
                    onChange={(e) => {
                        setHeight(e.target.value);
                    }}
                />
                <button
                    disabled={disabled}
                    type="button"
                    className="btn btn-info ml-2"
                    onClick={() => vizResize()}
                >
                    Resize
                </button>
            </div>
            <div style={vizStyle} id="container" />
        </div>
    );
};

export default Resize;
