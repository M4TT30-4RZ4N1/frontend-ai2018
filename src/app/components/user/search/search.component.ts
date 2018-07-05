import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Shape } from '../../../models/shape';
import { LeafletLayersModel } from '../../../models/leafletLayers';
import * as L from 'leaflet';
import { PositionService } from '../../../services/position/position.service';
import { LeafletMouseEvent } from 'leaflet';
import { Subscription } from 'rxjs/Subscription';
import { Coordinate } from '../../../models/coordinates';
import { UserService } from '../../../services/user/user.service';
import { TimedPosition } from '../../../models/timedPosition';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit,OnDestroy {

  positionSub : Subscription;

  
changeDetectorRefs :ChangeDetectorRef[] = [];

  public selectedMoments = [
    new Date(2018, 1, 12, 10, 30),
    new Date(2018, 6, 20, 20, 30)
];
  geoMap: L.Map;
  layerOfMarkers : L.Layer;
  markerLayers = new Array<any>();
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
  
  positions : TimedPosition[] = [];

	// Form model object
	model = new LeafletLayersModel(
		[ this.LAYER_OSM, this.LAYER_OCM ],
		this.LAYER_OSM.id,
		[ ]
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
    private userService : UserService
  ) {
    this.apply();

  } 
  ngOnInit() {
  }
  ngOnDestroy(): void {
    if(this.positionSub !== null && this.positionSub !== undefined)
      this.positionSub.unsubscribe();
  }

  onMapReady(map: L.Map) {
    this.geoMap = map;
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
	searchPositions(){

    // get time in milliseconds and then parse in seconds
    //let startDate = this.convertDate(this.selectedMoments[0].getTime());
    //let endDate = this.convertDate(this.selectedMoments[1].getTime());
    let startDate = this.selectedMoments[0].getTime();
    let endDate = this.selectedMoments[1].getTime();
    this.positionSub = this.userService.searchPositions(startDate,endDate)
                                      .subscribe( (data) => 
                                                { console.dir(data); 
                                                  for(let i = 0; i < data.length; i++){
                                                    //console.dir(data[i].getPointCoordinate());
                                                    //console.dir(c);
                                                    this.positions.push(data[i]);
                                                  }
                                                  this.addMarkerToMap();
                                                } );    
  }

  addMarkerToMap(){
    this.cancel();
    for(let i=0 ; i< this.positions.length; i++){
      let lat = this.positions[i].point.coordinates[0];
      let lng = this.positions[i].point.coordinates[1];
      let timestamp = this.positions[i].timestamp;
      let user = this.positions[i].user;
      // add each marker as a layer
      this.markerLayers[i] = L.marker([lat, lng], {icon: this.greenIcon});
      this.markerLayers[i].bindPopup("<b>User:</b> "+ user + "<br>Timestamp:"+ (new Date(timestamp)).toString());
    }
    // add all layers as a single array to layer
    this.layerOfMarkers = L.layerGroup(this.markerLayers);
    this.geoMap.addLayer(this.layerOfMarkers);
    this.changeDetectorRef.detectChanges();
    //alert("Recieved: " + JSON.stringify(this.positions));
   }

  cancel(){
    
    if(this.layerOfMarkers !== null && this.layerOfMarkers !== undefined){
      this.geoMap.removeLayer(this.layerOfMarkers);
    }  
   
  }

  convertDate(date :  number) : number{
    let s = "" + date;
    s = s.slice(0,-3);
    let onlySeconds= parseInt(s);
    return onlySeconds;
  }

}
