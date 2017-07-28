/*	var svg = d3.select("#svgMain")
	var width = svg.attr("width"), height = svg.attr("height");

	// Define the data for the example. In general, a force layout requires two data arrays. The first array, here named `nodes`, contains the object that are the focal point of the visualization. The second array, called `links` below, identifies all the links between the nodes. (The more mathematical term is "edges.")

	// For the simplest possible example we only define two nodes. As far as D3 is concerned, nodes are arbitrary objects. Normally the objects wouldn't be initialized with `x` and `y` properties like we're doing below. When those properties are present, they tell D3 where to place the nodes before the force layout starts its magic. More typically, they're left out of the nodes and D3 picks random locations for each node. We're defining them here so we can get a consistent application of the layout which lets us see the effects of different properties.

	var nodes = [
		{ x:   width/3, y: height/2 },
		{ x: 2*width/3, y: height/3 },
		{ x: width/3, y: 2*height/2 }
	];

	// The `links` array contains objects with a `source` and a `target` property. The values of those properties are the indices in the `nodes` array of the two endpoints of the link.

	var links = [
		{ source: 0, target: 1 },
		{ source: 0, target: 2 }
	];

	// Here's were the code begins. We start off by creating an SVG container to hold the visualization. We only need to specify the dimensions for this container.

	//~ var svg = d3.select('body').append('svg')
		//~ .attr('width', width)
		//~ .attr('height', height);

	// Now we create a force layout object and define its properties. Those include the dimensions of the visualization and the arrays of nodes and links.

	var force = d3.layout.force()
		.size([width, height])
		.nodes(nodes)
		.links(links);

	// There's one more property of the layout we need to define, its `linkDistance`. That's generally a configurable value and, for a first example, we'd normally leave it at its default. Unfortunately, the default value results in a visualization that's not especially clear. This parameter defines the distance (normally in pixels) that we'd like to have between nodes that are connected. (It is, thus, the length we'd like our links to have.)

	force.linkDistance(300);

	// Next we'll add the nodes and links to the visualization. Note that we're just sticking them into the SVG container at this point. We start with the links. The order here is important because we want the nodes to appear "on top of" the links. SVG doesn't really have a convenient equivalent to HTML's `z-index`; instead it relies on the order of the elements in the markup. By adding the nodes _after_ the links we ensure that nodes appear on top of links.

	// Links are pretty simple. They're just SVG lines, and we're not even going to specify their coordinates. (We'll let the force layout take care of that.) Without any coordinates, the lines won't even be visible, but the markup will be sitting inside the SVG container ready and waiting for the force layout.

	var link = svg.selectAll('.link')
		.data(links)
		.enter().append('line')
		.attr('class', 'link');

	// Now it's the nodes turn. Each node is drawn as a circle.

	var node = svg.selectAll('.node')
		.data(nodes)
		.enter().append('circle')
		.attr('class', 'node');

	// We're about to tell the force layout to start its calculations. We do, however, want to know when those calculations are complete, so before we kick things off we'll define a function that we want the layout to call once the calculations are done.

	force.on('end', function() {

		// When this function executes, the force layout calculations have concluded. The layout will have set various properties in our nodes and links objects that we can use to position them within the SVG container.

		// First let's reposition the nodes. As the force layout runs it updates the `x` and `y` properties that define where the node should be centered. To move the node, we set the appropriate SVG attributes to their new values. We also have to give the node a non-zero radius so that it's visible in the container.

		node.attr('r', width/25)
			.attr('cx', function(d) { return d.x; })
			.attr('cy', function(d) { return d.y; });

		// We also need to update positions of the links. For those elements, the force layout sets the `source` and `target` properties, specifying `x` and `y` values in each case.

		link.attr('x1', function(d) { return d.source.x; })
			.attr('y1', function(d) { return d.source.y; })
			.attr('x2', function(d) { return d.target.x; })
			.attr('y2', function(d) { return d.target.y; });

	});

	// Okay, everything is set up now so it's time to turn things over to the force layout. Here we go.

	force.start();

	// By the time you've read this far in the code, the force layout has undoubtedly finished its work. Unless something went horribly wrong, you should see two light grey circles connected by a single dark grey line. If you have a screen ruler (such as [xScope](http://xscopeapp.com) handy, measure the distance between the centers of the two circles. It should be somewhere close to the `linkDistance` parameter we set way up in the beginning (480 pixels). That, in the most basic of all nutshells, is what a force layout does. We tell it how far apart we want connected nodes to be, and the layout keeps moving the nodes around until they get reasonably close to that value. Of course, there's quite a bit more than that going on under the hood. We'll take a closer look starting with the next example.
*/

