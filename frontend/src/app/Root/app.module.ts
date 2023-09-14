import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRoleInterceptor } from '../Core/Interceptors/user-role.interceptor';
import { authReducer } from '../Shared/State/Reducers/auth.reducer';
import { usersReducer } from '../Shared/State/Reducers/users.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    StoreModule.forRoot({
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
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UserRoleInterceptor, multi: true },
    WINDOW_PROVIDERS,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], //For angular material
})
export class AppModule {}
