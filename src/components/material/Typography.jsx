"use client"

import { Typography } from "@material-tailwind/react";

//pass props to the component like variant, color
export default function TypographyComponent(props) {
    return (
        <Typography {...props} />
    );
}