/*
var svg = d3.select("#svgMain").append('div').attr('class', 'item active').attr('id', 'm0').append('svg').attr('id', 'whitespace');
var height = $(window).height() -120;  // Hard coding for header and footer and bottom margin; seems to be so whitespace can be clicked everywhere
var width = 640;

var myspace = 0;

var forcetoggle=["true"];
var rightClickLast = false;
var nodes = [], links = [];		//i think this represents only the current available in svg

var circle = svg.append('svg:g').selectAll('g');
var path = svg.append('svg:g').selectAll('path');


var force;
var selected_node = null, selected_link = null, mousedown_link = null, mousedown_node = null, mouseup_node = null;
layout();
function layout(v) {	//i think this is called on load/resetting
    nodes = [];		//do i need this?
    for (var x = 0; x < 2; x++) {
		var circleObj = new Object();		//no idea if this works as replacement
		circleObj.id = x;
		circleObj.name = "circle" + x;
		nodes.push(circleObj);
	}
    links = [];		//do i need this?
    // i think i need to load some default values in above for next line to work
    force=forced3layout(nodes, links, width, height,tick);

    svg.append('svg:defs').append('svg:marker')		//not sure what this is, "end-arrow"?
        .attr('id', 'end-arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 6)
        .attr('markerWidth', 3)
        .attr('markerHeight', 3)
        .attr('orient', 'auto')
        .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5')
        .style('fill', '#000');
        
        svg.append('svg:defs').append('svg:marker')	//not sure what this is, "start-arrow"?
        .attr('id', 'start-arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 4)
        .attr('markerWidth', 3)
        .attr('markerHeight', 3)
        .attr('orient', 'auto')
        .append('svg:path')
        .attr('d', 'M10,-5L0,0L10,5')
        .style('fill', '#000');

        // line displayed when dragging new nodes
     drag_line = svg.append('svg:path')
        .attr('class', 'link dragline hidden')
        .attr('d', 'M0,0L0,0');

        // handles to link and node element groups
	path = svg.append('svg:g').selectAll('path');
	circle = svg.append('svg:g').selectAll('g');

	// mouse event vars
	//var 
	selected_node = null,
	selected_link = null,
	mousedown_link = null,
	mousedown_node = null,
	mouseup_node = null;
	console.log("before resetMouse");	//MWD
	resetMouseVars();

	circle.attr('transform', function(d) {		//not sure what this does; not seemed to be triggered
	   console.log("in circle transform attr");	//MWD
	   return 'translate(' + d.x + ',' + d.y + ')';
    });

	addlistener(nodes);		//according to comments://  add listeners to leftpanel.left.  every time a variable is clicked, nodes updates and background color changes.  mouseover shows summary stats or model description.

	drag_line = svg.append('svg:path')			//another line???
        .attr('class', 'link dragline hidden')
       .attr('d', 'M0,0L0,0');

	svg.attr('id', function(){			//i think this defines whitespace and what happens when clicked on empty space
             return "whitespace".concat(myspace);
             })
    .attr('height', height)
    .on('mousedown', function() {
           mousedown(this);
           })
    .on('mouseup', function() {
        mouseup(this);
        });

	restart();		//initializes force.layout() whatever that means
	fakeClick();	//perf click on whitespace
}

function restart() {
	//console.log("in restart func");		//MWD	I think this handles redrawing
        // nodes.id is pegged to allNodes, i.e. the order in which variables are read in
        // nodes.index is floating and depends on updates to nodes.  a variables index changes when new variables are added.
		//var force=forced3layout(nodes, links,  width,  height, tick);
        circle.call(force.drag);
        if(forcetoggle[0]==="true")
        {
			//console.log("force toggle 0 is true");		//MWD	this enables force layout
            force.gravity(0.1);
            force.charge(-800);
            force.linkStrength(1);
          //  force.resume();
            
          //  circle
          //  .on('mousedown.drag', null)
          //  .on('touchstart.drag', null);
        }
        else
        {
			//console.log("force is 0");		//MWD	this disables force
            force.gravity(0);
            force.charge(0);
            force.linkStrength(0);
            //force.stop();
          //  force.resume();
        }
        force.resume();
        
        // path (link) group
        path = path.data(links);
        
        // update existing links
        // VJD: dashed links between pebbles are "selected". this is disabled for now
        path.classed('selected', function(d) { return;})//return d === selected_link; })
        .style('marker-start', function(d) { return d.left ? 'url(#start-arrow)' : ''; })
        .style('marker-end', function(d) { return d.right ? 'url(#end-arrow)' : ''; });
        
        
        // add new links
        path.enter().append('svg:path')
        .attr('class', 'link')
        .classed('selected', function(d) { return;})//return d === selected_link; })
        .style('marker-start', function(d) { return d.left ? 'url(#start-arrow)' : ''; })
        .style('marker-end', function(d) { return d.right ? 'url(#end-arrow)' : ''; })
        .on('mousedown', function(d) { // do we ever need to select a link? make it delete..
			console.log("mousedown on connector");		//MWD	this seems to be a mousedown on the connector
            var obj1 = JSON.stringify(d);
            for(var j =0; j < links.length; j++) {
                if(obj1 === JSON.stringify(links[j])) {
                    links.splice(j,1);
                }
            }
        });
        
        // remove old links
        path.exit().remove();
        
        // circle (node) group
       circle = circle.data(nodes, function(d) {return d.id; });
     
        
        // update existing nodes (reflexive & selected visual states)
        //d3.rgb is the function adjusting the color here.
        circle.selectAll('circle')
        .classed('reflexive', function(d) { return d.reflexive; })
        .style('fill', function(d){
               return d3.rgb(d.nodeCol);
                //return (d === selected_node) ? d3.rgb(d.nodeCol).brighter() : d3.rgb(d.nodeCol); // IF d is equal to selected_node return brighter color ELSE return normal color
               })
        .style('stroke', function(d){
               return (d3.rgb(d.strokeColor));
               })
        .style('stroke-width', function(d){
               return (d.strokeWidth);
               });
        
        // add new nodes
        
        var g = circle.enter()
        .append('svg:g')
        .attr("id", function(d) {
			console.log("something about circle id");		//MWD	occurs when adding pebble
              var myname = d.name+"biggroup";
              return (myname);
              });
       
        // add plot
        g.each(function(d) {
			console.log("something about circle plot");		//MWD	also occurs when adding pebble
               d3.select(this);
               if(d.plottype === "continuous") {
                densityNode(d, obj=this);
               }
               else if (d.plottype === "bar") {
                barsNode(d, obj=this);
               }
            });

		g.append('svg:circle')
        .attr('class', 'node')
        //~ .attr('r', allR)
        .style('pointer-events', 'inherit')
        .style('fill', function(d) {
         //      return (d === selected_node) ? d3.rgb(d.nodeCol).brighter().toString() : d.nodeCol; })
               return d.nodeCol; })
        .style('opacity', "0.5")
        .style('stroke', function(d) {
               return d3.rgb(d.strokeColor).toString(); })
        .classed('reflexive', function(d) { return d.reflexive; })
        .on('mouseover', function(d) {
			console.log("circle mouseover???");		//MWD		why is this not triggering?
       //     if(!mousedown_node || d === mousedown_node) return;
            })
        .on('mouseout', function(d) {
			console.log("circle mouseout???");		//MWD		why is this not triggering?
        //    if(!mousedown_node || d === mousedown_node) return;
            // unenlarge target node
            //tooltip.style("visibility", "hidden");
        //    d3.select(this).attr('transform', '');
            })
  //      .on('mousedown', function(d) {
   //         })
        .on('dblclick', function(d){
			console.log("circle double click")		//MWD
            d3.event.stopPropagation(); // stop click from bubbling
            summaryHold = true;
//            document.getElementById('transformations').setAttribute("style", "display:block");
            })
        .on('contextmenu', function(d) { // right click on node
			console.log("pebble rightclick");	//MWD
            d3.event.preventDefault();
            d3.event.stopPropagation(); // stop right click from bubbling
            rightClickLast=true;
            
            mousedown_node = d;
            if(mousedown_node === selected_node) selected_node = null;
            else selected_node = mousedown_node;
            selected_link = null;
            
            // reposition drag line
            drag_line
            .style('marker-end', 'url(#end-arrow)')
            .classed('hidden', false)
            .attr('d', 'M' + mousedown_node.x + ',' + mousedown_node.y + 'L' + mousedown_node.x + ',' + mousedown_node.y);
            
            svg.on('mousemove', mousemove);
            restart();
            })
        .on('mouseup', function(d) {
			console.log("pebble mouse up");		//MWD
            d3.event.stopPropagation(); // stop mouseup from bubbling
            
            if(rightClickLast) {
                rightClickLast=false;
                return;
            }
           
            if(!mousedown_node) return;
            
            // needed by FF
            drag_line
            .classed('hidden', true)
            .style('marker-end', '');
            
            // check for drag-to-self
            mouseup_node = d;
            if(mouseup_node === mousedown_node) { resetMouseVars(); return; }
            
            // unenlarge target node
            d3.select(this).attr('transform', '');
            
            // add link to graph (update if exists)
            // NB: links are strictly source < target; arrows separately specified by booleans
            var source, target, direction;
            if(mousedown_node.id < mouseup_node.id) {
            source = mousedown_node;
            target = mouseup_node;
            direction = 'right';
            } else {
            source = mouseup_node;
            target = mousedown_node;
            direction = 'left';
            }
            
            var link;
            link = links.filter(function(l) {
                                return (l.source === source && l.target === target);
                                })[0];
            if(link) {
            link[direction] = true;
            } else {
            link = {source: source, target: target, left: false, right: false};
            link[direction] = true;
            links.push(link);
            }
            
            // select new link
            selected_link = link;
            selected_node = null;
            svg.on('mousemove', null);
            
            resetMouseVars();
            restart();
			//forced3layout(nodes, links,  width,  height, tick);
            
		});

		// show node Names
        g.append('svg:text')
        .attr('x', 0)
        .attr('y', 15)
        .attr('class', 'id')
        .text(function(d) {console.log("node name show " + d.name);		//MWD	this adds the text to the pebble
			return d.name; });

		g.selectAll("circle.node")
        .on("mouseover", function(d) {
			console.log("pebble mouseover!!!");		//MWD		//so mouseover works on circle.node, not circle
		})
		.on("mouseout", function(d) {
			//MWD		mouseout on pebble
		});

		circle.exit().remove();
        force.start();
}

// update force layout (called automatically each iteration)
function tick() {
	//MWD	this is called per layout update to draw everything
	// draw directed edges with proper padding from node centers
	path.attr('d', function(d) {
		//MWD	called when line moves/added/removed
			  var deltaX = d.target.x - d.source.x,
			  deltaY = d.target.y - d.source.y,
			  dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
			  normX = deltaX / dist,
			  normY = deltaY / dist,
			  sourcePadding = d.left ? allR+5 : allR,
			  targetPadding = d.right ? allR+5 : allR,
			  sourceX = d.source.x + (sourcePadding * normX),
			  sourceY = d.source.y + (sourcePadding * normY),
			  targetX = d.target.x - (targetPadding * normX),
			  targetY = d.target.y - (targetPadding * normY);
			  return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
			  });
	
	//  if(forcetoggle){
	circle.attr('transform', function(d) {
		//MWD	called on circle move
				return 'translate(' + d.x + ',' + d.y + ')';
				});
	//  };
	
}

//not sure why another line
var drag_line = svg.append('svg:path')
      .attr('class', 'link dragline hidden')
       .attr('d', 'M0,0L0,0');

function mousedown(d) {
	//console.log("mouse down func");		//MWD	this seems limited to only on the SVG
	// prevent I-bar on drag
	d3.event.preventDefault();
	
	// because :active only works in WebKit?
	svg.classed('active', true);
	
	if(d3.event.ctrlKey || mousedown_node || mousedown_link) {
		return;
	}
	
	restart();
}

function mousemove(d) {
	if(!mousedown_node) return;
	
	// update drag line
	drag_line.attr('d', 'M' + mousedown_node.x + ',' + mousedown_node.y + 'L' + d3.mouse(this)[0] + ',' + d3.mouse(this)[1]);
}

function mouseup(d) {
	if(mousedown_node) {
		// hide drag line
		drag_line
		.classed('hidden', true)
		.style('marker-end', '');
	}
	// because :active only works in WebKit?
	//svg.classed('active', false);

	// clear mouse event vars
	resetMouseVars();
}

// init D3 force layout
function forced3layout(nodes, links,  width,  height,tick)
{
	console.log("in forced3 func");		//MWD	seems to be the initializer, only called at start
var force = d3.layout.force()
.nodes(nodes)
.links(links)
.size([width, height])
.linkDistance(150)
.charge(-800)
.on('tick',tick);  // .start() is important to initialize the layout

return force;
}

function resetMouseVars() {
	mousedown_node = null;
	mouseup_node = null;
	mousedown_link = null;
}

function addlistener(nodes){
	//this seems to only handle tab1 interactions
	restart();		//what does this do?
}

//~ var findNodeIndex = function(nodeName) {
    //~ for (var i in allNodes) {
        //~ if(allNodes[i]["name"] === nodeName) {return allNodes[i]["id"];}
		
    //~ };
//~ }

var nodeIndex = function(nodeName) {
    for (var i in nodes) {
        if(nodes[i]["name"] === nodeName) {return i;}
    }
}

//~ var findNode = function(nodeName) {
    //~ for (var i in allNodes) {if (allNodes[i]["name"] === nodeName) return allNodes[i]};
//~ }

//MWD	
// function called by force button
function forceSwitch() {
    if(forcetoggle[0]==="true") { forcetoggle = ["false"];}
    else {forcetoggle = ["true"]}

    if(forcetoggle[0]==="false") {
        document.getElementById('btnForce').setAttribute("class", "btn active");
    }
    else {
        document.getElementById('btnForce').setAttribute("class", "btn btn-default");
        fakeClick();
    }
}

function spliceLinksForNode(node) {
    var toSplice = links.filter(function(l) {
                                return (l.source === node || l.target === node);
                                });
    toSplice.map(function(l) {
                 links.splice(links.indexOf(l), 1);
                 });
}

//probably dont need this
// function to convert color codes
function hexToRgba(hex) {
    var h=hex.replace('#', '');
    
    var bigint = parseInt(h, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    var a = '0.5';
    
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

// acts as if the user clicked in whitespace. useful when restart() is outside of scope
function fakeClick() {
    var myws = "#whitespace".concat(myspace);
    // d3 and programmatic events don't mesh well, here's a SO workaround that looks good but uses jquery...
    jQuery.fn.d3Click = function () {
        this.each(function (i, e) {
                  var evt = document.createEvent("MouseEvents");
                  evt.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                  
                  e.dispatchEvent(evt);
                  });
    };
    $(myws).d3Click();
    
    d3.select(myws)
    .classed('active', false); // remove active class
}
*/

