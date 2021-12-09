import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstKeyToConsole'
})
export class FirstKeyToConsolePipe implements PipeTransform {

  transform(object: any): any {
    if (object) {
      console.log('------ Imprime Chaes -------');
      for (let x in object) {
        console.log("Chave: ", x, ", Valor:", object[x]);
      }
    }
    return null;
  }

}
