import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtermedicamentos'
})
export class FiltermedicamentosPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    for(const post of value){
      if( post.medicamento.nombreComercial.indexOf(arg) > -1 
      || post.medicamento.nombreComercial.toLowerCase().indexOf(arg.toLowerCase())  > -1
    //  || post.fechaAdopcion.indexOf(arg) > -1 ){
      )
    {resultPosts.push(post);
      };
      
    };
    return resultPosts;
  }

}
