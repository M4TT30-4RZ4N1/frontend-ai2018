import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Shape } from '../../../../models/shape';
import * as L from 'leaflet';
import { LeafletLayersModel } from '../../../../models/leafletLayers';
import { polygon, LeafletMouseEvent, LatLngTuple, LatLngExpression, geoJSON } from 'leaflet';
import { NgModel } from '@angular/forms';
import { PositionService } from '../../../../services/position/position.service';

@Component({
  selector: 'app-geoMap',
  templateUrl: './geoMap.component.html',
  styleUrls: ['./geoMap.component.css']
})
export class GeoMapComponent implements OnInit {

  ngOnInit() {
  }

  
changeDetectorRefs :ChangeDetectorRef[] = [];

  public selectedMoments = [
    new Date(2018, 1, 12, 10, 30),
    new Date(2018, 6, 20, 20, 30)
];

  geoMap: L.Map;
  layerOfMarkers : L.Layer;
  markerLayers = new Array<any>();
  positionsInArea : number = 0;
	vertices : number = 0;
  truePolygon : boolean;
	shape : Shape;
  // Open Street Map and Open Cycle Map definitions
  greenIcon = L.icon({
    iconUrl: '/assets/redMarker.png',

    iconSize:     [35, 35], // size of the icon
});
	LAYER_OCM = {
		id: 'opencyclemap',
		name: 'Open Cycle Map',
		enabled: true,
		layer: L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Open Cycle Map'
		})
	};
	LAYER_OSM = {
		id: 'openstreetmap',
		name: 'Open Street Map',
		enabled: false,
		layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Open Street Map'
		})
	};
  polygonTest = [  ];
	polygon = {
		id: 'polygon',
		name: 'Polygon',
		enabled: true,
		layer: L.polygon([
      [ 45.0642791, 7.65603950000002 ]
    ])
	};

	// Form model object
	model = new LeafletLayersModel(
		[ this.LAYER_OSM, this.LAYER_OCM ],
		this.LAYER_OSM.id,
		[ this.polygon]
	);


	// Values to bind to Leaflet Directive
	layers: L.Layer[];
	
	options = {
		zoom: 13,
		center: L.latLng(45.0642791, 7.65603950000002)
	};

  constructor(
    private changeDetectorRef:ChangeDetectorRef, 
    private positionService: PositionService,
  ) {
    this.apply();

  } 

  onMapReady(map: L.Map) {
    this.geoMap = map;
    map.on('click', (e : LeafletMouseEvent) => {
      //alert(e.latlng);
      //console.log("Adding new point: "+e.latlng);
      map.removeLayer(this.model.overlayLayers[0].layer);
      if(this.vertices == 0 ){
        this.polygonTest.push([e.latlng.lat,e.latlng.lng]);
        this.model.overlayLayers[0].layer = L.circle([e.latlng.lat,e.latlng.lng], { radius: 2 });
        this.model.overlayLayers[0].layer.addTo(map);
        this.vertices++;
      }else if(this.vertices == 1){
        this.polygonTest.push([e.latlng.lat,e.latlng.lng]);
        this.model.overlayLayers[0].layer = L.polyline([ this.polygonTest[0],[e.latlng.lat,e.latlng.lng] ], );
        this.model.overlayLayers[0].layer.addTo(map);
				this.vertices++;
      
      }else{
        this.polygonTest.push([e.latlng.lat,e.latlng.lng]);
        let newPolygon : LatLngExpression[] = [];
        this.polygonTest.forEach((n) =>{
          newPolygon.push([n[0],n[1]]);
          //console.log("Array of displayed points: "+n);
        });
        this.model.overlayLayers[0].layer = L.polygon(newPolygon);
        const baseLayer = this.model.baseLayers.find((l: any) => (l.id === this.model.baseLayer));
        this.model.overlayLayers[0].layer.addTo(map);
        this.truePolygon = true;
        this.changeDetectorRef.detectChanges();
      }
      //console.log(this.truePolygon);
    });

  }
	apply() {

		// Get the active base layer
		const baseLayer = this.model.baseLayers.find((l: any) => (l.id === this.model.baseLayer));

		// Get all the active overlay layers
		const newLayers = this.model.overlayLayers
			//.filter((l: any) => l.enabled)
			.map((l: any) => l.layer);
    newLayers.unshift(baseLayer.layer);
		this.layers = newLayers;

		return false;
	}
	sendPositions(){

    // get time in milliseconds and then parse in seconds
    let startDate = this.convertDate(this.selectedMoments[0].getTime());
    let endDate = this.convertDate(this.selectedMoments[1].getTime());

    //first point and last point MUST be equal (closed polygon)
    let polygonWellFormatted = this.formatPolygon(this.polygonTest);

    this.shape = new Shape('Polygon', [polygonWellFormatted]);
    
    //console.log(startDate + " " + endDate);
    this.positionsInArea = this.positionService.getPositions(startDate, endDate, this.shape.coordinates[0]);
    
    //console.log ("Trovate: " + this.positionsInArea);
    
  }

  cancel(){
    
    if(this.layerOfMarkers !== null && this.layerOfMarkers !== undefined){
      this.geoMap.removeLayer(this.layerOfMarkers);
    }
    this.geoMap.removeLayer(this.model.overlayLayers[0].layer);
    this.polygonTest = [];
    this.vertices = 0;
    this.truePolygon = false;
    this.positionsInArea = 0;
    
   
  }
  buy(){
    // get time in milliseconds and then parse in seconds
    let startDate = this.convertDate(this.selectedMoments[0].getTime());
    let endDate = this.convertDate(this.selectedMoments[1].getTime());
    //  get polyogn wellformatted
    let polygonWellFormatted = this.formatPolygon(this.polygonTest);

    let positionsBought = this.positionService.buyPositions(startDate, endDate, polygonWellFormatted);
    
    for(let i=0 ; i< positionsBought.length; i++){
      let lat = positionsBought[i].getLat();
      let lng = positionsBought[i].getLng();
      // add each marker as a layer
      this.markerLayers[i] = L.marker([lat, lng], {icon: this.greenIcon});
    }
    // add all layers as a single array to layer
    this.layerOfMarkers = L.layerGroup(this.markerLayers);
    this.geoMap.addLayer(this.layerOfMarkers);
    
    
    alert("Polygon Area selected: \n" +
     JSON.stringify(this.polygonTest) +
      "\n Position Bought: \n" +
      JSON.stringify(positionsBought));

    this.geoMap.removeLayer(this.model.overlayLayers[0].layer);
    this.polygonTest = [];
    this.vertices = 0;
    this.truePolygon = false;
    this.positionsInArea = 0;
  }

  convertDate(date :  number) : number{
    let s = "" + date;
    s = s.slice(0,-3);
    let onlySeconds= parseInt(s);
    return onlySeconds;
  }

  formatPolygon(polygon : any[]) : any[]{
    let polygonWellFormatted = [];

    for(let i =0; i< polygon.length; i++){
      polygonWellFormatted.push(polygon[i]);
    }
    polygonWellFormatted.push(polygon[0]);

    return polygonWellFormatted;
  }

}


