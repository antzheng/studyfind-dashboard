import moment from "moment";
import { topojson } from "./../topojson";
import { apiToCountryMapping } from "./../constants";
import * as ChartGeo from "chartjs-chart-geo";
import * as d3 from "d3-interpolate";

// --------------------------------- parsing data ---------------------------------

// get date data from each study to visualize
const getDateData = (studies, mode) => {
  const months = Array(12).fill(0);
  let numDisplayed = 0;
  studies.forEach((study) => {
    const date = study[mode];
    if (date !== undefined) {
      numDisplayed += 1;
      if (date.includes(",")) {
        months[moment(date, "MMMM DD, YYYY").month()] += 1;
      } else {
        months[moment(date, "MMMM YYYY").month()] += 1;
      }
    }
  });
  return [months, numDisplayed];
};

// get study age data from each study to visualize
const getStdAgeData = (studies) => {
  const mapping = {
    Child: 0,
    Adult: 1,
    "Older Adult": 2,
  };
  const ageGroups = [0, 0, 0];
  let numDisplayed = 0;
  studies.forEach((study) => {
    if (study.stdAge.length > 0) {
      study.stdAge.forEach((group) => (ageGroups[mapping[group]] += 1));
      numDisplayed += 1;
    }
  });
  return [ageGroups, numDisplayed];
};

// get location data from each study to visualize
const getLocationData = (studies) => {
  const countryData = {};
  let numDisplayed = 0;
  studies.forEach((study) => {
    const mapping = apiToCountryMapping[study.locationCountry];
    if (mapping) {
      countryData[mapping] = (countryData[mapping] || 0) + 1;
      numDisplayed += 1;
    }
  });
  return [countryData, numDisplayed];
};

// --------------------------------- formatting data ---------------------------------

const ageGroups = ["Child", "Adult", "Older Adult"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const colors = [
  "#6ae5b4",
  "#75eac5",
  "#82efd4",
  "#92f3e2",
  "#a3f7ed",
  "#b6fbf7",
  "#c9ffff",
  "#b2f3fa",
  "#9be7f6",
  "#85dbf4",
  "#70cef1",
  "#5ec1ef",
  "#51b3ec",
];

// grab number of colors needed
const sliceColors = (colors, data) => {
  if (data.length >= colors.length) return colors;
  const newColors = [];
  const step = Math.floor((colors.length - 1) / (data.length - 1));
  let i = 0;
  while (newColors.length < data.length && i < colors.length) {
    newColors.push(colors[i]);
    i += step;
  }
  return newColors;
};

// format line chart data
export const formatLineChart = (studies, dataType) => {
  let data = [];
  let title = "";
  let labels = [];
  let numDisplayed = 0;

  // fill in info based on dataType
  if (dataType === "startDate") {
    [data, numDisplayed] = getDateData(studies, "startDate");
    title = "Start Date";
    labels = months;
  } else if (dataType === "endDate") {
    [data, numDisplayed] = getDateData(studies, "endDate");
    title = "End Date";
    labels = months;
  } else if (dataType === "stdAge") {
    [data, numDisplayed] = getStdAgeData(studies);
    title = "Age Group";
    labels = ageGroups;
  }

  // format the dataset
  const dataset = {
    label: title,
    data: data,
    fill: false,
    borderColor: colors[0],
  };

  // specify the options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  return [numDisplayed, labels, dataset, options];
};

// format pie chart data
export const formatPieChart = (studies, dataType) => {
  let data = [];
  let labels = [];
  let numDisplayed = 0;

  // fill in info based on dataType
  if (dataType === "startDate") {
    [data, numDisplayed] = getDateData(studies, "startDate");
    labels = months;
  } else if (dataType === "endDate") {
    [data, numDisplayed] = getDateData(studies, "endDate");
    labels = months;
  } else if (dataType === "stdAge") {
    [data, numDisplayed] = getStdAgeData(studies);
    labels = ageGroups;
  }

  // format the dataset
  const dataset = {
    data: data,
    backgroundColor: sliceColors(colors, data),
  };

  // specify the options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  return [numDisplayed, labels, dataset, options];
};

// format bar chart data
export const formatBarChart = (studies, dataType) => {
  let data = [];
  let title = "";
  let labels = [];
  let numDisplayed = 0;

  // fill in info based on dataType
  if (dataType === "startDate") {
    [data, numDisplayed] = getDateData(studies, "startDate");
    title = "Start Date";
    labels = months;
  } else if (dataType === "endDate") {
    [data, numDisplayed] = getDateData(studies, "endDate");
    title = "End Date";
    labels = months;
  } else if (dataType === "stdAge") {
    [data, numDisplayed] = getStdAgeData(studies);
    title = "Age Group";
    labels = ageGroups;
  }

  // format the dataset
  const dataset = {
    label: title,
    data: data,
    backgroundColor: sliceColors(colors, data),
  };

  // specify the options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  return [numDisplayed, labels, dataset, options];
};

// format world map data
export const formatWorldMap = (studies) => {
  const [countryData, numDisplayed] = getLocationData(studies);
  const countries = ChartGeo.topojson.feature(
    topojson,
    topojson.objects.countries
  ).features;
  const labels = countries.map((d) => d.properties.name);

  // format the dataset
  const dataset = {
    label: "Countries",
    data: countries.map((d) => ({
      feature: d,
      value: countryData[d.properties.name] || 0,
    })),
  };

  // specify the options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    showOutline: true,
    showGraticule: true,
    legend: {
      display: false,
    },
    scale: {
      projection: "equalEarth",
    },
    geo: {
      colorScale: {
        display: true,
        interpolate: (num) => d3.interpolate("#f4ffff", colors[12])(num),
      },
    },
  };
  return [numDisplayed, labels, dataset, options];
};
