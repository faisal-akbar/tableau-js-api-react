import React, { useEffect, useState } from 'react';
import './Tabs.css';

const { tableau } = window;

const Tabs = () => {
    document.title = 'Tabs';
    const [viz, setViz] = useState(null);
    const [view, setView] = useState('Obesity');
    const [disabled, setDisabled] = useState('disabled');
    const url = 'https://public.tableau.com/views/ReactTableaujsapi-RegionalSampleWorkbook/Obesity';
    const options = {
        hideTabs: true,
        hideToolbar: true,
        onFirstInteractive() {
            console.log('This viz is interactive.');
            setDisabled('');
        },
    };

    const initViz = () => {
        const containerDiv = document.getElementById('container');
        setViz(new tableau.Viz(containerDiv, url, options));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(initViz, []);

    const switchView = (sheet) => {
        const workbook = viz.getWorkbook();
        console.log(workbook);
        workbook.activateSheetAsync(sheet);
        setView(sheet);
    };

    console.log(view);
    return (
        <div className="d-flex flex-column align-items-center mt-4">
            <div className="tabContainer d-flex justify-content-center align-items-center my-2">
                {/* eslint-disable */}
            <ul className="nav nav-tabs">
                <li className={view === "Obesity" ?  "active-tab nav-item mx-2" : "nav-item mx-2"}>
                    <a onClick={() => switchView('Obesity')} className={disabled==="disabled" ? "nav-link disabled": "nav-link" }>Obesity</a>
                </li>
                <li className={view === "College" ?  "active-tab nav-item mx-2" : "nav-item mx-2"}>
                    <a onClick={() => switchView('College')} className={disabled==="disabled" ? "nav-link disabled": "nav-link" }>College</a>
                </li>
                <li className={view === "Economy" ?  "active-tab nav-item mx-2" : "nav-item mx-2"}>
                    <a onClick={() => switchView('Economy')} className={disabled==="disabled" ? "nav-link disabled": "nav-link" }>Economy</a>
                </li>
                <li className={view === "Stocks" ?  "active-tab nav-item mx-2" : "nav-item mx-2"}>
                    <a onClick={() => switchView('Stocks')} className={disabled==="disabled" ? "nav-link disabled": "nav-link" }>Stocks</a>
                </li>
                <li className={view === "Storms" ?  "active-tab nav-item mx-2" : "nav-item mx-2"}>
                    <a onClick={() => switchView('Storms')} className={disabled==="disabled" ? "nav-link disabled": "nav-link" }>Storms</a>
                </li>
                <li className={view === "Flights" ?  "active-tab nav-item mx-2" : "nav-item mx-2"}>
                    <a onClick={() => switchView('Flights')} className={disabled==="disabled" ? "nav-link disabled": "nav-link" }>Flights</a>
                </li>
            </ul>
            </div>
            <div class="vizStyle" id="container" />
        </div>
    );
};

export default Tabs;
