import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paddle',
  standalone: true,
  imports: [],
  templateUrl: './paddle.component.html',
  styleUrl: './paddle.component.scss'
})
export class PaddleComponent {

  @Input() paddleX:number | undefined

}
