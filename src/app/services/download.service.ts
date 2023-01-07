import { Injectable } from '@angular/core';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@awesome-cordova-plugins/file/ngx';


@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private file: File ) { }

async download(img:string) {
  const url = img;
  let fileTransfer = await FileTransfer.create() ;
  fileTransfer.download(url, this.file.dataDirectory + 'file.jpg').then((entry) => {
    console.log('download complete: ' + entry.toURL());
  }, (error) => {
    // handle error
  });
}

}