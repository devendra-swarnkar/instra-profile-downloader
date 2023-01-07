import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { getMode } from 'ionicons/dist/types/stencil-public-runtime';
import { StorageService } from '../services/storage.service';

@Component({

  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit, AfterViewInit{
  theme:boolean;
  languages: Array<string> = [];
  currentLang: string = 'en';
  langList : any = {
    'hi': "हिन्दी",
    'en': 'English',
    'pt': 'Portugese',
    'ru': 'Russian',
    'tr': "Turkish"
  }
  constructor(
    private actionSheet: ActionSheetController ,
    private  translateService: TranslateService,
    private storage: StorageService
  ) { 
  
  }

  async ngOnInit() {
    this.currentLang = this.translateService.getDefaultLang();
   this.translateService.addLangs(['pt', 'ru','tr']);
   this.translateService.setTranslation('pt', {
    "Download": "Baixar",
    "History": "História",
    "Setting": "Definição",
    "Share": "Partilhar",
    "changeLangHeader": "Alterar o Idioma",
    "Selects Your Lauguage": "Selecione A Sua Lauguage",
    "Storge folder": "Pasta Storge",
    "Internal storage/ Insta downloader": "Armazenamento interno/ Descarregador de Insta",
    "Dark mode":"modo escuro",
    "Total":"Total"
  });
  
   this.translateService.setTranslation('ru', {
    "Download": "Загружать",
    "History": "История",
    "Setting": "Оправа",
    "Share": "Предоставить общий доступ",
    "changeLangHeader": "Изменение языка",
    "Selects Your Lauguage": "Выбирает Ваш язык",
    "Storge folder": "Папка Storge",
    "Internal storage/ Insta downloader": "Внутренняя память/ Загрузчик Insta",
    "Dark mode":"темный режим",
    "Total":"общий"
  });
   this.translateService.setTranslation('tr', {
    "Download": "İndirmek",
    "History": "Tarih",
    "Setting": "Ayar",
    "Share": "Paylaş",
    "changeLangHeader": "Dili Değiştir",
    "Selects Your Lauguage": "Lauguage'ınızı Seçer",
    "Storge folder": "Storge klasörü",
    "Internal storage/ Insta downloader": "Dahili depolama / Insta indiricisi",
    "Dark mode":"karanlık mod",
    "Total":"Toplam"
  });

    this.languages = this.translateService.getLangs();
    this.translateService.onDefaultLangChange.subscribe((lang)=>{
      this.currentLang = lang.lang;
    })
    
  }
ngAfterViewInit() {
  setTimeout(async () => {
    const mode = await this.storage.get('mode');

    if(mode == 'light'){
      this.theme=false;

    }
    else if(mode == 'dark'){
      this.theme= true;
    }
    else{
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      this.theme=prefersDark.matches;
  }
  });
}
 async changeLang(){
  const buttons = this.languages.map(item=>{
    return {
      text: this.langList[item],
      handler: () => {
        this.translateService.setDefaultLang(item);
      }
    }
  });

  const alert = await this.actionSheet.create({
    header: this.translateService.instant('changeLangHeader'),
    buttons: buttons
  });

  await alert.present();
  }

  changeTheme(ev){
    
    document.body.classList.toggle('dark', ev.target.checked);
    this.storage.set('mode', ev.target.checked?'dark':'light');
  }
}
