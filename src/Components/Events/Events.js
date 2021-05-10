import React, { useEffect, useState } from 'react';

const { tableau } = window;

const Events = () => {
    document.title = 'Respond To Event';
    // eslint-disable-next-line no-unused-vars
    const [newViz, setViz] = useState(null);
    const [data, setData] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [selectedParam, setSelectedParam] = useState(null);
    // const [disabled, setDisabled] = useState('disabled');

    const url = 'https://public.tableau.com/views/ReactTableaujsapi-RegionalSampleWorkbook/College';

    const initViz = () => {
        const containerDiv = document.getElementById('vizContainer');
        const options = {
            hideTabs: true,
            hideToolbar: true,
            onFirstInteractive() {
                console.log('This viz is interactive.');
                listenToMarksSelection();
                // setDisabled('');
            },
        };
        const viz = new tableau.Viz(containerDiv, url, options);
        setViz(viz);
        const listenToMarksSelection = () => {
            viz.addEventListener(tableau.TableauEventName.MARKS_SELECTION, onMarksSelection);
            viz.addEventListener(tableau.TableauEventName.FILTER_CHANGE, getFilterSelection);
            viz.addEventListener(
                tableau.TableauEventName.PARAMETER_VALUE_CHANGE,
                getParameterSelection
            );
        };
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(initViz, []);

    // const onMarksSelection = (marksEvent) => {
    //     setData(null);
    //     marksEvent.getMarksAsync().then((marks) => {
    //         for (let markIndex = 0; markIndex < marks.length; markIndex++) {
    //             const pairs = marks[markIndex].getPairs();
    //             setData(pairs);
    //         }
    //     });
    // };

    // MARK SELECTION
    const onMarksSelection = (marksEvent) => {
        setData(null);
        const markData = [];
        let selectedData = {};

        marksEvent.getMarksAsync().then((marks) => {
            console.log('marks', marks[0].getPairs());
            for (let markIndex = 0; markIndex < marks.length; markIndex++) {
                const pairs = marks[markIndex].getPairs();

                for (let pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
                    const pair = pairs[pairIndex];
                    console.log('pair', pair);

                    selectedData = {
                        fieldName: pair.fieldName,
                        formattedValue: pair.formattedValue,
                    };
                    markData.push(selectedData);
                }
            }
            setData(markData);
        });
    };

    // FILTER SELECTION
    const getFilterSelection = (filterEvent) => {
        setSelectedFilter(null);
        const filterData = [];
        // const data2 = {};
        // const that = this;
        // console.log("filterEvent", filterEvent);
        filterEvent.getFilterAsync().then((filter) => {
            const filterName = filter.getFieldName();
            // console.log('filterName', filterName);
            const appliedValues = filter.getAppliedValues();
            console.log(appliedValues);
            // const filterValue = JSON.stringify(appliedValues);
            // const appliedData = [];
            // for (let valueIndex = 0; valueIndex < appliedValues.length; valueIndex++) {
            //     appliedData.push(appliedValues[valueIndex].formattedValue);
            // }
            filterData.push({
                filterName,
                filterValues: appliedValues,
            });
            // filterData.push(data2);
            console.log(filterData);
            setSelectedFilter(filterData);
        });
    };

    // PARAMETER SELECTION
    const getParameterSelection = (parameterEvent) => {
        setSelectedParam(null);
        const parameterData = [];
        // console.log('parameterEvent', parameterEvent);
        parameterEvent.getParameterAsync().then((param) => {
            const parameterName = param.getName();
            const parameterType = param.getDataType();
            const parameterValue = param.getCurrentValue().formattedValue;

            parameterData.push({
                parameterName,
                parameterType,
                parameterValue,
            });
            setSelectedParam(parameterData);
        });
    };

    const BuildCard = () => {
        const items = data.map((e, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} className="col-md-4 mb-3">
                <div className="card h-100 w-100">
                    <div className="card-body">
                        <div className="d-flex justify-content-center align-content-center align-items-center">
                            <div>
                                <h1 style={{ fontSize: '20px' }} className="card-title mb-0">
                                    Field Name: {e.fieldName}
                                </h1>
                                <p style={{ fontSize: '20px' }} className="card-text">
                                    Value: {e.formattedValue}
                                </p>{' '}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
        return items;
    };

    const BuildFilter = () => {
        const items = selectedFilter.map((e, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} className="col-md-12 mb-3">
                <div className="card h-100 w-100">
                    <div className="card-body">
                        <div className="d-flex justify-content-center align-content-center align-items-center">
                            <div>
                                <h1 style={{ fontSize: '20px' }} className="card-title mb-0">
                                    Filter Name: {e.filterName}
                                </h1>
                                <p style={{ fontSize: '20px' }} className="card-text">
                                    Filter Value:
                                    <ul>
                                        {e.filterValues.map((v) => (
                                            <li>{v.formattedValue}</li>
                                        ))}
                                    </ul>
                                </p>{' '}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
        return items;
    };

    const BuildParam = () => {
        const items = selectedParam.map((e, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} className="col-md-12 mb-2">
                <div className="card h-100 w-100">
                    <div className="card-body">
                        <div className="d-flex justify-content-center align-content-center align-items-center">
                            <div>
                                <h1 style={{ fontSize: '20px' }} className="card-title mb-0">
                                    Parameter Name: {e.parameterName}
                                </h1>
                                <p style={{ fontSize: '20px' }} className="card-text">
                                    Parameter Type: {e.parameterType}
                                    <br />
                                    Parameter Value: {e.parameterValue}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
        return items;
    };

    return (
        <div className="d-flex flex-column align-items-center mt-4">
            <div className="vizStyle" id="vizContainer" />
            {data ? (
                <div className="my-2" style={{ width: '850px' }}>
                    <div className="row">
                        {' '}
                        <BuildCard />
                    </div>
                </div>
            ) : null}
            {selectedFilter ? (
                <div className="my-2" style={{ width: '850px' }}>
                    <div className="row">
                        {' '}
                        <BuildFilter />{' '}
                    </div>
                </div>
            ) : null}
            {selectedParam ? (
                <div className="my-2" style={{ width: '850px' }}>
                    <div className="row">
                        <BuildParam />{' '}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Events;
