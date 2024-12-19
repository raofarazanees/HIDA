import { HttpClient } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { appRoutes } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthenticationService } from '@cdx/authentication';

xdescribe('Router: App', () => {

    let location: Location;
    let router: Router;
    let fixture;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule.withRoutes(appRoutes),HttpClient],
        declarations: [ ],
        providers:[AuthenticationService]
      });
   
      router = TestBed.get(Router);
      fixture = TestBed.createComponent(AppComponent); 
    });
    
    it('navigate to "" redirects you to /unauthorized', fakeAsync(() => {
              router.navigate(['not-found']);
        tick();      
        expect(location.pathname).toBe('/unauthorized');
      }));

  });

  