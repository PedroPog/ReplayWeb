import { Component } from '@angular/core';

@Component({
  selector: 'detalhes-item',
  standalone: true,
  imports: [],
  templateUrl: './detalhes-item.component.html',
  styleUrl: './detalhes-item.component.scss',
})
export class DetalhesItemComponent {
  title: string = 'Titulo';
  subtitle: string = 'Subtitulo';
  year: string = '2025';
  descricao: string =
    'Lorem ipsum dolor sit amet. Est possimus beatae qui' +
    ' exercitationem quia qui internos debitis ut quibusdam placeat sed assumenda' +
    ' modi est inventore consequatur. Ut praesentium laboriosam et minus illo aut fuga' +
    ' quod qui officia laudantium quo quia temporibus et praesentium dolor vel eveniet' +
    ' earum. Ut consequatur sunt et explicabo tempore 33 sunt eveniet.';
}
