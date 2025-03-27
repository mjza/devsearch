import { SVGAttributes } from 'react';

interface AppLogoIconProps extends SVGAttributes<SVGElement> {
    fill?: string;
    size?: number | string;
    background?: string;
}

export default function AppLogoIcon({
    fill = '#7282A3',
    background,
    ...props
}: AppLogoIconProps) {
    return (
        <svg
            width="442.01562"
            height="464.02606"
            viewBox="0 0 442.01562 464.02606"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            {background && (
                <rect
                    width="100%"
                    height="100%"
                    fill={background}
                />
            )}
            <g transform="matrix(1.5563709,0,0,1.5563709,-147.85524,-147.85524)">
                <g>
                    <path
                        fill={fill}
                        d="m 193.72951,187.97429 c -0.90502,3.1629 -1.73965,6.10223 -2.13352,8.73304 -0.86929,2.24891 -1.61169,4.81709 -2.38265,7.51079 -2.80474,9.76262 -12.36083,72.53055 -10.56173,73.04723 1.80134,0.52402 27.45704,-58.09985 30.25655,-67.86953 0.90531,-3.15989 1.73994,-6.09922 2.13352,-8.73304 0.86928,-2.2489 1.61169,-4.81708 2.38564,-7.51108 2.80175,-9.76233 12.35948,-72.52891 10.56203,-73.04423 -1.80133,-0.52403 -27.45704,58.09985 -30.25984,67.86682 z m 10.90631,13.92678 c -1.54064,1.8772 -4.31003,2.15294 -6.18888,0.61094 -1.87886,-1.54199 -2.15024,-4.31332 -0.6096,-6.19053 1.54199,-1.87885 4.31168,-2.15159 6.19053,-0.60959 1.87886,1.54199 2.14994,4.31032 0.60795,6.18918 z"
                        style={{ strokeWidth: 2.13211 }}
                    />
                    <circle
                        cx="200"
                        cy="200"
                        r="100"
                        stroke={fill}
                        strokeWidth="10"
                        fill="none"
                    />
                    <text x="200" y="125" textAnchor="middle" fill={fill} fontSize="20px">N</text>
                    <text x="200" y="290" textAnchor="middle" fill={fill} fontSize="20px">S</text>
                    <text x="275" y="205" textAnchor="middle" fill={fill} fontSize="20px">E</text>
                    <text x="125" y="205" textAnchor="middle" fill={fill} fontSize="20px">W</text>
                    <rect
                        x="270"
                        y="270"
                        width="160"
                        height="20"
                        rx="10"
                        ry="10"
                        transform="rotate(45,270,270)"
                        fill={fill}
                    />
                </g>
            </g>
        </svg>
    );
}
