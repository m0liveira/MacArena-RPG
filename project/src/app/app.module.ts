import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CityComponent } from './components/city/city.component';
import { CharCreatorComponent } from './components/char-creator/char-creator.component';
import { ShopComponent } from './components/shop/shop.component';
import { ArenaComponent } from './components/arena/arena.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoadingComponent,
    CityComponent,
    CharCreatorComponent,
    ShopComponent,
    ArenaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
