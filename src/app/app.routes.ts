import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AudioComponent } from './pages/audio/audio.component';
import { AudioListingComponent } from './pages/audio-listing/audio-listing.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: "dashboard",
        component: DashboardComponent,
        children: [
            {
                path: '',
                redirectTo: 'audio',
                pathMatch: 'full'
            },
            {
                path: 'audio/upload',
                component: AudioComponent
            },
            {
                path: 'audio',
                component: AudioListingComponent
            },
            {
                path: 'users',
                component: UsersComponent
            }
        ]
    }
];