var svg = d3.select("#svgMain");

//~ var tempWidth = d3.select("#main.left").style("width")
//~ var width = tempWidth.substring(0,(tempWidth.length-2));

//~ var height = $(window).height() -120;  // Hard coding for header and footer and bottom margin.

var width = 640;
var height = 480;

var boundaryLeft = 200;
var boundaryRight = 400;
/*
var forcetoggle=["true"];
var rightClickLast = false;

// this is the initial color scale that is used to establish the initial colors of the nodes.  allNodes.push() below establishes a field for the master node array allNodes called "nodeCol" and assigns a color from this scale to that field.  everything there after should refer to the nodeCol and not the color scale, this enables us to update colors and pass the variable type to R based on its coloring
var colors = d3.scale.category20();

var varColor = '#f0f8ff';   //d3.rgb("aliceblue");
var selVarColor = '#fa8072';    //d3.rgb("salmon");

var lefttab = "tab1"; //global for current tab in left panel

// Radius of circle
var allR = 40;

// From .csv
var valueKey = ["ccode", "country", "cname", "cmark", "year", "custom"];
//~ var hold = [];
var allNodes = [];
var links = [];
var nodes = [];

//MWD	these 3 functions do as they are called, but why are they variables? as variables, the svg is drawn immediately; otherwise it only displays after a click on the svg and i think all the nodes are display at (0,0)
// returns id
var findNodeIndex = function(nodeName) {
    for (var i in allNodes) {
        if(allNodes[i]["name"] === nodeName) {return allNodes[i]["id"];}
		
    }
}

var nodeIndex = function(nodeName) {
    for (var i in nodes) {
        if(nodes[i]["name"] === nodeName) {return i;}
    }
}

var findNode = function(nodeName) {
    for (var i in allNodes) {if (allNodes[i]["name"] === nodeName) return allNodes[i]};
}

var circle = svg.append('svg:g').selectAll('g');
var path = svg.append('svg:g').selectAll('path');       
		
//ROHIT BHATTACHARJEE
// mouse event vars
var selected_node = null,
selected_link = null,
mousedown_link = null,
mousedown_node = null,
mouseup_node = null;
var force;

for (i=0;i<valueKey.length;i++) {
  //MWD		definition of node object	!!!
  var actor;
	if (i < valueKey.length/2)
		actor = "source";
	else
		actor = "target";
  var obj1 = {id:i, "name": valueKey[i], "nodeCol":colors(i), "strokeColor": selVarColor, "actor": actor};
  
  allNodes.push(obj1);
  nodes.push(obj1);
}
// populating the variable list in the left panel

//~ d3.select("#tab1").selectAll("p") 			//do something with this..
//~ .data(valueKey)
//~ .enter()
//~ .append("p")
//~ .attr("id",function(d){
  //~ return d.replace(/\W/g, "_"); // replace non-alphanumerics for selection purposes
  //~ }) // perhapse ensure this id is unique by adding '_' to the front?
//~ .text(function(d){return d;})
//~ .style('background-color', varColor);
layout();

function layout() {
	console.log("in layout");
	var myValues=[];
    //~ nodes = [];
    links = [];
    
		//MWD		i think this adds the first 3 nodes and connects them
        /*if(allNodes.length > 2) {
			console.log("allNodes[0] = " + allNodes[0]);	//MWD
			console.log(allNodes[0]);		//MWD
            nodes = [allNodes[0], allNodes[1], allNodes[2]];
            links = [
                {source: nodes[1], target: nodes[0], left: false, right: true },
                {source: nodes[0], target: nodes[2], left: false, right: true }
                ];
        }
        else if(allNodes.length === 2) {
            nodes = [allNodes[0], allNodes[1]];
            links = [{source: nodes[1], target: nodes[0], left: false, right: true }];
        }
        else if(allNodes.length === 1){
            nodes = [allNodes[0]];
        }
        else {
            alert("There are zero variables in the metadata.");
            return;
        }*/		/*
    
	//Rohit Bhattacharjee FORCE D3
	// init D3 force layout 
		//var 
		force=forced3layout(nodes, links, width, height,tick);
  
        
		//Rohit Bhattacharjee SVG
		//function svgappend()
		// define arrow markers for graph links
        svg.append('svg:defs').append('svg:marker')
        .attr('id', 'end-arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 6)
        .attr('markerWidth', 3)
        .attr('markerHeight', 3)
        .attr('orient', 'auto')
        .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5')
        .style('fill', '#000');
        
        svg.append('svg:defs').append('svg:marker')
        .attr('id', 'start-arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 4)
        .attr('markerWidth', 3)
        .attr('markerHeight', 3)
        .attr('orient', 'auto')
        .append('svg:path')
        .attr('d', 'M10,-5L0,0L10,5')
        .style('fill', '#000');

        // line displayed when dragging new nodes
     //this seems to prevent random smudges on lines
     drag_line = svg.append('svg:path')
        .attr('class', 'link dragline hidden')
        .attr('d', 'M0,0L0,0');
        
        // handles to link and node element groups
       // var
        path = svg.append('svg:g').selectAll('path');
        circle = svg.append('svg:g').selectAll('g');
    
        // mouse event vars
        //var 
        selected_node = null,
        selected_link = null,
        mousedown_link = null,
        mousedown_node = null,
        mouseup_node = null;
        console.log("before resetMouse");	//MWD

        //ROHIT BHATTACHARJEE reset mouse function
		 resetMouseVars();
        
	   circle.attr('transform', function(d) {		//not sure what this is needed for; declared again below; I think this helps drawing circle on move but it is never called
		   console.log("in circle transform attr");	//MWD
		   return 'translate(' + d.x + ',' + d.y + ')';
	   });
    
    //  add listeners to leftpanel.left.  every time a variable is clicked, nodes updates and background color changes.  mouseover shows summary stats or model description.
	//Rohit BHATTACHARJEE add listener
	//~ addlistener(nodes);

	drag_line = svg.append('svg:path')		//this displays drag line over the pebble
        .attr('class', 'link dragline hidden')
       .attr('d', 'M0,0L0,0');	

    
    // app starts here
   
    svg.attr('id', function(){
             return "whitespace0";
             })
    .attr('height', height)
    .on('mousedown', function() {
           mousedown(this);
           })
    .on('mouseup', function() {
        mouseup(this);
        })
    ;
    
    d3.select(window)
    .on('click',function(){  //NOTE: all clicks will bubble here unless event.stopPropagation()
    });
    
    restart(); // this is the call the restart that initializes the force.layout()
    fakeClick();
} 		// end layout

//Rohit BHATTACHARJEE
function restart() {
	//console.log("in restart func");		//MWD	I think this handles redrawing
        // nodes.id is pegged to allNodes, i.e. the order in which variables are read in
        // nodes.index is floating and depends on updates to nodes.  a variables index changes when new variables are added.
        circle.call(force.drag);
        if(forcetoggle[0]==="true")
        {
			//console.log("force toggle 0 is true");		//MWD	this enables force layout
            force.gravity(0.1);
            force.charge(-800);
            force.linkStrength(1);
        }
        else
        {
			//console.log("force is 0");		//MWD	this disables force
            force.gravity(0);
            force.charge(0);
            force.linkStrength(0);
        }
        force.resume();
        
        // path (link) group
        path = path.data(links);
        
        // update existing links
        // VJD: dashed links between pebbles are "selected". this is disabled for now
        path.classed('selected', function(d) { return;})//return d === selected_link; })
        .style('marker-start', function(d) { return d.left ? 'url(#start-arrow)' : ''; })
        .style('marker-end', function(d) { return d.right ? 'url(#end-arrow)' : ''; });
        
        
        // add new links
        path.enter().append('svg:path')
        .attr('class', 'link')
        .classed('selected', function(d) { return;})//return d === selected_link; })
        .style('marker-start', function(d) { return d.left ? 'url(#start-arrow)' : ''; })
        .style('marker-end', function(d) { return d.right ? 'url(#end-arrow)' : ''; })
        .on('mousedown', function(d) { // do we ever need to select a link? make it delete..
			console.log("mousedown on connector");		//MWD	this seems to be a mousedown on the connector
            var obj1 = JSON.stringify(d);
            for(var j =0; j < links.length; j++) {		//this removes the links on click
                if(obj1 === JSON.stringify(links[j])) {
                    links.splice(j,1);
                }
            }
        });
        
        // remove old links
        path.exit().remove();
        
        // circle (node) group
       circle = circle.data(nodes, function(d) {return d.id; });
     
        
        // update existing nodes (reflexive & selected visual states)
        //d3.rgb is the function adjusting the color here.
        circle.selectAll('circle')
        .style('fill', function(d){
               return d3.rgb(d.nodeCol);
                //return (d === selected_node) ? d3.rgb(d.nodeCol).brighter() : d3.rgb(d.nodeCol); // IF d is equal to selected_node return brighter color ELSE return normal color
               })
        .style('stroke', function(d){
               return (d3.rgb(d.strokeColor));
               })
        .style('stroke-width', function(d){
               return (d.strokeWidth);
               });
        
        // add new nodes
        
        var g = circle.enter()			//MWD	//all circles
        .append('svg:g')
        .attr("id", function(d) {
			//~ console.log("something about circle id");		//MWD	occurs when adding pebble
              var myname = d.name+"biggroup";
              return (myname);
              });

        // add plot
        g.each(function(d) {
			//~ console.log("something about circle plot");		//MWD	also occurs when adding pebble
               /*d3.select(this);
               if(d.plottype === "continuous") {
                densityNode(d, obj=this);
               }
               else if (d.plottype === "bar") {
                barsNode(d, obj=this);
               }*/		/*
            });

        g.append('svg:circle')
        .attr('class', 'node')
        .attr('r', allR)
        //~ .style('pointer-events', 'inherit')
        .style('pointer-events', "all")		//MWD	not sure if there is a diff between "all" and "auto" (under inherit)
        .style('fill', function(d) {	//MWD	this adds the color
               return d.nodeCol; })
        .style('opacity', "0.5")
        .style('stroke', function(d) {
               return d3.rgb(d.strokeColor).toString(); })
        //~ .on('mouseover', function(d) {
			//~ // console.log("circle mouseover???");		//MWD		why is this not triggering?
			//~ force.stop();
        //~ })
        //~ .on('mouseout', function(d) {
			//~ // console.log("circle mouseout???");		//MWD		why is this not triggering?
			//~ force.resume();
        //~ })
        .on('dblclick', function(d){
			console.log("circle double click")		//MWD
            d3.event.stopPropagation(); // stop click from bubbling
        })
        .on('contextmenu', function(d) { // right click on node
			console.log("pebble rightclick " + d3.select(this).style("pointer-events"));	//MWD
			console.log("===================================================================");
            d3.event.preventDefault();
            d3.event.stopPropagation(); // stop right click from bubbling
            rightClickLast=true;
            
            mousedown_node = d;		//set to origin clicked node
            //~ if(mousedown_node === selected_node) selected_node = null;
            //~ else selected_node = mousedown_node;
            //~ selected_link = null;
            
            // reposition drag line		//this displays the drag line
            drag_line
            .style('marker-end', 'url(#end-arrow)')
            .classed('hidden', false)
            .attr('d', 'M' + mousedown_node.x + ',' + mousedown_node.y + 'L' + mousedown_node.x + ',' + mousedown_node.y);
            
            svg.on('mousemove', mousemove);
            restart();
            })
        .on('mouseup', function(d){createLink(d)});

        function createLink(d){
			console.log("pebble mouse up " + rightClickLast + " " + mousedown_node.name);		//MWD
			console.log("-------------------------------------------------------------------------------------");
            d3.event.stopPropagation(); // stop mouseup from bubbling
            
            if(rightClickLast) {		//if true then right clicked
                rightClickLast=false;
                return;
            }
           
            if(!mousedown_node) return;		//if no origin node selected
            
            // needed by FF
            drag_line
            .classed('hidden', true)
            .style('marker-end', '');
            
            // check for drag-to-self
            mouseup_node = d;
            if(mouseup_node === mousedown_node) { resetMouseVars(); return; }
            
            // unenlarge target node
            //~ d3.select(this).attr('transform', '');	//what does this do?
            
            // add link to graph (update if exists)
            // NB: links are strictly source < target; arrows separately specified by booleans
            var source, target, direction;
            if(mousedown_node.id < mouseup_node.id) {
            source = mousedown_node;
            target = mouseup_node;
            direction = 'right';
            } else {
            source = mouseup_node;
            target = mousedown_node;
            direction = 'left';
            }
            
            var link;
            link = links.filter(function(l) {
                                return (l.source === source && l.target === target);
                                })[0];
            if(link) {
            link[direction] = true;
            } else {
            link = {source: source, target: target, left: false, right: false};
            link[direction] = true;
            links.push(link);
            }
            
            // select new link
            //~ selected_link = link;
            //~ selected_node = null;
            svg.on('mousemove', null);
            
            resetMouseVars();
            restart();
			//forced3layout(nodes, links,  width,  height, tick);
            
		}
       
        // show node Names
        g.append('svg:text')
        .attr('x', 0)
        .attr('y', 15)
        .attr('class', 'id')
        .text(function(d) {
			//~ console.log("node name show " + d.name);		//MWD	this adds the text to the pebble
			return d.name; });
        
        
        // show summary stats on mouseover
        // SVG doesn't support text wrapping, use html instead
        //~ g.selectAll("circle.node")
        //~ .on("mouseover", function(d) {
			//~ console.log("pebble mouseover!!!");		//MWD		//so mouseover works on circle.node, not circle
                //~ })
        
        //~ .on("mouseout", function(d) {
			//~ //MWD		mouseout on pebble
            //~ });
        g.selectAll("circle.node").on("mouseup", function(d){createLink(d)});

        // remove old nodes
        circle.exit().remove();
        force.start();
    }
//Rohit BHATTACHARJEE TICK
 // update force layout (called automatically each iteration)
function tick() {
	//MWD	this is called per layout update to draw everything
	// draw directed edges with proper padding from node centers
	path.attr('d', function(d) {
		//MWD	called when line moves/added/removed, THIS DISPLAYS THE CURRENT LINES (NOT THE ONES BEING DRAWN)
	  /*if (d.source.id == 0) {
		  d.source.x = 600;
	  }
		else if (d.target.id == 0) {
			d.target.x = 600;
		}

		//must test seperately to account for linking
		 if (d.source.id == 1) {
			d.source.x = 800;
		}
		else if (d.target.id == 1) {
			d.target.x = 800;
		}*/		/*

		if (d.source.actor == "source"){
			if (d.source.x > boundaryLeft)
				d.source.x = boundaryLeft;
		}
		if (d.target.actor == "source"){
			if (d.target.x > boundaryLeft)
				d.target.x = boundaryLeft;
		}

		if (d.source.actor == "target"){
			if (d.source.x < boundaryRight)
				d.source.x = boundaryRight;
		}
		if (d.target.actor == "target"){
			if (d.target.x < boundaryRight)
				d.target.x = boundaryRight;
		}
		
	  var deltaX = d.target.x - d.source.x,
	  deltaY = d.target.y - d.source.y,
	  dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
	  normX = deltaX / dist,
	  normY = deltaY / dist,
	  sourcePadding = d.left ? allR+5 : allR,			//MWD	this adds the spacing on the line pefore arrow head
	  targetPadding = d.right ? allR+5 : allR,
	  sourceX = d.source.x + (sourcePadding * normX),
	  sourceY = d.source.y + (sourcePadding * normY),
	  targetX = d.target.x - (targetPadding * normX),
	  targetY = d.target.y - (targetPadding * normY);
		  
	  return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
  });
	
	circle.attr('transform', function(d) {
		//MWD	called on circle move, THIS DISPLAYS THE CIRCLES
		if (d.actor == "source") {
			if (d.x > boundaryLeft)
				d.x = boundaryLeft;
		}
		else {
			if (d.x < boundaryRight)
				d.x = boundaryRight;
		}
		return 'translate(' + d.x + ',' + d.y + ')';
	});
	
}
//why is this here it seems to have no effect
//~ var drag_line = svg.append('svg:path')
      //~ .attr('class', 'link dragline hidden')
       //~ .attr('d', 'M0,0L0,0');

function mousedown(d) {
	console.log("general mousedown ");		//MWD	this triggers on all SVG clicks
	console.log(d);
        // prevent I-bar on drag
        d3.event.preventDefault();
        
        // because :active only works in WebKit?
        svg.classed('active', true);
        
        if(d3.event.ctrlKey || mousedown_node || mousedown_link) {
            return;
        }
        
        restart();
    }
    
function mousemove(d) {
	if(!mousedown_node) return;
	
	// update drag line
	rightClickLast = false;
	drag_line.attr('d', 'M' + mousedown_node.x + ',' + mousedown_node.y + 'L' + d3.mouse(this)[0] + ',' + d3.mouse(this)[1]);
}

function mouseup(d) {
	console.log("general mouseup");
	console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
	if(mousedown_node) {
		// hide drag line
		drag_line
		.classed('hidden', true)
		.style('marker-end', '');
	}    
	// clear mouse event vars
	resetMouseVars();
	rightClickLast = false;
}

//ROHIT Bhattacharjee
// init D3 force layout
function forced3layout(nodes, links,  width,  height,tick)
{
	console.log("in forced3 func");		//MWD	seems to be the initializer, only called at start
	var force = d3.layout.force()
	.nodes(nodes)
	.links(links)
	.size([width, height])
	.linkDistance(150)
	.charge(-800)
	.on('tick',tick);  // .start() is important to initialize the layout
	
	return force;
}

function resetMouseVars() {
	mousedown_node = null;
	mouseup_node = null;
	mousedown_link = null;
}

//ROHIT BHATTACHARJEE ad listener function
function addlistener(nodes){
d3.select("#tab1").selectAll("p")
//~ .on("mouseover", function(d) {
	 //~ })
//~ .on("mouseout", function() {
	//~ })
.on("click", function varClick(){
	//console.log("addin node from tab");		//MWD
	if(allNodes[findNodeIndex(this.id)].grayout) {return null;}

	d3.select(this)
	.style('background-color',function(d) {
	   var myText = d3.select(this).text();
	   var myColor = d3.select(this).style('background-color');
	   
	   if(d3.rgb(myColor).toString() === varColor.toString()) {	// we are adding a var
			nodes.push(findNode(myText));
			return hexToRgba(selVarColor);
	   }
	   else { // dropping a variable
	
			nodes.splice(findNode(myText)["index"], 1);		//MWD lookup this "findNode" function, sounds useful
			spliceLinksForNode(findNode(myText));
			
			return varColor;
	   }
	});
		   
	restart();
	});
}
		
//MWD	
// function called by force button
function forceSwitch() {
    if(forcetoggle[0]==="true") { forcetoggle = ["false"];}
    else {forcetoggle = ["true"]}

    if(forcetoggle[0]==="false") {
        document.getElementById('btnForce').setAttribute("class", "btn active");
    }
    else {
        document.getElementById('btnForce').setAttribute("class", "btn btn-default");
        fakeClick();
    }
}

//this allows to delete nodes
function spliceLinksForNode(node) {
    var toSplice = links.filter(function(l) {
                                return (l.source === node || l.target === node);
                                });
    toSplice.map(function(l) {
                 links.splice(links.indexOf(l), 1);
                 });
}

// programmatically deselecting every selected variable...
/*function erase() {
    leftpanelMedium();
    rightpanelMedium();
    //~document.getElementById("legend").setAttribute("style", "display:none");
    
    tabLeft('tab1');
    
    jQuery.fn.d3Click = function () {
		//console.log("does this do something?");	//MWD this clears all pebbles!
        this.children().each(function (i, e) {
                    var mycol = d3.rgb(this.style.backgroundColor);
                    if(mycol.toString()===varColor.toString()) {return;}
                  var evt = document.createEvent("MouseEvents");
                  evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                  
                  e.dispatchEvent(evt);
                  });
    };
    $("#tab1").d3Click();
}*/


