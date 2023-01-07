import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { UserpicModalComponent } from './components/userpic-modal/userpic-modal.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StorageService } from './services/storage.service';
import { MissingTranslationHandler, TranslateCompiler, TranslateLoader, TranslateModule, TranslateParser } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DownloadService } from './services/download.service';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Storage } from '@ionic/storage-angular';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent, UserpicModalComponent],
  imports: [BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule,
       HttpClientModule,
  IonicStorageModule.forRoot(), 
  TranslateModule.forRoot({
    defaultLanguage: 'hi',
    loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
}),
IonicStorageModule.forRoot()
],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, StorageService, DownloadService, File, Storage],
  bootstrap: [AppComponent],
})

@NgModule({
  imports: [
    IonicStorageModule.forRoot()
  ]
})
export class AppModule { }