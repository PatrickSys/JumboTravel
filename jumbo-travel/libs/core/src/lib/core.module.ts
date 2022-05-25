import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './core/shared/components/loading/loading.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SharedModule } from './core/shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [],
  exports: [

  ]
})
export class CoreModule {}
