import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from 'src/app/services/order/order.model';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from 'src/app/services/order/orders.service';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-ordershow',
  templateUrl: './ordershow.component.html',
  styleUrls: ['./ordershow.component.css']
})
export class OrdershowComponent implements OnInit {

  ELEMENT_DATA : Order[];
  displayedColumns: string[] = ['ID', 'CustomerName', 'CustomerAddress', 'CustomerEmail','CustomerMobile','Status','Action'];
  dataSource = new MatTableDataSource<Order>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  //PostCategory: any = [];
  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    public postCate : OrdersService,
  ) { }

  ngOnInit() {
    this.loadPosts();
    this.dataSource.paginator = this.paginator;
  }

  public loadPosts() {
    let productcate = this.postCate.getAllOrders();
    productcate.subscribe(postCateItem => this.dataSource.data = postCateItem as Order[]);
  }

  onDelete(id : number) {
    if (window.confirm('Are you sure, you want to delete?')){
      this.postCate.deleteOrderById(id).subscribe(data => {
        this.loadPosts()
      })
    }
  }

}
