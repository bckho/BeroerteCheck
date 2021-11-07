import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  resultScore: number = null;

  constructor(private router: Router) {
    let result = localStorage.getItem("predictResult");

    if (result != null) {
      this.resultScore = Number((Number(localStorage.getItem("predictResult")) * 100).toFixed(2))
    } else {
      this.router.navigate(['/Home'])
    }
  }

  ngOnInit(): void {
  }

}
