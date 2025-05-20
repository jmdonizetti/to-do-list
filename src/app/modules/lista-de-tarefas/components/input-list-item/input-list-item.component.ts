import { Component, Input, Output } from '@angular/core';

//interface
import { IListItems } from '../../interface/IListItems.interface';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-list-item',
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss'
})
export class InputListItemComponent {
  @Input({ required:true }) public inputListItems: IListItems[] = [];

  @Output() public outputUpdateItemCheckbox = new EventEmitter<{
    id: string;
    checked: boolean;
  }>();

  public updateItemCheckbox(id: string, checked: boolean,){
    return this.outputUpdateItemCheckbox.emit({ id, checked });
  }
}
