import { NgModule } from '@angular/core';
// import { InterceptorService } from './services/base/interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

// import { AuthGuard } from './guards/auth.guard';
// import { MainGuard } from './guards/main.guard';

import { AuthService } from './auth/auth.service';


// import { EnvService } from './services/env/env.service';
// import { EnvServiceProvider } from './services/env/env.service.provider';

@NgModule({
    imports: [HttpClientModule],
    providers: [
        DatePipe,
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: InterceptorService,
        //     multi: true,
        // },

        // AuthGuard, MainGuard,

        AuthService,         
    ],

    declarations: [],
    exports: []
})
export class CoreModule { }