/*		this is useful for hover over
function tabLeft(tab) {
    
    if(tab!="tab3") {lefttab=tab;}
    var tabi = tab.substring(3);
    
    document.getElementById('tab1').style.display = 'none';
    document.getElementById('tab2').style.display = 'none';
    document.getElementById('tab3').style.display = 'none';

    if(tab==="tab1") {
        summaryHold = false;
        document.getElementById('btnSubset').setAttribute("class", "btn btn-default");
        document.getElementById('btnVariables').setAttribute("class", "btn active");
        document.getElementById("btnSelect").style.display = 'none';
        
        d3.select("#leftpanel")
        .attr("class", "sidepanel container clearfix");
    }
    else if (tab==="tab2") {
        summaryHold = false;
        document.getElementById('btnVariables').setAttribute("class", "btn btn-default");
        document.getElementById('btnSubset').setAttribute("class", "btn active");
        
        d3.select("#leftpanel")
        .attr("class", function(d){
              if(this.getAttribute("class")==="sidepanel container clearfix expandpanel") {
                document.getElementById("btnSelect").style.display = 'none';
                return "sidepanel container clearfix";
              }
              else {
                document.getElementById("btnSelect").style.display = 'block';
                return "sidepanel container clearfix expandpanel";
              }
              });
    }
    else {
        document.getElementById('btnSubset').setAttribute("class", "btn btn-default");
        document.getElementById('btnVariables').setAttribute("class", "btn btn-default");
        
        d3.select("#leftpanel")
        .attr("class", "sidepanel container clearfix");
    }

    document.getElementById(tab).style.display = 'block';
}*/
/*
// function to convert color codes
function hexToRgba(hex) {
    var h=hex.replace('#', '');
    
    var bigint = parseInt(h, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    var a = '0.5';
    
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

// acts as if the user clicked in whitespace. useful when restart() is outside of scope
function fakeClick() {
    var myws = "#whitespace0";
    // d3 and programmatic events don't mesh well, here's a SO workaround that looks good but uses jquery...
    //~ jQuery.fn.d3Click = function () {
        //~ this.each(function (i, e) {
                  //~ var evt = document.createEvent("MouseEvents");
                  //~ evt.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                  
                  //~ e.dispatchEvent(evt);
                  //~ });
    //~ };
    jQuery.fn.d3Click = function () {
		this.each(function (i, e) {
			var evt = new MouseEvent("click");
			e.dispatchEvent(evt);
		});
	};
    $(myws).d3Click();
    
    d3.select(myws)
    .classed('active', false); // remove active class
}
*/


