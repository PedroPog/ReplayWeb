import { Component } from '@angular/core';
import { ListaItemComponent } from "../lista-item/lista-item.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'page-home',
  standalone: true,
  imports: [
    ListaItemComponent,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.scss'
})
export class PageHomeComponent {
  year = new Date().getFullYear();
  filtroOne:String[]=["teste","teste"];
}
