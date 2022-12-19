import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  @Input()
  title: string = '';
  type: string = '';

  constructor() {}

  ngOnInit(): void {}
}
