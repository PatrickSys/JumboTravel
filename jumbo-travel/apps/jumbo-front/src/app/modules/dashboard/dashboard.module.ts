import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistantComponent } from './components/assistant/assistant.component';
import { MatTableModule } from "@angular/material/table";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [AssistantComponent],
  imports: [CommonModule, MatTableModule,
    ReactiveFormsModule, MatButtonModule, MatIconModule]
})
export class DashboardModule {}
