import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html'
})
export class UserlistComponent {
  data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
  ];

  constructor(public msg: NzMessageService) {}
}
