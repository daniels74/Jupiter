import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../Features/home/home.component';
import { LoginComponent } from '../Features/login/login.component';
import { cryptoCollectionResolver } from '../Shared/resolvers/crypto-collection.resolver';
import { nftCollectionResolver } from '../Shared/resolvers/nft-collection.resolver';
import { allCryptoResolver } from '../Shared/resolvers/all-crypto.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../Features/landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'home',
    // resolve: { allCrypto: allCryptoResolver },
    loadChildren: () =>
      import('../Features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../Features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'user/:id',
    // resolve: {
    //   crypto: cryptoCollectionResolver,
    //   nfts: nftCollectionResolver,
    // },
    loadChildren: () =>
      import('../Features/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('../Features/register/register.module').then(
        (m) => m.RegisterModule,
      ),
  },
  // { path: 'a', loadChildren: () => import('./modulea/modulea.module').then(m => m.ModuleaModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