var allR = 40;
//~ var valueKey = ["ccode", "country", "cname", "cmark", "year", "custom"];
//~ var valueKey = [];
var allNodes = [];		//contains all nodes
var links = [];			//contains links
var nodes = [];			//contains current shown nodes
var colors = d3.scale.category20();
var selVarColor = '#fa8072';    //d3.rgb("salmon");

nodes.push({"name": "source" + 0, "nodeCol": colors(0), "strokeColor": selVarColor, "actor": "source", "actorID": 0});
nodes.push({"name": "target" + 0, "nodeCol": colors(0), "strokeColor": selVarColor, "actor": "target", "actorID": 0});

var sourceCount = 0;
var targetCount = 0;

//~ for (i=0;i<valueKey.length;i++) {
  //~ //MWD		definition of node object	!!!
  //~ var actor;
	//~ if (i < valueKey.length/2)
		//~ actor = "source";
	//~ else
		//~ actor = "target";
  //~ var obj1 = {id:i, "name": valueKey[i], "nodeCol":colors(i), "strokeColor": selVarColor, "actor": actor};
  
  //~ allNodes.push(obj1);
  //~ nodes.push(obj1);
//~ }

var force = d3.layout.force().nodes(nodes).links(links).size([width, height]).linkDistance(150).charge(-800).start();

