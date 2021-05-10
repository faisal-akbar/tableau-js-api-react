import React, { useEffect, useState } from 'react';
import './GetData.css';

const { tableau } = window;

const GetData = () => {
    document.title = 'Get Data';
    const [viz, setViz] = useState(null);
    const [data, setData] = useState(null);
    const [rows, setRows] = useState(10);
    const [disabled, setDisabled] = useState('disabled');

    const url = 'https://public.tableau.com/views/ReactTableaujsapi-RegionalSampleWorkbook/Storms';

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

    const GetUnderlyingData = () => {
        const selectedSheet = viz
            .getWorkbook()
            .getActiveSheet()
            .getWorksheets()
            .get('Storm Map Sheet');

        const options = {
            maxRows: rows,
            ignoreAliases: false,
            ignoreSelection: true,
            includeAllColumns: false,
        };

        selectedSheet.getUnderlyingDataAsync(options).then((t) => {
            setData(t.getData());
        });
    };

    function BuildTable() {
        // console.log(data);
        return (
            <div>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        );
    }

    return (
        <div className="d-flex flex-column align-items-center mt-4">
            <div className="getDataContainer d-flex justify-content-center align-items-center my-2">
                <input
                    disabled={disabled}
                    className="form-control w-25  mr-2"
                    type="number"
                    placeholder="Max Number of Rows"
                    onChange={(e) => {
                        setRows(e.target.value);
                    }}
                />
                <button
                    type="button"
                    disabled={disabled}
                    className="btn btn-secondary"
                    onClick={() => GetUnderlyingData()}
                >
                    Get Data
                </button>
            </div>
            <div className="vizStyle" id="container" />
            <div className={data ? 'outputData my-3' : ''}>
                {data ? (
                    <div className="d-flex flex-column">
                        <h5 className="mt-3 mb-2">Output Data:</h5>
                        <BuildTable />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default GetData;
