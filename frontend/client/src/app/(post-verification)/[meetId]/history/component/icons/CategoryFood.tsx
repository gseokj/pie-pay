import * as React from "react"
import {SVGProps} from "react";
import theme from "@/styles/theme/theme";

interface SvgComponentProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const FoodIcon: React.FC<SvgComponentProps> = ({color, ...props}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 -960 960 960"
        {...props}
    >
        <path d="M280-600v-240q0-17 11.5-28.5T320-880q17 0 28.5 11.5T360-840v240h40v-240q0-17 11.5-28.5T440-880q17 0 28.5 11.5T480-840v240q0 56-34.5 98T360-446v326q0 17-11.5 28.5T320-80q-17 0-28.5-11.5T280-120v-326q-51-14-85.5-56T160-600v-240q0-17 11.5-28.5T200-880q17 0 28.5 11.5T240-840v240h40Zm400 200h-80q-17 0-28.5-11.5T560-440v-240q0-70 51.5-135T718-880q18 0 30 14t12 33v713q0 17-11.5 28.5T720-80q-17 0-28.5-11.5T680-120v-280Z"
        fill={color || theme.blueGray}/>
    </svg>
)
export default FoodIcon