import React from 'react';

function TeamIcon({ height, width, team }) {
  if (team == 0)
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 170 233"
        fill="none"
      >
        <g clipPath="url(#clip0_20_185)">
          <path d="M0 0V191.014L84.9023 233L170 191.014V0H0Z" fill="#FF6C6C" />
          <path
            d="M0 154.281V172.447L84.9023 214.433L170 172.447V154.281L84.9023 196.266L0 154.281Z"
            fill="white"
          />
          <path
            d="M66.8489 71.1733L60.6138 64.6237L55.7296 69.7829L61.9301 76.3325L66.8489 71.1733ZM57.2884 91.8833H46.8965V99.2013H57.2884V91.8833ZM88.4639 55.4762H81.536V66.2703H88.4639V55.4762ZM114.27 69.7829L109.386 64.6237L103.186 71.1733L108.07 76.3325L114.27 69.7829ZM103.151 119.911L109.352 126.498L114.236 121.338L108.001 114.789L103.151 119.911ZM112.712 91.8833V99.2013H123.103V91.8833H112.712ZM85 73.5883C73.5343 73.5883 64.2163 83.431 64.2163 95.5423C64.2163 107.654 73.5343 117.496 85 117.496C96.4657 117.496 105.784 107.654 105.784 95.5423C105.784 83.431 96.4657 73.5883 85 73.5883ZM81.536 135.608H88.4639V124.814H81.536V135.608ZM55.7296 121.302L60.6138 126.461L66.8143 119.875L61.9301 114.716L55.7296 121.302Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_20_185">
            <rect width="170" height="233" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  else
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 170 233"
        fill="none"
      >
        <g clipPath="url(#clip0_24_229)">
          <path d="M0 0V191.014L84.9023 233L170 191.014V0H0Z" fill="#FFD643" />
          <path
            d="M0 154.281V172.447L84.9023 214.433L170 172.447V154.281L84.9023 196.266L0 154.281Z"
            fill="white"
          />
          <ellipse cx="92" cy="87.5" rx="42" ry="41.5" fill="white" />
          <ellipse cx="117" cy="86" rx="33" ry="30" fill="#FFD643" />
        </g>
        <defs>
          <clipPath id="clip0_24_229">
            <rect width="170" height="233" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
}

export default TeamIcon;
