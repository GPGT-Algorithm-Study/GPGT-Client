import React from 'react';

function WarningIcon({ warning }) {
  if (warning === 1) {
    return (
      <svg
        width="40"
        height="40"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.5 0C10.976 0 0 10.976 0 24.5C0 38.024 10.976 49 24.5 49C38.024 49 49 38.024 49 24.5C49 10.976 38.024 0 24.5 0Z"
          fill="#EFEFEF"
        />
        <path
          d="M24.5 24.5C10.1406 24.5 0 25 0 25C0 10.0883 10.1406 0 24.5 0C24.5 0 24.5 9.58831 24.5 24.5Z"
          fill="#F24343"
        />
      </svg>
    );
  } else if (warning === 2) {
    return (
      <svg
        width="40"
        height="40"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24.5" cy="24.5" r="24.5" fill="#EFEFEF" />
        <path
          d="M24.5 6.10352e-05C10.976 6.10352e-05 0 10.9761 0 24.5001C0 24.5001 10.976 24.5001 24.5 24.5001C38.024 24.5001 49 24.5001 49 24.5001C49 10.9761 38.024 6.10352e-05 24.5 6.10352e-05Z"
          fill="#F24343"
        />
      </svg>
    );
  } else if (warning === 3) {
    return (
      <svg
        width="40"
        height="40"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.5 6.10352e-05C10.976 6.10352e-05 0 10.9761 0 24.5001C0 38.0241 10.976 49.0001 24.5 49.0001C38.024 49.0001 49 38.0241 49 24.5001C49 10.9761 38.024 6.10352e-05 24.5 6.10352e-05Z"
          fill="#EFEFEF"
        />
        <path
          d="M24 23.52C38.6525 23.52 49 23 49 23C49 38.5082 38.6525 49 24 49C24 49 24 39.0282 24 23.52Z"
          fill="#F24343"
        />
        <path
          d="M24.5 0C10.976 0 0 11.2 0 25C0 25 10.976 25 24.5 25C38.024 25 49 25 49 25C49 11.2 38.024 0 24.5 0Z"
          fill="#F24343"
        />
      </svg>
    );
  } else if (warning === 4) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 50 50"
        fill="none"
      >
        <circle cx="25" cy="25" r="25" fill="#F24343" />
      </svg>
    );
  } else {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 50 50"
        fill="none"
      >
        <circle cx="25" cy="25" r="25" fill="#EFEFEF" />
      </svg>
    );
  }
}

export default WarningIcon;
