import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Shape } from '../../../models/shape';
import * as L from 'leaflet';
import { LeafletLayersModel } from './../../../models/leafletLayers';
import { polygon, LeafletMouseEvent, LatLngTuple, LatLngExpression, geoJSON } from 'leaflet';
import { PositionService } from '../../../services/position.service';
import { NgModel } from '@angular/forms';

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

  positionsInArea : number = 0;
	vertices : number = 0;
  truePolygon : boolean;
	shape : Shape;
	// Open Street Map and Open Cycle Map definitions
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
    let s1 = "" + this.selectedMoments[0].getTime();;
    s1 = s1.slice(0,-3);
    let startDate = parseInt(s1);

    let s2 = "" + this.selectedMoments[1].getTime();;
    s2 = s2.slice(0,-3);
    let endDate = parseInt(s2);

    //first point and last point MUST be equal (closed polygon)
    let polygonWellFormatted = [];
    for(let i =0; i<this.polygonTest.length; i++){
      polygonWellFormatted.push(this.polygonTest[i]);
    }
    polygonWellFormatted.push(this.polygonTest[0]);

    this.shape = new Shape('Polygon', [polygonWellFormatted]);
    
    //console.log(startDate + " " + endDate);
    this.positionsInArea = this.positionService.getPositions(startDate, endDate, this.shape.coordinates[0]);
		//console.log ("Trovate: " + this.positionsInArea);
    
  }

  cancel(){
   
  }
  buy(){
    let positionsBought;
    alert("inside Polygon Area: \n" +
     JSON.stringify(this.polygonTest) +
      "\n Buying Positions: \n" +
       positionsBought);
  }

}


