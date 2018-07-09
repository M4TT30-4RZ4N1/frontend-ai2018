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
import { ArchiveTransaction } from '../../../models/QueryResult/archiveTransaction';

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
  colorMap : Map<string,string> = new Map();
  positionsInArea : number = 0;
  archivesToBought : ArchiveTransaction[] = [];
  positionsSub : Subscription;
  buySub : Subscription;
  confirmSub : Subscription;
	vertices : number = 0;
  truePolygon : boolean;
  shape : Shape;
  usersFilter : String[] = [];
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
      if(this.confirmSub !== null && this.confirmSub !== undefined)
        this.confirmSub.unsubscribe();
  }

  changeBounds(map: L.Map) : boolean{
    let changed : boolean = this.boundsPolygon.length == 0;
    let bounds : L.LatLngBounds = map.getBounds();
    let newBoundsPolygon = [];
    newBoundsPolygon.push([bounds.getNorthEast().lat,bounds.getNorthEast().lng]);
    newBoundsPolygon.push([bounds.getNorthWest().lat, bounds.getNorthWest().lng]);
    newBoundsPolygon.push([bounds.getSouthWest().lat,bounds.getSouthWest().lng]);
    newBoundsPolygon.push([bounds.getSouthEast().lat,bounds.getSouthEast().lng]);
    //console.dir(newBoundsPolygon);
    for(let i = 0; i < this.boundsPolygon.length; i++){
      if(newBoundsPolygon[i][0] != this.boundsPolygon[i][0] || 
        newBoundsPolygon[i][1] != this.boundsPolygon[i][1])
        changed = true;
    }
    //console.log("Changed bounds " + changed);
    this.boundsPolygon = newBoundsPolygon;
    return changed;
  }

  elaborateSearchResult(data : QueryResult, _self){
    for(let i=0 ; i< data.byUser.length; i++){
      let user = data.byUser[i].user;
      let color = data.byUser[i].color;
      _self.colorMap.set(user, color);
    }
    //console.dir( _self.colorMap);
    let positionData = data.byPosition;
    //console.dir(positionData);
    _self.positionsInArea = positionData.length;
    _self.markerLayers = [];
    for(let i=0 ; i< positionData.length; i++){
      let user = positionData[i].user;
      let lat = positionData[i].point.coordinates[0];
      let lng = positionData[i].point.coordinates[1];
      // add each marker as a layer
      let c : string = _self.colorMap.get(user);
      _self.markerLayers[i] = L.circle([lat, lng], {radius: 400, color: c});
    }
    // add all layers as a single array to layer
    _self.layerOfMarkers = L.layerGroup( _self.markerLayers);
    _self.geoMap.addLayer( _self.layerOfMarkers);
    _self.changeDetectorRef.detectChanges();
  }

  mapChangeCallback(_self){
    _self.cancel();
    let startDate = _self.selectedMoments[0].getTime();
    let endDate = _self.selectedMoments[1].getTime();
    _self.shape = new Shape('Polygon', [ _self.boundsPolygon]);
    let objectToSend : QueryObj = new QueryObj( _self.shape,  []);
    //evito la sovrapposizione di più richieste
    if( _self.positionsSub !== null &&  _self.positionsSub !== undefined)
      _self.positionsSub.unsubscribe();
    //console.log("Sending query to the server");
    _self.positionsSub = _self.positionService.getPositions(startDate, endDate, objectToSend)
                          .subscribe((data : QueryResult) => {
                              //if(data.byPosition.length > 0)
                              console.log("Query response");
                              console.dir(data);
                            _self.elaborateSearchResult(data, _self);
                          });
  }


  onMapReady(map: L.Map) {
    this.geoMap = map;
    this.changeBounds(map);
    //con this non funziona
    let _self = this;
    map.on('zoomend', (e : LeafletMouseEvent) => {
      //console.log("Zoom event");
      if(!_self.changeBounds(map)) return;
      _self.mapChangeCallback(_self);
    });    
    map.on('moveend', (e : LeafletMouseEvent) => {
      //console.log("Move event");
      if(!_self.changeBounds(map)) return;
      _self.mapChangeCallback(_self);
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

  getPolygonWellFormatted(){
    if(this.vertices > 2){
      //console.log("Polygon");
      //first point and last point MUST be equal (closed polygon)
      return this.formatPolygon(this.polygonTest);
    }
    else{
      //console.log("Bounds");
      return this.formatPolygon(this.boundsPolygon);
    }
  }
  

	sendPositions(){

    // get time in milliseconds
    let startDate = this.selectedMoments[0].getTime();
    let endDate = this.selectedMoments[1].getTime();
    let polygonWellFormatted = this.getPolygonWellFormatted();
    this.shape = new Shape('Polygon', [polygonWellFormatted]);
    let objectToSend : QueryObj = new QueryObj(this.shape,  this.usersFilter);
    //console.dir(polygonWellFormatted);
    //console.log(startDate + " " + endDate);
    //this.positionsInArea = this.positionService.getPositions(startDate, endDate, this.shape.coordinates[0]);
    this.positionsSub = this.positionService.getPositions(startDate, endDate, objectToSend)
                            .subscribe((data : QueryResult) => {
                              console.dir(data);
                              this.elaborateSearchResult(data, this);
                              this.changeDetectorRef.detectChanges();
                            });
    //console.log ("Trovate: " + this.positionsInArea);
    
  }

  cancel(){
    //console.log("Cancel map");
    if(this.layerOfMarkers !== null && this.layerOfMarkers !== undefined){
      this.geoMap.removeLayer(this.layerOfMarkers);
    }
    this.geoMap.removeLayer(this.model.overlayLayers[0].layer);
    this.buttonText = "Search in visible area";
    this.polygonTest = [];
    this.vertices = 0;
    this.truePolygon = false;
    this.positionsInArea = 0;
    this.archivesToBought = [];   
  }

  buy(){
    let startDate = this.selectedMoments[0].getTime();
    let endDate = this.selectedMoments[1].getTime();
    let polygonWellFormatted = this.getPolygonWellFormatted();
    this.shape = new Shape('Polygon', [polygonWellFormatted]);
    let objectToSend : QueryObj = new QueryObj(this.shape,  []);
    this.buySub = this.positionService.buyPositions(startDate, endDate, objectToSend)
                  .subscribe((data :ArchiveTransaction[]) => {
                    console.log(data);
                    //this.archivesToBought = data;
                    this.archivesToBought = [];
                    for(let i = 0; i < data.length; i++){
                      this.archivesToBought.push(new ArchiveTransaction(data[i].filename, data[i].purchased));
                    }
                  },
                  (error) => {
                      alert("Transaction Error!");
                      console.dir(error);   
                  });
  }

  confirm(){
    this.confirmSub = this.positionService.confirmBuy(this.archivesToBought)
                            .subscribe((data :ArchiveTransaction[]) => {
                              console.log(data);
                              //this.archivesToBought = data;
                              alert("Transaction successful!");
                              this.archivesToBought = [];
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


