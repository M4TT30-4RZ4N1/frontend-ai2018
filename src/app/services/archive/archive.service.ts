import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Archive } from '../../models/archive';
import { ResponseContentType, RequestOptions, RequestMethod } from '@angular/http';
import { Headers, Http} from '@angular/http';
import fileSaver = require("file-saver");
@Injectable()
export class ArchiveService {
    serverAddress : String = environment.API_URL+"/user";
    resourceAddress : String = environment.API_URL+"/user/archives";
    //resourceAddress : String = "http://localhost:3000/archives";
    ownArchiveParam : String = "?ownership=self";
    purchasedArchiveParam : String = "?ownership=purchased";
    constructor(private webclient : HttpClient, private http : Http) { 

    }

    getSelfArchives() : Observable<Archive[]>{
        return this.webclient.get<Archive[]>(this.resourceAddress+""+this.ownArchiveParam);
        //return Observable.of([]);
    }

    getPurchasedArchives() : Observable<Archive[]>{
        return this.webclient.get<Archive[]>(this.resourceAddress+""+this.purchasedArchiveParam);
        //return Observable.of([]);
    }


    
    getArchive(filename:string){
        let body : String[] = [];
        body.push(filename);
        let token = window.localStorage.getItem('ai-token');
        let newheaders = new Headers( );
        newheaders.append( 'Content-Type', 'application/json' );
        newheaders.append('Authorization','Bearer '+ token);
        this.http.post(this.serverAddress+"/ziparchive", body, {
            method: RequestMethod.Post,
            responseType: ResponseContentType.Blob,
            headers: newheaders
        }).subscribe(
            (response) => {
                var blob = new Blob([response.blob()], {type: 'application/zip'});
                var filename = 'file.zip';
                fileSaver.saveAs(blob, filename);
        }
    );
        //return this.webclient.post(this.serverAddress+"/ziparchive", body);
        //return this.webclient.get(this.resourceAddress+"/"+filename);
    }

    deleteArchive(filename:string){
        return this.webclient.delete(this.resourceAddress+"/"+filename);
    }

}
