import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() label: string = 'Clique';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() color: string = 'primary'; // Exemplo de cor customizável
}
