import { Component, signal } from '@angular/core';

//components
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { IListItems } from '../../interface/IListItems.interface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [InputAddItemComponent, JsonPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public addItem = signal(true);

  #setListItems = signal<IListItems[]>([this.#parseItems()]);
   getListItems = this.#setListItems.asReadonly();

   #parseItems(){
    return JSON.parse(localStorage.getItem('@my-list') || '[]')
   }
  public getInputAndAddItem(value: IListItems){
//Salvando no localstorage
    localStorage.setItem('@my-list', JSON.stringify([value]));
  }
}
