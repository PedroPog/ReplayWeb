import { Component, Input } from '@angular/core';

@Component({
  selector: 'lista-item',
  standalone: true,
  imports: [],
  templateUrl: './lista-item.component.html',
  styleUrl: './lista-item.component.scss'
})
export class ListaItemComponent {

  @Input() imagemUrl: any;
  @Input() title: any;
  @Input() descricao: any;

}
