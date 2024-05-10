import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AnimationComponent } from './components/animation/animation.component';
import { authGuard } from './auth/auth.guard';
import { BrickBreakerComponent } from './components/brick-breaker/brick-breaker.component';

export const routes: Routes = [

    {
        path:'',
        component:LoginComponent,
        title: 'Login',
    },
    {
        path:'login',
        component:LoginComponent,
        title: 'Login',
    },
    {
        path:'animations',
        component:AnimationComponent,
        title:'Animation',
        canActivate: [authGuard],
    },
    {
        path:'brickBreaker',
        component:BrickBreakerComponent,
        title: 'Brick  Breaker Game',
    },

];
