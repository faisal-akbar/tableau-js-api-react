// import { css } from '@emotion/core';
import { css } from '@emotion/react';
import React from 'react';
import BounceLoader from 'react-spinners/BounceLoader';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: none;
`;

const PreLoader = ({ loading }) => (
    <div className="text-center col-12 py-2 my-2">
        <BounceLoader css={override} size={70} color="#FBD062" loading={loading} />
    </div>
);

export default PreLoader;
