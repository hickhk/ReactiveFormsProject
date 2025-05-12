import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCpf',
})
export class FormatCpfPipe implements PipeTransform {
  transform(cpf: number, hideNumbers: boolean = false): any {
    let formattedCpf = cpf
      .toString()
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    if (hideNumbers) {
      formattedCpf = 'XXX.' + formattedCpf.substring(4, 11) + '-XX';
    }

    return formattedCpf;
  }
}
