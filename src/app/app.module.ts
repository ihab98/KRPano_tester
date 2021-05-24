import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ViewerComponent } from './viewer/viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewerComponent
  ],
  imports: [  
    BrowserModule,  
    HttpClientModule,  
    ],  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
