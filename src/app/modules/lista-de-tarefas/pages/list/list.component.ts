import { Component, signal } from '@angular/core';
import Swal from 'sweetalert2';

//components
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';

//Interface
import { IListItems } from '../../interface/IListItems.interface';

//enum
import { ELocalStorage } from '../../enum/ELocalStorage.enum';

@Component({
  selector: 'app-list',
  imports: [InputAddItemComponent, InputListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public addItem = signal(true);

  #setListItems = signal<IListItems[]>(this.#parseItems());
  public getListItems = this.#setListItems.asReadonly();

   #parseItems(){
    return JSON.parse(localStorage.getItem(ELocalStorage.MY_LIST) || '[]')
   }

   #updateLocalStorage(){
    return localStorage.setItem(
      ELocalStorage.MY_LIST,
      JSON.stringify(this.#setListItems())
    );
   }

   //Salvando no localstorage
  public getInputAndAddItem(value: IListItems){
    localStorage.setItem(ELocalStorage.MY_LIST, JSON.stringify([...this.#setListItems(), value]));

    return this.#setListItems.set(this.#parseItems());
  }

  public listItemsStage(value: 'pending' | 'completed'){
    return this.getListItems().filter((res: IListItems) => {
      if(value === 'pending'){
        return !res.checked;
      }

      if(value === 'completed'){
        return res.checked;
      }

      return res;
    })
  }

  public updateItemCheckbox(newItem: { id: string; checked: boolean }){
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter( res => {
        if(res.id === newItem.id){
          res.checked = newItem.checked;
          return res;
        }

        return res;
      });
      return oldValue;
    });

    return this.#updateLocalStorage()
  }

  public updateItemText(newItem: { id: string, value: string }){
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter( res => {
        if(res.id === newItem.id){
          res.value = newItem.value;
          return res;
        }

        return res;
      });

      return oldValue;
    });

    return this.#updateLocalStorage()
  }

  public deleteItem(id: string){
    Swal.fire({
  title: "Tem certeza?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#2fbf71",
  cancelButtonColor: "#c90025",
  confirmButtonText: "Sim, delete o item!"
}).then((result) => {
  if (result.isConfirmed) {
    this.#setListItems.update((oldValue: IListItems[]) => {
      return oldValue.filter((res) => res.id !== id);
    });

    return this.#updateLocalStorage()
    }
  });
}

  public deleteAllItems() {
  Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2fbf71",
      cancelButtonColor: "#c90025",
      confirmButtonText: "Sim, delete isso!"
  }).then((result) => {
  if (result.isConfirmed) {
      Swal.fire({
        title: "Deletado!",
        text: "Seus itens foram excluídos",
        icon: "success"
      });

      localStorage.removeItem(ELocalStorage.MY_LIST);
      return this.#setListItems.set(this.#parseItems());
    }
  });
  }
}
