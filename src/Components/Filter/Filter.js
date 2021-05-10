import React, { useEffect, useState } from 'react';
import './Filter.css';

const { tableau } = window;

const Filter = () => {
    document.title = 'Filter';
    const [viz, setViz] = useState(null);
    const [yearFilter, setYearFilter] = useState('');
    const [collegeFilter, setCollegeFilter] = useState('');
    const [disabled, setDisabled] = useState('disabled');
    // Create filter list:
    const yearList = [
        {
            value: '',
            display: 'All',
        },
        {
            value: '2013',
            display: '2013',
        },
        {
            value: '2014',
            display: '2014',
        },
    ];

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
            'Academic Year': yearFilter,
            College: collegeFilter,
            onFirstInteractive() {
                console.log('This viz is interactive.');
                setDisabled('');
            },
        };
        setViz(new tableau.Viz(containerDiv, url, options));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(initViz, []);

    // Year Filter:
    const filterYear = (year) => {
        console.log(year);
        const sheet = viz.getWorkbook().getActiveSheet();
        if (year === '') {
            sheet.clearFilterAsync('Academic Year');
            setYearFilter('');
        } else {
            sheet.applyFilterAsync('Academic Year', year, tableau.FilterUpdateType.REPLACE);
            setYearFilter(year);
        }
    };

    // College Filter
    const filterCollege = (college) => {
        // console.log(college);
        const sheet = viz.getWorkbook().getActiveSheet();
        if (college === '') {
            sheet.clearFilterAsync('College');
            setCollegeFilter('');
        } else {
            sheet.applyFilterAsync('College', college, tableau.FilterUpdateType.REPLACE);
            setCollegeFilter(college);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center mt-4">
            <div className="filterContainer my-2 d-flex justify-content-center align-items-center">
                {/* <h4>Filter</h4> */}
                <label htmlFor="yearFilter" className="align-items-center text-light pt-2 mr-2">
                    Academic Year
                </label>
                <select
                    disabled={disabled}
                    className="form-control selectFilter"
                    name="yearFilter"
                    value={yearFilter}
                    onChange={(e) => {
                        filterYear(e.target.value);
                    }}
                >
                    {yearList.map((value) => (
                        <option key={value.value} value={value.value}>
                            {value.display}
                        </option>
                    ))}
                </select>
                <div className="vl" />
                <label
                    htmlFor="collegeFilter"
                    className="align-items-center text-light pt-2 mr-2 ml-3"
                >
                    Select College
                </label>
                <select
                    disabled={disabled}
                    className="form-control selectFilter"
                    name="collegeFilter"
                    value={collegeFilter}
                    onChange={(e) => {
                        filterCollege(e.target.value);
                    }}
                >
                    {collegeList.map((value) => (
                        <option key={value.value} value={value.value}>
                            {value.display}
                        </option>
                    ))}
                </select>
            </div>
            <div className="vizStyle" id="container" />
        </div>
    );
};

export default Filter;
