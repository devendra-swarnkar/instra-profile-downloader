import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { UserpicModalComponent } from '../components/userpic-modal/userpic-modal.component';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  history: Array<History> = [ ];

  constructor(private storageService: StorageService, private alertController: AlertController,private modalController: ModalController ) { }

  ngOnInit() {
   
  }

  async getHistory(){
    const hist =  await this.storageService.get('history');
    this.history = hist ?? [];
    this.history = this.history.reverse();
  }

  async clearHistory(){
    const alert = await this.alertController.create({
      header: 'Delete History!',
      message: 'Are you sure you want to delete history?',
      buttons: [
        {
          'text': 'Delete',
          handler: async ()=>{
            await this.storageService.set('history',[]);
            this.history = [];
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: ()=>{}
        }
      ]
    });

    await alert.present();
  }

  
async  showUserModal(url: string,username: string){
  const modal = await this.modalController.create({
    component: UserpicModalComponent,
    componentProps: {
      url:url,
      username: username
    },

  });
  await modal.present();
  }
  
}


export interface History{
  id: string;
  image: string;
  username: string;
  date: string;
}