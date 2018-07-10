import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Archive } from '../../models/archive';
import { ResponseContentType, RequestOptions, RequestMethod } from '@angular/http';
import { Headers, Http} from '@angular/http';
import { saveAs } from 'file-saver/FileSaver';
import { NavigableArchive} from '../../models/navigablearchive';
import { ISubscription } from 'rxjs/Subscription';
@Injectable()
export class ArchiveService implements OnDestroy{

    private subscription1: ISubscription;
    private subscription2: ISubscription;

    serverAddress : String = environment.API_URL+"/user";
    resourceAddress : String = environment.API_URL+"/user/archives";
    //resourceAddress : String = "http://localhost:3000/archives";
    ownArchiveParam : String = "?ownership=self";
    purchasedArchiveParam : String = "?ownership=purchased";
    constructor(private webclient : HttpClient, private http : Http) {

    }

    getSelfArchives(page:number,size:number) : Observable<NavigableArchive>{
        return this.webclient.get<NavigableArchive>(this.resourceAddress+""+this.ownArchiveParam+"&page="+page+"&size="+size);
        //return Observable.of([]);
    }

    getPurchasedArchives(page:number,size:number) : Observable<NavigableArchive>{
        return this.webclient.get<NavigableArchive>(this.resourceAddress+""+this.purchasedArchiveParam+"&page="+page+"&size="+size);
        //return Observable.of([]);
    }
    navigateNext(nav:NavigableArchive):Observable<NavigableArchive>{
        return this.webclient.get<NavigableArchive>(nav._links.next.href);
    }
    navigateBack(nav:NavigableArchive):Observable<NavigableArchive>{
      return this.webclient.get<NavigableArchive>(nav._links.previous.href);
    }

    getArchives(filenames:String[]){
        let body : String[] = filenames;
        let token = window.localStorage.getItem('ai-token');
        let newheaders = new Headers( );
        newheaders.append( 'Content-Type', 'application/json' );
        newheaders.append('Authorization','Bearer '+ token);
        
        this.subscription1 = this.http.post(this.serverAddress+"/zip/archives/", body, {
            method: RequestMethod.Post,
            responseType: ResponseContentType.Blob,
            headers: newheaders
        }).subscribe(
            (response) => {
                console.log("File downloaded");
                var blob = new Blob([response.blob()], {type: 'application/zip'});
                var filename = 'file.zip';
                saveAs(blob, filename);
        }, (error) => {
            console.log("File not downloaded");
            var blob = new Blob([error.blob()], {type: 'application/json'});
                var filename = 'error.json';
                saveAs(blob, filename);
        }
    );
        //return this.webclient.post(this.serverAddress+"/ziparchive", body);
        //return this.webclient.get(this.resourceAddress+"/"+filename);
    }


    getArchive(filename:string){
        let body : String[] = [];
        body.push(filename);
        let token = window.localStorage.getItem('ai-token');
        let newheaders = new Headers( );
        newheaders.append( 'Content-Type', 'application/json' );
        newheaders.append('Authorization','Bearer '+ token);
        
        this.subscription2 = this.http.get(this.serverAddress+"/archives/"+filename,{
            method: RequestMethod.Get,
            responseType: ResponseContentType.Blob,
            headers: newheaders
        }).subscribe(
            (response) => {
                console.log("File downloaded");
                var blob = new Blob([response.blob()], {type: 'application/json'});
                var filename = 'file.json';
                saveAs(blob, filename);
        }, (error) => {
            console.log("File not downloaded");
            var blob = new Blob([error.blob()], {type: 'application/json'});
                var filename = 'error.json';
                saveAs(blob, filename);
        }
    );
        //return this.webclient.post(this.serverAddress+"/ziparchive", body);
        //return this.webclient.get(this.resourceAddress+"/"+filename);
    }

    deleteArchive(filename:string){
        return this.webclient.delete(this.resourceAddress+"/"+filename);
    }

    deleteArchives(filenames : string[]){
        let newbody : String[] = filenames;
        let newheaders = new HttpHeaders( );
        let token = window.localStorage.getItem('ai-token');
        newheaders.append( 'Content-Type', 'application/json' );
        newheaders.append('Authorization','Bearer '+ token);
        console.dir(newbody);
        /*for(let filename in filenames){
            newbody.push(filename);
        }*/
        //http.request('delete', url, { body: { ... } });
        return this.webclient.request('delete',this.resourceAddress+"", { headers: newheaders, body:newbody});
        
    }

    ngOnDestroy(): void {
        this.subscription1.unsubscribe();
        this.subscription2.unsubscribe();
    }
}
