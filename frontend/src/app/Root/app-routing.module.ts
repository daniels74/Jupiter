import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FourzerofourComponent } from '../Features/fourzerofour/fourzerofour.component';

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
    path: 'register',
    loadChildren: () =>
      import('../Features/register/register.module').then(
        (m) => m.RegisterModule,
      ),
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
    path: 'surfer/:id',
    // resolve: {
    //   crypto: surferResolver,
    // },
    loadChildren: () =>
      import('../Features/surfer/surfer.module').then((m) => m.SurferModule),
  },
  { path: '**', component: FourzerofourComponent },
  // { path: 'a', loadChildren: () => import('./modulea/modulea.module').then(m => m.ModuleaModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
