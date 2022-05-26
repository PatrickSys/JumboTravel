import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from './components/loading/loading.component';
import { globalsFactory } from "./globals/globals-factory";
import { environment } from "../../environments/environment";

@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    LoadingComponent
  ],
  providers: [{
    provide: environment.globals,
    useFactory: () => ({
      globals: globalsFactory()
    }),
  }]
})
export class SharedModule { }

