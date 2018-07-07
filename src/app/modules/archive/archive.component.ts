import { Component, OnInit } from '@angular/core';
import { ArchiveService } from '../../services/archive/archive.service';
import { Subscription } from 'rxjs/Subscription';
import { Archive } from '../../models/archive';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  ownArchiveSub : Subscription;
  purchasedArchiveSub : Subscription;
  deleteSub : Subscription;
  downloadSub : Subscription;
  ownArchives : Archive[] = [];
  purchasedArchives : Archive[] = [];
  items : Array<any> = new Array(4);

  constructor(private archiveService : ArchiveService) { }

  ngOnInit() {
    this.items.push('Antonio');
    this.items.push('Matteo');
    this.items.push('Raffaele');
    this.items.push('Sabrina');
    this.ownArchiveSub = this.archiveService.getSelfArchives()
                              .subscribe( (data) => {
                                                  //console.dir(data); 
                                                  for(let i = 0; i < data.length; i++){
                                                    let a : Archive= new Archive(data[i].owner, data[i].filename, data[i].counter, data[i].deleted);
                                                    this.ownArchives.push(a);
                                                  }
                              } );
    this.purchasedArchiveSub = this.archiveService.getPurchasedArchives()
                              .subscribe( (data) => {
                                                  //console.dir(data); 
                                                  for(let i = 0; i < data.length; i++){
                                                    let a : Archive= new Archive("", data[i].filename, 0, false);
                                                    this.purchasedArchives.push(data[i]);
                                                  }
                              } );
  }

  ngOnDestroy(): void {
    if(this.ownArchiveSub !== null && this.ownArchiveSub !== undefined)
      this.ownArchiveSub.unsubscribe();
    if(this.purchasedArchiveSub !== null && this.purchasedArchiveSub !== undefined)
      this.purchasedArchiveSub.unsubscribe();
    if(this.deleteSub !== null && this.deleteSub !== undefined)
      this.deleteSub.unsubscribe();
    if(this.downloadSub !== null && this.downloadSub !== undefined)
      this.downloadSub.unsubscribe();
  }

  download(filename:string){
    console.log('downloading ' + filename);
    this.archiveService.getArchive(filename);
    /*this.downloadSub = this.archiveService.getArchive(filename)
                      .subscribe(/(data : Response) =>{
                        console.log(data);
                        this.downloadFile(data);
                      },
                 (error) => {
                   console.dir(error);
                   alert("Error downloading the file");
                 }
                      );*/
  }
  downloadFile(data: Response){
    var blob = new Blob([data], { type: 'application/zip' });
    var url= window.URL.createObjectURL(blob);
    window.open(url);
  }

  remove(filename:string){
    console.log('removing ' + filename);
    let removedElement : Archive;
    //rimozione preventiva dell'elemento dalla lista
    for(let i = 0; i < this.ownArchives.length; i++){
      let archiveFilename : String = this.ownArchives[i].getFilename();
      if(archiveFilename.localeCompare(filename) == 0){
        removedElement = this.ownArchives[i];
        this.ownArchives.splice(i, 1);
        break;
      }
    }
    this.deleteSub = this.archiveService.deleteArchive(filename)
                        .subscribe( (data) => {

                        },
                       (error) => {
                         //se ho avuto errore riaggiungo l'elemento nella lista
                         this.ownArchives.push(removedElement);
                         alert("Server error. Unable to delete " + filename)
                       })
    
  }

}
