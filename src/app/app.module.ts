import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppService } from './services/app.service';
import { CookiesService } from './services/cookies.service';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResetDialogComponent } from './reset-dialog/reset-dialog.component';
import { BonusDrawerComponent } from './bonus-drawer/bonus-drawer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    ResetDialogComponent,
    BonusDrawerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatTooltipModule,
  ],
  providers: [AppService, CookieService, CookiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
