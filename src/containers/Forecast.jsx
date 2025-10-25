import React from "react";
import { useEffect, useState } from "react";
import Carousel from "../components/Carrusel";

export default function Forecast(props) {


    return (  
    <div>
       <Carousel days={props.days} />      
    </div>
    );
}

