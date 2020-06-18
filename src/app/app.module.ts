import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppService } from './services/app.service';
import { CookiesService } from './services/cookies.service';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResetDialogComponent } from './reset-dialog/reset-dialog.component';
import { BonusDrawerComponent } from './bonus-drawer/bonus-drawer.component';
import { NewGameDialogComponent } from './new-game-dialog/new-game-dialog.component';
import { BonusDialogComponent } from './bonus-dialog/bonus-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    ResetDialogComponent,
    BonusDrawerComponent,
    NewGameDialogComponent,
    BonusDialogComponent
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
    MatDividerModule,
    MatIconModule,
    MatProgressBarModule,
    MatMenuModule,
  ],
  providers: [AppService, CookieService, CookiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
