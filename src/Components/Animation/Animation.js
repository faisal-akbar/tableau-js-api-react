import React, { useEffect, useState } from 'react';
import './Animation.css';

const { tableau } = window;

const Animation = () => {
    document.title = 'Animation';
    const [viz, setViz] = useState(null);
    const [yearFilter, setYearFilter] = useState([]);
    const [timer, setTimer] = useState(1000);
    const [disabled, setDisabled] = useState('disabled');

    const url =
        'https://public.tableau.com/views/React-Tableau-js-api-Animation/React-Tableau-js-api-Animation';

    const initViz = () => {
        const yearArr = [...Array(2021 + 1).keys()].slice(1960);
        // console.log("year",yearArr)
        setYearFilter(yearArr);
        const containerDiv = document.getElementById('container');
        const options = {
            hideTabs: true,
            hideToolbar: true,
            Year: yearArr[0],

            onFirstInteractive() {
                console.log('This viz is interactive.');
                setDisabled('');
            },
        };
        setViz(new tableau.Viz(containerDiv, url, options));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(initViz, []);

    let filterInterval;

    const startAnimate = async () => {
        console.log('Animation Starting');
        const sheet = await viz.getWorkbook().activateSheetAsync('React-Tableau-js-api-Animation');
        let yearInterval = yearFilter[0];
        filterInterval = setInterval(() => {
            sheet.applyFilterAsync('Year', yearInterval, tableau.FilterUpdateType.REPLACE);
            yearInterval++;
            if (yearInterval === yearFilter[yearFilter.length - 1]) {
                clearInterval(filterInterval);
            }
        }, timer);
    };

    const stopAnimate = () => {
        console.log('Stopping the animation...');
        clearInterval(filterInterval);
    };

    return (
        <div className="d-flex flex-column align-items-center mt-4">
            <h3>Every {timer} miliseconds</h3>
            <p>
                <strong>Note:</strong> 1 second (1000ms - default speed) is about the fastest
                animation speed
            </p>
            <div className="animationContainer d-flex justify-content-center align-items-center my-2">
                <input
                    disabled={disabled}
                    className="form-control w-25"
                    placeholder="Animation in ms"
                    onChange={(e) => setTimer(e.target.value)}
                />
                <button
                    disabled={disabled}
                    type="button"
                    className="btn btn-secondary mx-2"
                    onClick={() => startAnimate()}
                >
                    Start
                </button>
                <button
                    disabled={disabled}
                    type="button"
                    className="btn btn-secondary mr-2"
                    onClick={() => stopAnimate()}
                >
                    Stop
                </button>
            </div>
            <div className="animationStyle" id="container" />
        </div>
    );
};

export default Animation;
