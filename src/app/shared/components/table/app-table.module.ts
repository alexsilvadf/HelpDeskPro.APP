import { NgModule } from "@angular/core";
import { TableComponent } from "./table/table.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared.module";



@NgModule({
    declarations:[TableComponent],
    exports:[],
    imports:[CommonModule, SharedModule, FormsModule, ReactiveFormsModule ]
})
export class AppTableModule{}