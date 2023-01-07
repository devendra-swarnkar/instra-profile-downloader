import { Component, Input, OnInit } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { ModalController } from '@ionic/angular';
import { DownloadService } from 'src/app/services/download.service';

@Component({
  selector: 'app-userpic-modal',
  templateUrl: './userpic-modal.component.html',
  styleUrls: ['./userpic-modal.component.scss'],
})
export class UserpicModalComponent implements OnInit {
  @Input() username: string;
  @Input() url: string;
  constructor(private modalController: ModalController, private downserv: DownloadService) { }

  ngOnInit() {}

  closeModal(){
    this.modalController.dismiss();
  }
  async saveImg() {
    this.downserv.download(this.url);
  };
  
  
}