// Load TopoJSON data
// d3.json("states-albers-10m.json").then(function(us) {
//     const width = 975;
//     const height = 610;
  
//     // Define zoom behavior
//     const zoom = d3.zoom()
//         .scaleExtent([1, 8])
//         .on("zoom", zoomed);
  
//     // Select the container where the SVG will go
//     const svgContainer = d3.select("#mapContainer");
    
//     // Create SVG element
//     const svg = svgContainer.append("svg")
//         .attr("viewBox", [0, 0, width, height])
//         .attr("width", width)
//         .attr("height", height)
//         .attr("style", "max-width: 100%; height: auto;")
//         .on("click", reset);
  
//     const path = d3.geoPath();
//     const g = svg.append("g");
  
//     // Draw states
//     g.append("g")
//       .attr("fill", "#444")
//       .attr("cursor", "pointer")
//       .selectAll("path")
//       .data(topojson.feature(us, us.objects.states).features)
//       .join("path")
//         .on("click", clicked)
//         .attr("d", path)
//       .append("title")
//         .text(d => d.properties.name);
  
//     // Outline for states
//     g.append("path")
//       .attr("fill", "none")
//       .attr("stroke", "white")
//       .attr("stroke-linejoin", "round")
//       .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)));
  
//     svg.call(zoom);
  
//     function reset() {
//       // Reset functionality
//     }
  
//     function clicked(event, d) {
//       // Click functionality
//     }
  
//     function zoomed(event) {
//       const {transform} = event;
//       g.attr("transform", transform);
//       g.attr("stroke-width", 1 / transform.k);
//     }
//   });

//ONLOAD
function handleOnLoad(){
  populateFacilitiesArray()
}

//array for ALL facilities, 261?
let facilities = []
// Retreive SQL data
async function populateFacilitiesArray() {
  try{
    const response = await fetch('http://localhost:5020/api/facilities');
    if (!response.ok) {
        throw new error("Network response is not ok");
    }
    else {
        facilities = await response.json();
        console.log(facilities)
        return facilities;
    }
  } catch (error){
      console.log(error);
  }
}
