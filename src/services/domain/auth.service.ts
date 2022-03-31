import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { CredentialsDTO } from '../../models/credentials.dto';


@Injectable()
export class AuthService {
   
    constructor( public http: HttpClient){

    }

    authenticate(creds : CredentialsDTO){
       return this.http.post(`
        ${API_CONFIG.baseUrl}/login`,
        creds,
        {
            observe: 'response',
            responseType: 'text'
        });
    }


}