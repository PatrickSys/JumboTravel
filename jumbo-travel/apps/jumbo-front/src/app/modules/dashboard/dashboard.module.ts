import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistantComponent } from './assistant/assistant.component';
import { MatTableModule } from "@angular/material/table";

@NgModule({
  declarations: [AssistantComponent],
  imports: [CommonModule, MatTableModule]
})
export class DashboardModule {}
