import { ChangeDetectorRef, Component, EventEmitter, ElementRef, inject, Output, ViewChild } from '@angular/core';

//interface
import { IListItems } from '../../interface/IListItems.interface';


@Component({
  selector: 'app-input-add-item',
  imports: [],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})

export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef);

  @ViewChild("inputText") public inputText!: ElementRef;

  @Output() public outputAddListItem = new EventEmitter<IListItems>();

  public focusAndAddItem(value: string) {
    if(value) {
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = ''; //limpa o input ao apertar o enter

      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const id = `ID ${timestamp}`;

      this.outputAddListItem.emit({
        id,
        checked: false,
        value,
      });

      return this.inputText.nativeElement.focus();
    }
  }
}
