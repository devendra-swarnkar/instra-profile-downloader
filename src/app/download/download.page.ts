import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage implements OnInit {
  itemCount: number = 21;

  downloads: any[] = [
    {
      username: 'anyusername',
      image: 'assets/profile-demo.png',
    },
    {
      username: 'anotherusername',
      image: 'assets/profile-demo.png',
    },
    {
      username: 'fakeusername',
      image: 'assets/profile-demo.png',
    },
    {
      username: 'someone',
      image: 'assets/profile-demo.png',
    },
    {
      username: 'etc',
      image: 'assets/profile-demo.png',
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
