import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        title:'Login',
        loadComponent: () =>
          import('./login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard.component').then((m) => m.DashboardComponent),
        children:[
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full',
            },
            {
                path: 'home',
                loadComponent: () =>
                  import('./pages/home/home.component').then((m) => m.HomeComponent),
            },
            {
                path: 'profile',
                loadComponent: () =>
                  import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
            },
            {
                path: 'activity',
                loadComponent: () =>
                  import('./pages/activity/activity.component').then( (m) => m.ActivityComponent)
            },
            {
                path: '**',
                redirectTo: 'notFound',
                pathMatch: 'full',
            },
        ]
    },
    {
        path: 'notFound',
        loadComponent: () =>
          import('./not-found/not-found.component').then((m) => m.NotFoundComponent),
    },
    {
        path: '**',
        redirectTo: 'notFound',
        pathMatch: 'full',
    },
];
