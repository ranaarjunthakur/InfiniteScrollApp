import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ball',
  standalone: true,
  imports: [],
  templateUrl: './ball.component.html',
  styleUrl: './ball.component.scss'
})
export class BallComponent {

  @Input() ballX!:any
  @Input() ballY!:any

}
