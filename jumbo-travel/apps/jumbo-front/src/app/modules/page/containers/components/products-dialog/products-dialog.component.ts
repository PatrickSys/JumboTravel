import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PlaneProductInterface } from '@jumbo/core';


@Component({
  selector: 'jumbo-travel-products-dialog',
  templateUrl: './products-dialog.component.html',
  styleUrls: ['./products-dialog.component.scss'],
})
export class ProductsDialogComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'orderQuantity', 'pricePerUnit', 'totalPrice'];
  constructor(public dialogRef: MatDialogRef<ProductsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public products: PlaneProductInterface[]) {}

  ngOnInit(): void {
  }
}
