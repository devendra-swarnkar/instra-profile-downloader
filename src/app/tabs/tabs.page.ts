import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActionSheetController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { UserpicModalComponent } from '../components/userpic-modal/userpic-modal.component';
import { History } from '../history/history.page';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
 name:string='';
  filteredArray: string[] = [];
  profilePic: string = '';
  
  constructor(private loading: LoadingController,
     private http: HttpClient,
      private toast: ToastController,
      private modalController: ModalController,
      private storageService: StorageService) {

    
  }

  ngOnInit(): void {

  }

async  getInstaProfile(username: string)
{
  const load = await this.loading.create({
    message: 'Getting Profile Pic',
    spinner: 'bubbles'
  });
  await load.present();
  const apibaseUrl: string = `https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/ig_profile?response_type=full&ig=${username}&corsEnabled=true`;
  
  let headers : HttpHeaders = new HttpHeaders();
  headers = headers.append('x-rapidapi-host','instagram-bulk-profile-scrapper.p.rapidapi.com');
 headers = headers.append('x-rapidapi-key', environment.APIKEY);
  this.http.get(apibaseUrl, {headers: headers}).subscribe(async (data: any)=>{
    let imghd = data[0]?.hd_profile_pic_url_info?.url;
    await load.dismiss();
    if(imghd){
      this.profilePic = imghd; 
      this.showUserModal(imghd, username);
      let history: Array<History> = await this.storageService.get('history');
      history  = history??[];
      
      const currentItem: History = {
        id: '',
        date: new Date().toDateString(),
        image: this.profilePic,
        username :username

      }
      history = [...history, currentItem];
      

      this.storageService.set('history',history);
    }
    else{
      this.showToast('some thing went wrong');
    }
  })
}
  

  search(searchString){
  
    let username : string = searchString.target.value;

    this.getInstaProfile(username);

  }
zoomIn(event){
  console.log(event);
}
  changeTheme(){
    
  }

  
 
  // Called when the app loads

  
  // Called by the media query to check/uncheck the toggle
   checkToggle() {
    document.body.classList.toggle('dark');
  }

 async  showToast(message: string){
  const t = await this.toast.create({
    message: message,
    color: 'danger',
    duration:2000
  });
  await t.present();
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