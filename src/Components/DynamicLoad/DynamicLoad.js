import React, { useEffect, useState } from 'react';
import './DynamicLoad.css';
import vizLinks from './vizLinks';

const { tableau } = window;

const DynamicLoad = () => {
    document.title = 'Dynamic Load';
    const [vizList] = useState(vizLinks);
    const [vizCount, setVizCount] = useState(0);
    const [viz, setViz] = useState(null);
    const [disabled, setDisabled] = useState('disabled');

    const initViz = () => {
        const vizDiv = document.getElementById('vizContainer');
        const vizURL = vizList[vizCount];
        const options = {
            hideTabs: true,
            onFirstInteractive() {
                console.log('This viz is interactive.');
                setDisabled('');
            },
        };
        if (viz) {
            viz.dispose();
            setViz(null);
        }
        setViz(new tableau.Viz(vizDiv, vizURL, options));
    };

    useEffect(initViz, [vizCount]); // eslint-disable-line

    const checkMinValue = (value) => (value > 1 ? value - 1 : 0);

    const checkMaxValue = (value, max) => (value < max - 1 ? value + 1 : max - 1);

    return (
        <div className="d-flex flex-column align-items-center mt-4">
            <div className="buttonContainer my-2 d-flex justify-content-center ">
                <button
                    disabled={disabled}
                    type="button"
                    className="btn btn-light btn-sm mr-2 w-25"
                    onClick={() => setVizCount(checkMinValue(vizCount))}
                >
                    Previous
                </button>

                <button
                    disabled={disabled}
                    type="button"
                    className="btn btn-light btn-sm ml-2 w-25"
                    onClick={() => setVizCount(checkMaxValue(vizCount, vizList.length))}
                >
                    Next
                </button>
            </div>
            <div className="vizStyle" id="vizContainer" />
        </div>
    );
};

export default DynamicLoad;
