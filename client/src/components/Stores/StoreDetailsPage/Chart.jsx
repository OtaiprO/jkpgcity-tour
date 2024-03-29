import React, { useEffect, useState } from "react";
import * as d3 from "d3";

let cs = d3.scaleOrdinal(d3.schemeCategory10);

export const Chart = ({ categories, store }) => {
  const [chartWidth, setChartWidth] = useState(500);

  useEffect(() => {
    const updateChartWidth = () => {
      const containerWidth = document.getElementById("chart").offsetWidth;
      const maxWidth = 500;
      const screenWidth = window.innerWidth;
      const newWidth = Math.min(maxWidth, screenWidth);
      setChartWidth(newWidth);
    };

    updateChartWidth();

    window.addEventListener("resize", updateChartWidth);

    return () => {
      window.removeEventListener("resize", updateChartWidth);
    };
  }, []);

  useEffect(() => {
    d3.select("#chart").html("");
    if (!categories || !store) return;

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = chartWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", chartWidth)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3
      .scaleBand()
      .domain(categories)
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear().domain([0, 20]).range([height, 0]);

    svg
      .selectAll("rect")
      .data(categories)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d))
      .attr("y", (d) => yScale(store[d]))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(store[d]))
      .attr("fill", (d) => cs(d));

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("font-size", Math.min(12, width / categories.length) + "px");

    svg.append("g").call(d3.axisLeft(yScale).ticks(10));
  }, [categories, store, chartWidth]);

  return <div id="chart"></div>;
};
