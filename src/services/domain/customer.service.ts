import { StorageService } from './../storage.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { CustomerDTO } from "../../models/customer.dto";


@Injectable()
export class CustomerService{


    constructor(public http:HttpClient , public storage : StorageService){
    }

    findByEmail(email : string){
        return this.http.get(`${API_CONFIG.baseUrl}/customers/email?value=${email}`);        
    }

    getImageFromBucket(id: string) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url,{responseType:"blob"});
    }

    insert(obj : CustomerDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/customers`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }


}