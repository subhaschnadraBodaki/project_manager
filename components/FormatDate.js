import React from "react";

export default function formatDate (input) {
    var datePart = input.match(/\d+/g),
    year = datePart[0].substring(0,4), // get only two digits
    month = datePart[1], day = datePart[2];
  
    return day+'-'+month+'-'+year
  }