import {Routes, RouterModule, RouterLinkActive} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';

const routes: Routes = [
    {//home page
        path: '',
        component: HomeComponent
    }
];

export const RoutingModule = RouterModule.forRoot(routes);