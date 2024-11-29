# Tree chart from .json
Tree Diagram Generator
Purpose
The Tree Diagram Generator is a web-based tool designed to dynamically visualize hierarchical data structures such as linguistic families, taxonomies, or organizational charts. The tool supports color-coded levels and metadata annotations for clarity and flexibility. It is especially suited for visualizing complex hierarchies where relationships and timelines are important.

Key Features:

Visualizes hierarchies dynamically from a JSON file.
Supports taxonomy levels: Family, Branch, Group, Subgroup, Language, and Dialect.
Displays metadata like temporal information (e.g., start and end BP).
Ensures non-overlapping nodes with proper alignment and spacing.
Allows users to upload a custom JSON file for visualization.
Technical Components and Implementation
1. Technologies Used:
HTML: For the structure of the web page.
CSS: For styling the tree, nodes, and metadata.
JavaScript (D3.js): For rendering the tree diagram and dynamically positioning nodes and links.
2. File Structure:
bash
Copy code
/project-folder
│
├── index.html         # Main HTML file
├── script.js          # JavaScript logic for rendering the tree
├── data.json          # Hierarchical data file
├── README.md          # Documentation (this file)
└── styles.css         # Optional: Additional CSS for customization
3. Key Components:
D3.js Tree Layout:
Uses the d3.tree() layout to compute the hierarchical positions of nodes.
Implements a separation function to ensure proper spacing between nodes.
Dynamic SVG Creation:
Creates an SVG container to draw nodes and links.
Dynamically calculates the tree’s dimensions based on the data.
Interactive File Upload:
Allows users to upload a custom JSON file to visualize new hierarchies.
4. Core Functionality:
Nodes are color-coded based on their taxonomy level:
Family: Light Blue
Branch: Light Pink
Group: Light Green
Subgroup: Light Yellow
Language: Lavender
Dialect: Light Red
Displays additional metadata (era.start, era.end) below each node.
Prevents node overlaps by calculating proper separation and alignment.
Hierarchy/Taxonomy
The hierarchy follows the taxonomical structure used in linguistic or organizational classifications. Each node in the hierarchy belongs to one of the following levels:

Family: The root level of the hierarchy (e.g., "Indo-European").
Branch: Subdivisions within the family (e.g., "Anatolian").
Group: Further subdivisions within a branch (e.g., "Luwian").
Subgroup: Refines groups into smaller related clusters (e.g., "Old Hittite").
Language: Represents individual languages (e.g., "Attic Greek").
Dialect: Represents specific dialects or variants of a language (e.g., "Koine Greek").
Adding New Nodes to data.json
To customize or extend the hierarchy, you can add new nodes to the data.json file. Below is an explanation of the JSON structure and an example.

JSON Structure:
Each node in the JSON must contain the following fields:

name: The name of the node (e.g., "Indo-European").
level: The taxonomy level (e.g., "Family", "Branch").
era (optional): Temporal metadata with start and end values (e.g., { "start": 6000, "end": 3000 }).
children (optional): An array of child nodes.
Example:
json
Copy code
{
  "name": "Indo-European",
  "level": "Family",
  "era": { "start": 6000, "end": 3000 },
  "children": [
    {
      "name": "Anatolian",
      "level": "Branch",
      "era": { "start": 3500, "end": 1500 },
      "children": [
        {
          "name": "Luwian",
          "level": "Group",
          "era": { "start": 3300, "end": 1200 },
          "children": [
            {
              "name": "Hieroglyphic Luwian",
              "level": "Language",
              "era": { "start": 3200, "end": 1000 },
              "children": [
                {
                  "name": "Luwian Script Variant A",
                  "level": "Dialect",
                  "era": { "start": 3200, "end": 900 }
                },
                {
                  "name": "Luwian Script Variant B",
                  "level": "Dialect",
                  "era": { "start": 3300, "end": 800 }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "Hellenic",
      "level": "Branch",
      "era": { "start": 4000, "end": 500 },
      "children": [
        {
          "name": "Greek",
          "level": "Group",
          "era": { "start": 2000, "end": 0 },
          "children": [
            {
              "name": "Attic Greek",
              "level": "Language",
              "era": { "start": 1500, "end": 300 },
              "children": [
                {
                  "name": "Classical Attic",
                  "level": "Dialect",
                  "era": { "start": 1500, "end": 400 }
                },
                {
                  "name": "Koine Greek",
                  "level": "Dialect",
                  "era": { "start": 500, "end": 0 }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
Adding a New Node:
Identify where the new node belongs in the hierarchy.
Add it as a child node to the corresponding parent in the children array.
Specify its name, level, and optionally its era (start, end).
Example of Adding a Node:
To add the "Cretan Greek" dialect under "Greek":

json
Copy code
{
  "name": "Cretan Greek",
  "level": "Dialect",
  "era": { "start": 1000, "end": 500 }
}
Add it to the children array of the corresponding parent:

json
Copy code
{
  "name": "Greek",
  "level": "Group",
  "children": [
    {
      "name": "Cretan Greek",
      "level": "Dialect",
      "era": { "start": 1000, "end": 500 }
    }
  ]
}
How to Use
Open index.html in your browser.
Click "Browse" to upload your data.json file.
The hierarchical tree will render automatically.
Modify data.json to add or adjust nodes, then re-upload the file to update the diagram.
Future Improvements
Add interactivity (e.g., expand/collapse nodes, tooltips).
Support dynamic data editing directly in the browser.
Provide preset templates for common hierarchies.

