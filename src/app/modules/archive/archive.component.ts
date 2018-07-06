import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  items : Array<any> = new Array(4);

  constructor() { }

  ngOnInit() {
    this.items.push('Antonio');
    this.items.push('Matteo');
    this.items.push('Raffaele');
    this.items.push('Sabrina');
  }

  download(){
    console.log('downloading');
  }

  remove(){
    console.log('removing');
  }

}
