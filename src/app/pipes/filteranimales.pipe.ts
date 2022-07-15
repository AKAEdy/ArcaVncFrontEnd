import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filteranimales'
})
export class FilteranimalesPipe implements PipeTransform {
  
  transform(value: any, arg: any): any {
  const resultPosts = [];
  for(const animale of value){
    if( animale.nombre.indexOf(arg) > -1 
    || animale.nombre.toLowerCase().indexOf(arg.toLowerCase())  > -1
  //  || post.fechaAdopcion.indexOf(arg) > -1 ){
    )
  {resultPosts.push(animale);
    };
    
  };
  return resultPosts;
}}