let treeData = null; // Store the JSON data globally
let lastFile = null; // Store the last file reference

// File input handler
document.getElementById("fileInput").addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (file) {
    lastFile = file; // Store the selected file
    const reader = new FileReader();
    reader.onload = function (e) {
      treeData = JSON.parse(e.target.result); // Store the data globally
      renderTree(treeData); // Render the tree with the full dataset
      showRefreshButton(); // Show the refresh button
    };
    reader.readAsText(file);
  } else {
    alert("No file selected");
  }
});

// Render tree function
function renderTree(data) {
  // Clear previous chart
  d3.select("#chart").html("");

  const containerWidth = 2000; // Total container width
  const containerHeight = 1000; // Base height

  // Set up tree layout with extra separation
  const root = d3.hierarchy(data, d => d.children);
  const treeLayout = d3.tree()
    .size([containerWidth - 100, containerHeight - 100])
    .separation((a, b) => {
      // Add extra space between nodes
      return a.parent === b.parent ? 1.5 : 2.5;
    });

  treeLayout(root);

  // Create SVG
  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", containerWidth)
    .attr("height", containerHeight);

  const g = svg.append("g").attr("transform", `translate(50,50)`);

  // Draw links
  g.selectAll(".link")
    .data(root.links())
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", d3.linkVertical()
      .x(d => d.x)
      .y(d => d.y))
    .style("fill", "none")
    .style("stroke", "#ccc")
    .style("stroke-width", "2px");

  // Draw nodes
  const node = g.selectAll(".node")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x},${d.y})`);

  // Dynamic rectangular boxes
  node.append("rect")
    .attr("width", d => d.data.name.length * 8 + 60) // Add padding for name length
    .attr("height", 50)
    .attr("x", d => -(d.data.name.length * 4 + 30)) // Center-align boxes
    .attr("y", -25)
    .style("fill", d => {
      switch (d.data.level) {
        case "Family": return "#d0e8f2";
        case "Branch": return "#f2d0e8";
        case "Group": return "#d0f2e0";
        case "Subgroup": return "#f2efd0";
        case "Language": return "#e0d0f2";
        case "Dialect": return "#f2d0d0";
        default: return "#e0e0e0"; // Default gray for unspecified levels
      }
    })
    .style("stroke", "black");

  // Node labels
  node.append("text")
    .attr("dy", "-0.5em") // Position above center
    .style("text-anchor", "middle")
    .style("font-size", "12px")
    .text(d => d.data.name);

  // Add taxonomical level
  node.append("text")
    .attr("dy", "0.5em") // Centered vertically
    .style("text-anchor", "middle")
    .style("font-size", "10px")
    .style("fill", "#555")
    .text(d => d.data.level);

  // Add date range below each node
  node.append("text")
    .attr("dy", "1.6em") // Position below level
    .style("text-anchor", "middle")
    .style("font-size", "10px")
    .style("fill", "#555")
    .text(d => (d.data.era ? `${d.data.era.start}–${d.data.era.end} BP` : ""));
}

// Show the refresh button
function showRefreshButton() {
  const refreshButton = document.getElementById("refreshButton");
  refreshButton.style.display = "inline-block"; // Make the button visible
}

// Refresh button handler
document.getElementById("refreshButton").addEventListener("click", function () {
  if (lastFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      treeData = JSON.parse(e.target.result); // Reload the data
      renderTree(treeData); // Re-render the tree
    };
    reader.readAsText(lastFile);
  } else {
    alert("No file to refresh. Please upload a file first.");
  }
});
