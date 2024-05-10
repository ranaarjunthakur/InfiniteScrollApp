import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-brick',
  standalone: true,
  imports: [],
  templateUrl: './brick.component.html',
  styleUrl: './brick.component.scss'
})
export class BrickComponent {

  @Input() brick!:any

}
