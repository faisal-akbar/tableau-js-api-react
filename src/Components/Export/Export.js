import {
    faFileCsv,
    faFileExcel,
    faFileExport,
    faFilePdf,
    faFilePowerpoint,
    faImage // eslint-disable-line
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './Export.css';

const { tableau } = window;

const Export = () => {
    document.title = 'Export';
    const [viz, setViz] = useState(null);
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

    // Export Functions:
    const exportToPDF = () => {
        viz.showExportPDFDialog();
    };

    const exportToPowerPoint = () => {
        viz.showExportPowerPointDialog();
    };
    const exportToImage = () => {
        viz.showExportImageDialog();
    };
    const exportToCSV = () => {
        viz.showExportCrossTabDialog();
    };
    const exportToExcel = () => {
        viz.exportCrossTabToExcel();
    };
    const downloadDialog = () => {
        viz.showDownloadDialog();
    };

    return (
        <div className="d-flex flex-column align-items-center mt-4">
            <div className="buttonContainer my-2 d-flex justify-content-center align-items-center">
                <button
                    disabled={disabled}
                    className="btn text-light"
                    type="button"
                    onClick={exportToPDF}
                >
                    <FontAwesomeIcon icon={faFilePdf} size="1x" /> PDF
                </button>
                <div className="vl" />
                <button
                    disabled={disabled}
                    className="btn text-light"
                    type="button"
                    onClick={exportToPowerPoint}
                >
                    <FontAwesomeIcon icon={faFilePowerpoint} size="1x" /> PowerPoint
                </button>
                <div className="vl" />
                <button
                    disabled={disabled}
                    className="btn text-light"
                    type="button"
                    onClick={exportToImage}
                >
                    <FontAwesomeIcon icon={faImage} size="1x" /> Image
                </button>
                <div className="vl" />
                <button
                    disabled={disabled}
                    className="btn text-light"
                    type="button"
                    onClick={exportToCSV}
                >
                    <FontAwesomeIcon icon={faFileCsv} size="1x" /> CSV
                </button>
                <div className="vl" />
                <button
                    disabled={disabled}
                    className="btn text-light"
                    type="button"
                    onClick={exportToExcel}
                >
                    <FontAwesomeIcon icon={faFileExcel} size="1x" /> Excel
                </button>
                <div className="vl" />
                <button
                    disabled={disabled}
                    className="btn text-light"
                    type="button"
                    onClick={downloadDialog}
                >
                    <FontAwesomeIcon icon={faFileExport} size="1x" /> Export
                </button>
            </div>

            <div className="vizStyle" id="container" />
        </div>
    );
};

export default Export;
