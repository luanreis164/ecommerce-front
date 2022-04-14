import { Injectable } from '@angular/core';

@Injectable()
export class ImageUtilService{  

    dataUriToBlob(dataUri){
        var byteString = atob(dataUri.split(',')[1]);
        var mimeString = dataUri.split(',')[0].split(':')[1].split(';')[0];
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i=0; i< byteString.length; i++){
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab],{type:mimeString});
    }


}