import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(
    private storage: Storage, 
    private langService: TranslateService) {

  }
  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
    //this.langService.setDefaultLang('hi');
    this.langService.setDefaultLang('en');
    const mode = await this.storage.get('mode');
    
    if(mode == 'light'){
      document.body.classList.toggle('dark', false);
    }
    else if(mode == 'dark'){
      document.body.classList.toggle('dark', true);
    }
    else{
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      document.body.classList.toggle('dark', prefersDark.matches);
  }
}
} 