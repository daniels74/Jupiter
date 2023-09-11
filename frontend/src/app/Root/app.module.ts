import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from '../Shared/navbar/navbar.module';
import { HttpClientModule } from '@angular/common/http';
import { WINDOW_PROVIDERS } from '../window-token';
import { StoreModule } from '@ngrx/store';
import { cryptoReducer } from '../Shared/State/Reducers/cryptoList.reducer';
import { nftReducer } from '../Shared/State/Reducers/nftList.reducer';
import { userProfileGuard } from '../Shared/guards/user-profile.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    StoreModule.forRoot({ cryptos: cryptoReducer, nfts: nftReducer }), // // REDUX
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    HttpClientModule,
  ],
  providers: [WINDOW_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}