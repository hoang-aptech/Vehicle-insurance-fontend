const VietnamIcon = ({ width = 21, height = 20 }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#a)">
                <rect x="0.333" y="2.858" width="20" height="14.286" rx="2" fill="#fff"></rect>
                <mask
                    id="b"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="2"
                    width="21"
                    height="16"
                    style={{ maskType: 'alpha' }} // React uses camelCase and JS object for styles
                >
                    <rect x="0.333" y="2.858" width="20" height="14.286" rx="2" fill="#fff"></rect>
                </mask>
                <g mask="url(#b)">
                    <path fill="#EA403F" d="M.333 2.858h20v14.286h-20z"></path>
                    <path
                        fillRule="evenodd" // Corrected for React
                        clipRule="evenodd" // Corrected for React
                        d="m10.334 11.673-2.52 1.795.93-2.95-2.486-1.841 3.093-.028.983-2.934.982 2.934 3.093.028-2.486 1.84.93 2.951-2.52-1.795Z"
                        fill="#FFFE4E"
                    ></path>
                </g>
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="#fff" d="M.333 0h20v20h-20z"></path>
                </clipPath>
            </defs>
        </svg>
    );
};

const UserIcon = ({ width = 18, height = 18, className }) => (
    <svg
        className={className}
        width={width}
        height={height}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0_4828_4386)">
            <path
                d="M9 9C10.6575 9 12 7.6575 12 6C12 4.3425 10.6575 3 9 3C7.3425 3 6 4.3425 6 6C6 7.6575 7.3425 9 9 9ZM9 10.5C6.9975 10.5 3 11.505 3 13.5V15H15V13.5C15 11.505 11.0025 10.5 9 10.5Z"
                fill="white"
            ></path>
        </g>
        <defs>
            <clipPath id="clip0_4828_4386">
                <rect width={width} height={height} fill="white"></rect>
            </clipPath>
        </defs>
    </svg>
);

export { VietnamIcon, UserIcon };
