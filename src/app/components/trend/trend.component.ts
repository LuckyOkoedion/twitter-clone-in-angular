import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.css']
})
export class TrendComponent implements OnInit {

  trends = [
    {
      category: "Politics.Trending",
      title: "Buhari",
      count: "16.5k"
    },
    {
      category: "Trending in Nigeria",
      title: "Abuja",
      count: "7,368"
    },
    {
      category: "Trending in Nigeria",
      title: "Ojodu",
      count: "6,254"
    },
    {
      category: "Trending in Nigeria",
      title: "#Solana",
      count: "133k"
    }
  ];

  persons = [
    {
      name: "5ireChain",
      email: "5ireChain@gmail.com"
    },
    {
      name: "Solana",
      email: "solana@gmail.com"
    },
    {
      name: "Borderless Capital",
      email: "borderlessCapital@gmail.com"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
