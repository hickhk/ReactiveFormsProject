import { NgModule } from "@angular/core";
import { MaritalStatusPipe } from './marital-status.pipe';
import { FormatCpfPipe } from './format-cpf.pipe';
import { PhoneMaskPipe } from './phone-mask.pipe';
import { PhonePlaceholderPipe } from './phone-placeholder.pipe';

@NgModule({
    declarations: [
    MaritalStatusPipe,
      FormatCpfPipe,
      PhoneMaskPipe,
      PhonePlaceholderPipe
   ],
    exports: [
      MaritalStatusPipe,
      FormatCpfPipe,
      PhoneMaskPipe,
      PhonePlaceholderPipe
    ],
})
export class PipesModule {}
