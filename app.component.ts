import { Component } from '@angular/core';
import { LeafletService } from './services/leaflet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dynamic-leaflet-creator';

  constructor(private leafletService:LeafletService, private router:Router){
    if(this.leafletService.pageData==null || this.leafletService.pageData==undefined || this.leafletService.pageData.length==0){
      this.router.navigate(['/app-upload-excel'],{replaceUrl:true})
    }
  }
 
}
