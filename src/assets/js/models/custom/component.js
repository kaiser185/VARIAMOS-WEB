let component_main = function component_main(graph)
{
	component_custom_markers();
	component_constraints(graph);
	let data={};
	data["m_type"]="normal"; //custom type
	data["m_elements"]=component_elements(); //custom elements
	data["m_attributes"]=component_attributes(); //custom attributes
	data["m_clon_cells"]=component_clon_cells(); //custom clon cells
	data["m_relation_styles"]=component_relation_styles(); //custom relation styles
	data["m_constraints_relations"]=component_constraints_relations; //custom constraints for relations
	return data;

	function component_constraints(graph){
		graph.multiplicities=[]; //reset multiplicities
		graph.multiplicities.push(new mxMultiplicity(
			true, "component", null, null, 0, null, ["interface"],
			"Invalid connection",
			"Only shape targets allowed"));	
		graph.multiplicities.push(new mxMultiplicity(
			true, "interface", null, null, 0, 1, ["component"],
			"Invalid connection",
			"Only shape targets allowed"));
		graph.multiplicities.push(new mxMultiplicity(
			true, "file", null, null, 0, 1, ["component"],
			"Invalid connection",
			"Only shape targets allowed"));
		graph.multiplicities.push(new mxMultiplicity(
			true, "custom", null, null, 0, 1, ["component"],
			"Invalid connection",
			"Only shape targets allowed"));
		graph.multiplicities.push(new mxMultiplicity(
			true, "fragment", null, null, 0, null, ["file","component"],
			"Invalid connection",
			"Only shape targets allowed"));
	}

	function component_elements(){
		let component = {src:projectPath+"images/models/component/component.png", wd:100, hg:40, style:"shape=component", type:"component", pname:"Component"};
		let file = {src:projectPath+"images/models/component/file.png", wd:100, hg:40, style:"shape=file", type:"file", pname:"File"};
		let fragment = {src:projectPath+"images/models/component/fragment.png", wd:100, hg:40, style:"shape=fragment", type:"fragment", pname:"Fragment"};
		let custom = {src:projectPath+"images/models/component/custom.png", wd:100, hg:40, style:"shape=custom", type:"custom", pname:"Custom. file"};
		const exposedInterface = {src:projectPath+"images/models/feature/bundle.png", wd:50, hg:50, style:"shape=ellipse", type:"interface", pname:"Interface"};

		const pkg = {src:projectPath+"images/models/component/file.png", wd:250, hg:250, style:"shape=rectangle;fillColor=#cfcecc;strokeWidth=3;rounded=1;arcSize=15;verticalAlign=top;fontColor=black;fontSize=20;fontStyle=1;", type:"package", pname:"Package"};

		let elements=[];
		elements[0]=component;
		elements[1]=file;
		elements[2]=fragment;
		elements[3]=custom;
		elements.push(exposedInterface);
		elements.push(pkg)
		
		return elements;
	}

	function component_attributes(){
		let attributes=[];
		attributes[0]={
			"types":["file"],
			"custom_attributes":[{
				"name":"filename",
				"def_value":""
			},
			{
				"name":"destination",
				"def_value":""
			}]
		};
		attributes[1]={
			"types":["fragment"],
			"custom_attributes":[{
				"name":"filename",
				"def_value":""
			}]
		};
	
		return attributes;
	}

	function component_clon_cells(){
		let clons={};
		clons={
			"component":"binding_feature_component"
		};

		return clons;
	}

	function component_custom_markers(){
		mxMarker.addMarker('requires', function(canvas, shape, type, pe, unitX, unitY, size, source, sw, filled){
			//unitX, unitY correspond to the representation of the orientation as a point
			//on a unit circle. (It is essential to rememeber that the y axis increases towards the bottom of the page.)
			//Size is constant defined by the library
			//nx, ny are then the "augmented" vector on the unit circle by a given amount.
			let nx = unitX * (size + sw + 10);
			let ny = unitY * (size + sw + 10);
	  
			//Here canvas is an instance of mxSvgCanvas2D which reimplements part of the HTML5 canvas library,
			//particularily the API.
			//pe corresponds to the (x,y) coordinates of the line's endpoint.
			//The division by 2 is a scaling factor.
			
			return function() {
			  canvas.begin();
			  let x1 = pe.x - nx /* / 2 */ - ny /* / 2 */;
			  let y1 = pe.y - ny /* / 2  */+ nx /* / 2 */;
			  canvas.moveTo(x1, y1);
			  let x2 = pe.x + ny /* / 2 */ -  nx /* / 2 */;
			  let y2 = pe.y - ny/*  / 2 */ - nx /* / 2 */;
			  canvas.lineTo(x2, y2);
			  canvas.stroke();
			}
		})
	}

	function component_relation_styles(){
		var relations=[];
		relations.push({
		  "source":["fragment"],
		  "rel_source_target":"and",
		  "target":["file"],
		  "style":"dashed=1;endArrow=open;strokeColor=red;"
		});
		relations.push({
			"source":["component"],
			"rel_source_target":"and",
			"target":["interface"],
			"style":"endArrow=requires"
		});
		relations.push({
			"source":["interface"],
			"rel_source_target":"and",
			"target":["component"],
			"style":"dashed=1;endArrow=none;"
		  });

		return relations;
	}

	function component_constraints_relations(graph, source, target){
		//only one custom file per component
		if(target.getAttribute("type")=="component" && source.getAttribute("type")=="custom"){
			let target_id = target.getId();
			let inco_egdes = graph.getModel().getIncomingEdges(graph.getModel().getCell(target_id));
			for (let j = 0; j < inco_egdes.length; j++) {
				if(inco_egdes[j].source.getAttribute("type")=="custom"){
					alert("Invalid connection only one custom. file can be linked for this component");
					return false;
				}
			}
		}

		//fragment can be only linked with one component
		if(target.getAttribute("type")=="component" && source.getAttribute("type")=="fragment"){
			let source_id = source.getId();
			let out_egdes = graph.getModel().getOutgoingEdges(graph.getModel().getCell(source_id));
			for (let j = 0; j < out_egdes.length; j++) {
				if(out_egdes[j].target.getAttribute("type")=="component"){
					alert("Invalid connection one fragment can be only linked with one component");
					return false;
				}
			}
		}

		return true;
	}

	function addComponentInfo(_sender, evt){
		console.log(evt);
		const cells = evt.getProperty('cells');
		evt.consume();
	}

}

export default component_main