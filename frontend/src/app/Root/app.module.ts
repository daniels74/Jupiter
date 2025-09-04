import {
  CUSTOM_ELEMENTS_SCHEMA,
  InjectionToken,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from '../Shared/navbar/navbar.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { WINDOW_PROVIDERS } from '../window-token';
import { StoreModule } from '@ngrx/store';
import { cryptoReducer } from '../Shared/State/Reducers/cryptoList.reducer';
import { nftReducer } from '../Shared/State/Reducers/nftList.reducer';
import { NgxSpinnerModule } from 'ngx-spinner';
// import { IvyCarouselModule } from 'angular-responsive-carousel-ng16';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRoleInterceptor } from '../Core/Interceptors/user-role.interceptor';
import { authReducer } from '../Shared/State/Reducers/auth.reducer';
import { usersReducer } from '../Shared/State/Reducers/users.reducer';
import { userCryptoCollectionReducer } from '../Shared/State/Reducers/userCryptoCollection.reducer';
import { userNftCollectionReducer } from '../Shared/State/Reducers/userNftCollection.reducer';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { GlowifyDirective } from '../Shared/CustomDirectives/glowify.directive';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DataRetryInterceptor } from '../Core/Interceptors/data-retry.interceptor';

export const BaseUrl = new InjectionToken<string>('');
@NgModule({
  declarations: [AppComponent],
  imports: [
    StoreModule.forRoot({
      nftCollection_ngrx: userNftCollectionReducer,
      cryptoCollection_ngrx: userCryptoCollectionReducer,
      userState_ngrx: usersReducer,
      authState_ngrx: authReducer,
      cryptos: cryptoReducer,
      nfts: nftReducer,
    }), // // REDUX
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    HttpClientModule,
    NgxSpinnerModule,
    // IvyCarouselModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  providers: [
    GlowifyDirective,
    // IvyCarouselModule,
    { provide: HTTP_INTERCEPTORS, useClass: UserRoleInterceptor, multi: true },
    // ?  Upon failure of a request, a retry is attempted shortly after.
    { provide: HTTP_INTERCEPTORS, useClass: DataRetryInterceptor, multi: true },
    WINDOW_PROVIDERS,
    {
      provide: BaseUrl,
      useValue: null, //'http://localhost:3000',
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], //For angular material
})
export class AppModule {}
