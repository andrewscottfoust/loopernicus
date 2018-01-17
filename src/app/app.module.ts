import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

//Material
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

//Looper
import { SamplesService } from './games/looper/services/samples.service';
import { LoopsService } from './games/looper/services/loops.service';
import { LooperComponent } from './games/looper/components/looper/looper.component';
import { LoopListComponent } from './games/looper/components/loop-list/loop-list.component';
import { SampleListComponent } from './games/looper/components/sample-list/sample-list.component';
import { LoopPlayerComponent } from './games/looper/components/loop-player/loop-player.component';
import { SamplePlayerComponent } from './games/looper/components/sample-player/sample-player.component';
import { ItemBrowserComponent } from './games/looper/components/item-browser/item-browser.component';
import { EditorComponent } from './games/looper/components/editor/editor.component';
import { LooperHeaderComponent } from './games/looper/components/looper-header/looper-header.component';
import { SampleManagerComponent } from './games/looper/components/sample-manager/sample-manager.component';
import { LoopShareComponent } from './games/looper/components/loop-share/loop-share.component';

const appRoutes:Routes = [
  { path:'register', component: RegisterComponent },
  { path:'login', component: LoginComponent },
  { path:'editor/:id', component: EditorComponent, canActivate:[AuthGuard] },
  { path:'editor', component: EditorComponent, canActivate:[AuthGuard] },
  { path:'patch-manager', component: SampleManagerComponent, canActivate:[AuthGuard] },
  { path:'share/:id', component: LoopShareComponent },
  { path:'', component: LooperComponent, canActivate:[AuthGuard] },
  { path:'**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    PageNotFoundComponent,
    DashboardComponent,
    LooperComponent,
    LoopListComponent,
    SampleListComponent,
    LoopPlayerComponent,
    SamplePlayerComponent,
    ItemBrowserComponent,
    EditorComponent,
    LooperHeaderComponent,
    SampleManagerComponent,
    LoopShareComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase, 'afkidgames'),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatMenuModule,
    MatSliderModule,
    MatSelectModule,
    MatTabsModule
  ],
  providers: [
    AngularFireDatabase,
    AngularFireDatabaseModule,
    AuthService,
    SamplesService,
    LoopsService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
