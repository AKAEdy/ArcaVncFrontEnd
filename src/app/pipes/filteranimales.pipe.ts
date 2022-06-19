import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filteranimales'
})
export class FilteranimalesPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    for(const post of value){
      if( post.animal.nombre.indexOf(arg) > -1 
      || post.animal.nombre.toLowerCase().indexOf(arg.toLowerCase())  > -1
    //  || post.fechaAdopcion.indexOf(arg) > -1 ){
      )
    {resultPosts.push(post);
      };
      
    };
    return resultPosts;
  }
}