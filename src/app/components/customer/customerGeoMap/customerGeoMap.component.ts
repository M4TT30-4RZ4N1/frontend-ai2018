import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Shape } from '../../../models/shape';
import * as L from 'leaflet';
import { LeafletLayersModel } from '../../../models/leafletLayers';
import { polygon, LeafletMouseEvent, LatLngTuple, LatLngExpression, geoJSON } from 'leaflet';
import { PositionService } from '../../../services/position/position.service';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { OpaqueTransaction } from '../../../models/opaqueTransaction';
import { QueryObj } from '../../../models/queryObj';
import { QueryResult } from '../../../models/QueryResult/queryResult';

@Component({
  selector: 'app-geoMap',
  templateUrl: './customerGeoMap.component.html',
  styleUrls: ['./customerGeoMap.component.css']
})
export class GeoMapComponent implements OnInit {


  
changeDetectorRefs :ChangeDetectorRef[] = [];

  public selectedMoments = [
    new Date(2018, 1, 12, 10, 30),
    new Date(2018, 6, 20, 20, 30)
];

  geoMap: L.Map;
  layerOfMarkers : L.Layer;
  markerLayers = new Array<any>();
  userMap : Map<String,String> = new Map();
  positionsInArea : number = 0;
  lastOpaqueTransaction : OpaqueTransaction;
  positionsSub : Subscription;
  buySub : Subscription;
	vertices : number = 0;
  truePolygon : boolean;
  shape : Shape;
  buttonText : String = "Search in visible area";
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
  boundsPolygon = [  ];
	polygon = {
		id: 'polygon',
		name: 'Polygon',
		enabled: true,
		layer: L.polygon([
      [ 7.0642791, 7.65603950000002 ]
    ])
	};

	// Form model object
	model = new LeafletLayersModel(
		[ this.LAYER_OSM, this.LAYER_OCM ],
		this.LAYER_OSM.id,
		[ this.polygon , this.polygon]
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
  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.positionsSub !== null && this.positionsSub !== undefined)
      this.positionsSub.unsubscribe();
    if(this.buySub !== null && this.buySub !== undefined)
      this.buySub.unsubscribe();
  }

  changeBounds(map: L.Map){
    let bounds : L.LatLngBounds = map.getBounds();
    this.boundsPolygon = [];
    this.boundsPolygon.push([bounds.getNorthEast().lat,bounds.getNorthEast().lng]);
    this.boundsPolygon.push([bounds.getNorthWest().lat, bounds.getNorthWest().lng]);
    this.boundsPolygon.push([bounds.getSouthWest().lat,bounds.getSouthWest().lng]);
    this.boundsPolygon.push([bounds.getSouthEast().lat,bounds.getSouthEast().lng]);
    //console.dir(this.boundsPolygon);
  }

  onMapReady(map: L.Map) {
    this.geoMap = map;
    this.changeBounds(map);
    //con this non funziona
    let _self = this;
    map.on('moveend', function(e) {
      //console.log("Bounds changed");
      _self.changeBounds(map);
      _self.cancel();
      let startDate = _self.selectedMoments[0].getTime();
      let endDate = _self.selectedMoments[1].getTime();
      _self.shape = new Shape('Polygon', [ _self.boundsPolygon]);
      let objectToSend : QueryObj = new QueryObj( _self.shape,  []);
      //evito la sovrapposizione di più richieste
      if( _self.positionsSub !== null &&  _self.positionsSub !== undefined)
      _self.positionsSub.unsubscribe();
      _self.positionsSub =  _self.positionService.getPositions(startDate, endDate, objectToSend)
                            .subscribe((data : QueryResult) => {
                              console.dir(data);
                              for(let i=0 ; i< data.byUser.length; i++){
                                let user = data.byUser[i].user;
                                let color = data.byUser[i].color;
                                _self.userMap.set(user, color);
                              }
                              console.dir( _self.userMap);
                              let positionData = data.byPosition;
                              for(let i=0 ; i< positionData.length; i++){
                                let user = positionData[i].user;
                                let lat = positionData[i].point.coordinates[0];
                                let lng = positionData[i].point.coordinates[1];
                                // add each marker as a layer
                                _self.markerLayers[i] = L.circle([lat, lng], {radius: 400, color: "red"});
                              }
                              // add all layers as a single array to layer
                              _self.layerOfMarkers = L.layerGroup( _self.markerLayers);
                              _self.geoMap.addLayer( _self.layerOfMarkers);
                              _self.changeDetectorRef.detectChanges();
                            });
    });
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
        this.buttonText = "Search in polygon";
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

    // get time in milliseconds
    let startDate = this.selectedMoments[0].getTime();
    let endDate = this.selectedMoments[1].getTime();
    let polygonWellFormatted;
    if(this.vertices > 2){
      //console.log("Polygon");
      //first point and last point MUST be equal (closed polygon)
      polygonWellFormatted = this.formatPolygon(this.polygonTest);
    }
    else{
      //console.log("Bounds");
      polygonWellFormatted = this.formatPolygon(this.boundsPolygon);
    }

    this.shape = new Shape('Polygon', [polygonWellFormatted]);
    let objectToSend : QueryObj = new QueryObj(this.shape,  []);
    //console.dir(polygonWellFormatted);
    //console.log(startDate + " " + endDate);
    //this.positionsInArea = this.positionService.getPositions(startDate, endDate, this.shape.coordinates[0]);
    this.positionsSub = this.positionService.getPositions(startDate, endDate, objectToSend)
                            .subscribe((data : QueryResult) => {
                              console.dir(data);
                              this.changeDetectorRef.detectChanges();
                            });
    //console.log ("Trovate: " + this.positionsInArea);
    
  }

  cancel(){
    
    if(this.layerOfMarkers !== null && this.layerOfMarkers !== undefined){
      this.geoMap.removeLayer(this.layerOfMarkers);
    }
    this.geoMap.removeLayer(this.model.overlayLayers[0].layer);
    this.buttonText = "Search in visible area";
    this.polygonTest = [];
    this.vertices = 0;
    this.truePolygon = false;
    this.positionsInArea = 0;   
  }

  buy(){
    
    this.buySub = this.positionService.buyPositions(this.lastOpaqueTransaction)
                  .subscribe((data) => {
                    
                    console.log(data);
                    let allData = <any> data;
                    alert("Transaction complete with success!");
                    for(let i=0 ; i< allData.length; i++){
                      let lat = allData[i].point.coordinates[0];
                      let lng = allData[i].point.coordinates[1];
                      // add each marker as a layer
                      this.markerLayers[i] = L.marker([lat, lng], {icon: this.greenIcon});
                    }
                    // add all layers as a single array to layer
                    this.layerOfMarkers = L.layerGroup(this.markerLayers);
                    this.geoMap.addLayer(this.layerOfMarkers);
                
                    this.geoMap.removeLayer(this.model.overlayLayers[0].layer);
                    this.polygonTest = [];
                    this.vertices = 0;
                    this.truePolygon = false;
                    this.positionsInArea = 0;
                  },
                  (error) => {
                      alert("Transaction Error!");
                      console.dir(error);   
                  });
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