var node_drag = d3.behavior.drag().on("dragstart", dragstart).on("drag", dragmove).on("dragend", dragend);

function dragstart(d, i) {
	force.stop() // stops the force auto positioning before you start dragging
}

function dragmove(d, i) {
	d.px += d3.event.dx;
	d.py += d3.event.dy;
	d.x += d3.event.dx;
	d.y += d3.event.dy; 
	tick(); // this is the key to make it work together with updating both px,py,x,y on d !
}

function dragend(d, i) {
	//~ d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
	tick();
	force.resume();
}


var node = svg.append("svg:g").attr("class", "allNodesGroup").selectAll("g");	//must define outside
updateSVG();
function updateSVG(){
	node = node.data(nodes, function(d){return d.name;});

	var innerNode = node.enter().append("g").attr("id", function(d){return d.name + "Group";}).call(node_drag);
	innerNode.append("circle").attr("class", "node").attr("r", allR).style('fill', function(d){return d.nodeCol;}).style('opacity', "0.5").style('stroke', function(d) {return d3.rgb(d.strokeColor).toString();}).style("pointer-events", "all");
			
	innerNode.append('svg:text').attr('x', 0).attr('y', 15).attr('class', 'id').text(function(d){return d.name;});

	node.exit().remove();
}

force.on("tick", tick);

