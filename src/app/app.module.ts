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
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCheckboxModule} from '@angular/material/checkbox';


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
import { CreateDriverComponent } from './create-driver/create-driver.component';
import { EditRacingTeamsComponent } from './edit-racing-teams/edit-racing-teams.component';
import { EditDriverComponent } from './edit-driver/edit-driver.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CreateTeamComponent } from './create-team/create-team.component';

import { environment } from '../environments/environment';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

const appRoutes: Routes = [
  { path: '', component: OverviewComponent, canActivate: [AuthGuard] },
  { path: 'pools', component: PoolsComponent, canActivate: [AuthGuard] },
  { path: 'pools/create', component: CreatePoolComponent, canActivate: [AuthGuard] },
  { path: 'racing-teams', component: RacingTeamsComponent, canActivate: [AuthGuard] },
  { path: 'racing-teams/create', component: CreateRacingTeamComponent, canActivate: [AuthGuard]},
  { path: 'racing-teams/edit/:id', component: EditRacingTeamsComponent, canActivate: [AuthGuard]},
  { path: 'racing-teams/createDriver', component: CreateDriverComponent, canActivate: [AuthGuard]},
  { path: 'racing-teams/editDriver/:id', component: EditDriverComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'create-team', component: CreateTeamComponent},
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
    ConfirmDialogComponent,
    CalendarComponent,
    CreateDriverComponent,
    EditDriverComponent,
    EditRacingTeamsComponent,
    CreateTeamComponent,
  
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
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatChipsModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    MatCheckboxModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
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

