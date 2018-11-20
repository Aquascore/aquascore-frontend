import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { OverviewComponent } from './overview/overview.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PoolsComponent } from './pools/pools.component';
import { RacingTeamsComponent } from './racing-teams/racing-teams.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreatePoolComponent } from './create-pool/create-pool.component';
import { CreateRacingTeamComponent } from './create-racing-teams/create-racing-teams.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

import { environment } from '../environments/environment';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';

export const tokenGetter = () => localStorage.getItem('access_token');

const appRoutes: Routes = [
  { path: '', component: OverviewComponent, canActivate: [AuthGuard] },
  { path: 'pools', component: PoolsComponent, canActivate: [AuthGuard] },
  { path: 'pools/create', component: CreatePoolComponent, canActivate: [AuthGuard] },
  { path: 'racing-teams', component: RacingTeamsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    OverviewComponent,
    PageNotFoundComponent,
    LoginComponent,
    PoolsComponent,
    RacingTeamsComponent,
    RegisterComponent,
    CreatePoolComponent,
    CreateRacingTeamComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [environment.apiDomain],
        blacklistedRoutes: [
          `${environment.apiDomain}/users/sign-up`,
          `${environment.apiDomain}/users/sign-in`
        ]
      }
    }),
  ],
  providers: [UserService, AuthGuard],

  bootstrap: [AppComponent],

  entryComponents: [ConfirmDialogComponent]
})
export class AppModule { }
