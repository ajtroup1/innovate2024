async function createChart() {
    // Load your TopoJSON data
    const us = await d3.json("./resources/stript/states-albers-10m.json");
  
    const width = 975;
    const height = 610;
  
    const zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on("zoom", zoomed);
  
    // Append SVG to the body or a specific element instead of using d3.create
    const svg = d3.select('body').append('svg')
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: auto;")
        .on("click", reset);
  
    const path = d3.geoPath();
    const g = svg.append("g");
  
    const states = g.append("g")
        .attr("fill", "#444")
        .attr("cursor", "pointer")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .join("path")
          .on("click", clicked)
          .attr("d", path);
  
    states.append("title")
        .text(d => d.properties.name);
  
    g.append("path")
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)));
  
    svg.call(zoom);
  
    function reset() {
      // Reset functionality
    }
  
    function clicked(event, d) {
      // Click functionality
    }
  
    function zoomed(event) {
      const {transform} = event;
      g.attr("transform", transform);
      g.attr("stroke-width", 1 / transform.k);
    }
  }
  
  // Call createChart to initialize the chart creation
  createChart();
  