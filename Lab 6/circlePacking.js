
var margin = 20,
    diameter = 960;

var color = d3.scale.linear()
    .domain([-1, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);

var pack = d3.layout.pack()
    .padding(2)
    .size([diameter - margin, diameter - margin])
    .value(function(d) { return d.size; })

//appends svg elements to body
var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
  .append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");


  //Pattern injection
  var defs = svg.append("defs")
  var pattern = defs.append("pattern")
      .attr({ id:"image", x: "-450", y: "-450", patternUnits:"userSpaceOnUse", height:"160", width:"160"})
      .append("image")
        .attr({x:"0", y:"00", width: "160", height: "160"})
        .attr("xlink:href", "Ahri_Splash_Tile_1.jpg");
  var pattern2 = defs.append("pattern")
      .attr({id: "image2", x: "-290", y: "-290", patternUnits:"userSpaceOnUse", height:"160", width: "160"})
      .append("image")
        .attr({x:"0", y:"0", width: "160", height: "160"})
        .attr("xlink:href", "Aatrox_Splash_Tile_0.jpg");

  // var rect = svg.append("circle")
  //   .attr("r", 80)
  //   .attr("cx", -370)
  //   .attr("cy", -370)
  //   .attr("fill", "url(#image)");

  // var rect2 = svg.append("circle")
  //   .attr("r", 80)
  //   .attr("cx", -210)
  //   .attr("cy", -210)
  //   .attr("fill", "url(#image2)");





 d3.json("champ.json", visualize);


function visualize(root) {
  //if (error) throw error;

  d3.selectAll("svg").remove();

//creates the array of nodes from our JSON
  var focus = root,
      nodes = pack.nodes(root),
      view;


//appends SVG elements to body with specified width and height, as well as some "g" that is in the center
  var svg = d3.select("body").append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
    .append("g")
      .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");


//console log some of this to understand more
  var circle = svg.selectAll("circle")
      .data(nodes)
    .enter().append("circle")
      .attr("class", function(d) { console.log(d); return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
      .style("fill", function(d) { return d.children ? color(d.depth) : null; })
      .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });


  var text = svg.selectAll("text")
      .data(nodes)
    .enter().append("text")
      .attr("class", "label")
      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
      .text(function(d) { return d.name + "_____"+d.value; });

  var node = svg.selectAll("circle,text");

  d3.select("body")
      .style("background", color(-1))
      .on("click", function() { zoom(root); });

  zoomTo([root.x, root.y, root.r * 2 + margin]);

  function zoom(d) {
    var focus0 = focus; focus = d;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function(t) { zoomTo(i(t)); };
        });

    transition.selectAll("text")
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
        .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

  function zoomTo(v) {
    var k = diameter / v[2]; view = v;
    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circle.attr("r", function(d) { return d.r * k; });
  }
}

d3.select(self.frameElement).style("height", diameter + "px");
