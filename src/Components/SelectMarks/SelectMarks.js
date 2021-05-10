import React, { useEffect, useState } from 'react';
import './SelectedMarks.css';

const { tableau } = window;

const SelectMarks = () => {
    document.title = 'Select Marks';
    const [viz, setViz] = useState(null);
    const [selectedCollege, setSelectedCollege] = useState('');
    const [addSelectedCollege, setAddSelectedCollege] = useState('');
    const [disabled, setDisabled] = useState('disabled');

    const collegeList = [
        {
            value: '',
            display: 'All',
        },
        {
            value: 'Arts & Sciences',
            display: 'Arts & Sciences',
        },
        {
            value: 'Business',
            display: 'Business',
        },
        {
            value: 'Communication',
            display: 'Communication',
        },
        {
            value: 'Education',
            display: 'Education',
        },
        {
            value: 'Engineering',
            display: 'Engineering',
        },
        {
            value: 'Music',
            display: 'Music',
        },
        {
            value: 'Public Affairs',
            display: 'Public Affairs',
        },
        {
            value: 'Public Health',
            display: 'Public Health',
        },
    ];

    const url =
        'https://public.tableau.com/views/React-Tableau-js-api-animation-RegionalSampleWorkbook/College';

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

    const selectCollege = (collegeName) => {
        const sheet = viz.getWorkbook().getActiveSheet().getWorksheets().get('CollegeChart');

        console.log(sheet);
        if (collegeName === '') {
            sheet.clearSelectedMarksAsync();
            setSelectedCollege('');
        } else {
            sheet.selectMarksAsync('College', collegeName, tableau.SelectionUpdateType.REPLACE);
            setSelectedCollege(collegeName);
        }
    };

    const addCollegeToSelection = (collegeName) => {
        const sheet = viz.getWorkbook().getActiveSheet().getWorksheets().get('CollegeChart');
        if (collegeName === '') {
            sheet.clearSelectedMarksAsync();
            setAddSelectedCollege('');
        } else {
            sheet.selectMarksAsync('College', collegeName, tableau.SelectionUpdateType.ADD);
            setAddSelectedCollege(collegeName);
        }
    };

    const clearCollegeSelection = () => {
        const sheet = viz.getWorkbook().getActiveSheet().getWorksheets().get('CollegeChart');
        sheet.clearSelectedMarksAsync();
        setSelectedCollege('');
        setAddSelectedCollege('');
    };

    return (
        <div className="d-flex flex-column align-items-center mt-4">
            <div className="selectMarksContainer my-2 d-flex justify-content-center align-items-center">
                <label
                    htmlFor="collegeMarks"
                    className="align-items-center text-light pt-2 mr-2 ml-3"
                >
                    Select a value
                </label>
                <select
                    disabled={disabled}
                    className="form-control selectMarks"
                    name="collegeMarks"
                    value={selectedCollege}
                    onChange={(e) => {
                        selectCollege(e.target.value);
                    }}
                >
                    {collegeList.map((value) => (
                        <option key={value.value} value={value.value}>
                            {value.display}
                        </option>
                    ))}
                </select>

                <label
                    htmlFor="addCollegeMarks"
                    className="align-items-center text-light pt-2 mr-2 ml-3"
                >
                    Add to the Selection
                </label>
                <select
                    disabled={disabled}
                    className="form-control selectMarks"
                    name="addCollegeMarks"
                    value={addSelectedCollege}
                    onChange={(e) => {
                        addCollegeToSelection(e.target.value);
                    }}
                >
                    {collegeList.map((value) => (
                        <option key={value.value} value={value.value}>
                            {value.display}
                        </option>
                    ))}
                </select>
                <button
                    disabled={disabled}
                    type="button"
                    className="btn btn-info ml-2 btn-marks"
                    onClick={() => clearCollegeSelection()}
                >
                    Clear all
                </button>
            </div>
            <div className="vizStyle" id="container" />
        </div>
    );
};

export default SelectMarks;
