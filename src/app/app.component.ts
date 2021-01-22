import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'itesm-dsl-webapp';


  constructor(
    private router: Router,
    private auth: AuthService,
    private bnIdle: BnNgIdleService
  ){
    this.bnIdle.startWatching(900).subscribe((res) => {
      if(res) {
          auth.logout();
      }
  });
  }

}