function tick() {
	node.attr("transform", function(d) {
		d.x = Math.max(allR, Math.min(width - allR, d.x));
		d.y = Math.max(allR, Math.min(height - allR, d.y));
		if (d.actor == "source" && d.x > boundaryLeft)
			d.x = boundaryLeft;
		if (d.actor == "target" && d.x < boundaryRight)
			d.x = boundaryRight;
		return "translate(" + d.x + "," + d.y + ")";
	});
}

function updateAll() {
	force.stop();
	force = force.nodes(nodes).links(links).start();
	updateSVG();
}

$("#sourceAdd").click(function() {
	sourceCount ++;
	$("#sourceDiv").append("<input id='source" + sourceCount + "' class='sourceName' type='text' value='source" + sourceCount +"'>");
	$("#sourceDiv").append("<button id='source" + sourceCount + "Add' class='sourceShow' onclick='sourceAdd(this.id)'>+</button>");
	$("#sourceDiv").append("<button id='source" + sourceCount + "Del' class='sourceDel' onclick='sourceDel(this.id)'>X</button>");

	nodes.push({"name": "source" + sourceCount, "nodeCol": colors(sourceCount), "strokeColor": selVarColor, "actor": "source", "actorID": sourceCount});

	//update force and svg
	updateAll();
});

$("#targetAdd").click(function() {
	targetCount ++;
	$("#targetDiv").append("<input id='target" + targetCount + "' class='targetName' type='text' value='target" + targetCount + "'>");
	$("#targetDiv").append("<button id='target" + targetCount + "Add' class='targetShow' onclick='targetAdd(this.id)'>+</button>");
	$("#targetDiv").append("<button id='target" + targetCount + "Del' class='targetDel' onclick='targetDel(this.id)'>X</button>");

	nodes.push({"name": "target" + targetCount, "nodeCol": colors(sourceCount + targetCount), "strokeColor": selVarColor, "actor": "target", "actorID": targetCount});

	//update force and svg
	updateAll();
});

function sourceDel(id) {
	var cur = id.substring(6, id.length-3);
	console.log(cur);
}

function sourceAdd(id) {
	var cur = id.substring(6, id.length-3);
	console.log(cur);
}

function targetDel(id) {
	var cur = id.substring(6, id.length-3);
	console.log(cur);
}

function targetAdd(id) {
	var cur = id.substring(6, id.length-3);
	console.log(cur);
}

//~ function findNodeIndex(nodeID) {
	//~ for (n in nodes) {
		//~ if (n.id == nodeID)
			//~ return 
