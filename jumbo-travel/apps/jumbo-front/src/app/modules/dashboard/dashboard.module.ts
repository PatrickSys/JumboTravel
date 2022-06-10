import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistantComponent } from './components/assistant/assistant.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RestockerComponent } from './components/restocker/restocker.component';

@NgModule({
  declarations: [AssistantComponent, RestockerComponent],
  imports: [
    CommonModule,
    MatTableModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
})
export class DashboardModule {}
