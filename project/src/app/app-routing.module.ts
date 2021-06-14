import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArenaComponent } from './components/arena/arena.component';
import { CharCreatorComponent } from './components/char-creator/char-creator.component';
import { CityComponent } from './components/city/city.component';
import { HomeComponent } from './components/home/home.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ShopComponent } from './components/shop/shop.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/Loading',
    pathMatch: 'full',
  },
  {
    path: 'Loading',
    component: LoadingComponent,
  },
  {
    path: 'Home',
    component: HomeComponent,
  },
  {
    path: 'CharCreator',
    component: CharCreatorComponent,
  },
  {
    path: 'City',
    component: CityComponent,
  },
  {
    path: 'Shop',
    component: ShopComponent,
  },
  {
    path: 'Arena',
    component: ArenaComponent,
  },
  {
    path: '**',
    redirectTo: '/Loading',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
