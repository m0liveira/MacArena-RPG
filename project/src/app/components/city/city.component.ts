import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RpgServiceService } from 'src/app/services/rpg-service.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  constructor(private rpgService: RpgServiceService, router: Router) {
    this.router = router;
  }

  ngOnInit(): void {
  }

  // vars
  router: Router;


  logOut() {
    this.router.navigate(['/Home']);
  }

}
