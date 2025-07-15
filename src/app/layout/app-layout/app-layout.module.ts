import { NgModule } from "@angular/core";
import { AppLayoutComponent } from "./app-layout.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";

@NgModule({
  declarations: [AppLayoutComponent],
  exports: [],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [],
})
export class AppLayoutModule {}