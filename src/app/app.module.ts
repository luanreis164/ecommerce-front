import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategorieService } from '../services/domain/categories.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { CustomerService } from '../services/domain/customer.service';
import { AuthIncerceptorProvider } from '../interceptors/auth-interceptor';
import { ProductService } from '../services/domain/product.service';

@NgModule({
  declarations: [
    MyApp
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategorieService,
    AuthIncerceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    CustomerService,
    ProductService,
    
  ]
})
export class AppModule {}
