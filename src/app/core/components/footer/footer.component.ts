import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(private data:DataService) {}

  ngOnInit(): void {
    this.data.getAllCities().subscribe((data) => {
      console.log(data);
    });
    this.data.getUser(1).subscribe((data) => {
      console.log(data);
    });
  }

}
