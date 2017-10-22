import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './pages/home/home.component';
import {SearchComponent} from './pages/search/search.component';

const routes: Routes = [
    {//home page
        path: '',
        component: HomeComponent
    },
    {//search page
        path: 'search',
        component: SearchComponent
    }
];

export const RoutingModule = RouterModule.forRoot(routes);