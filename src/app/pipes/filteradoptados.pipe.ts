import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filteradoptados'
})
export class FilteradoptadosPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    for(const post of value){
      if( post.adoptante.persona.nombre.indexOf(arg) > -1 
      || post.adoptante.persona.nombre.toLowerCase().indexOf(arg.toLowerCase())  > -1
      || post.fechaAdopcion.indexOf(arg) > -1 ){
         resultPosts.push(post);
      };
      
    };
    return resultPosts;
  }

  


}
