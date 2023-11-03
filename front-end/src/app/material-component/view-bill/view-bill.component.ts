import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BillService } from 'src/app/services/bill.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ViewBillProductsComponent } from '../dialog/view-bill-products/view-bill-products.component';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { saveAs } from 'file-saver';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateFormatPipe } from '../date-format.pipe';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss'],
})
export class ViewBillComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'email',
    'mobile',
    'paymentMethod',
    'total',
    'creationDate',
    'view',
  ];
  dataSource: any = [];
  responseMessage: any;
  dateRange: any = FormGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(
    private billService: BillService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
    this.dateRange = this.fb.group({
      start: [null, Validators.required],
      end: [null, Validators.required],
    });
  }

  tableData() {
    this.billService.getBills().subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator 
        
      },
      (error: any) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleViewAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data: values,
    };
    dialogConfig.width = '100%';
    const dialogRef = this.dialog.open(ViewBillProductsComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
  }

  downloadReportAction(values: any) {
    this.ngxService.start();
    var data = {
      name: values.name,
      email: values.email,
      uuid: values.uuid,
      mobile: values.mobile,
      paymentMethod: values.paymentMethod,
      totalAmount: values.paymentMethod,
      productDetails: values.productDetails,
    };
    this.billService.getPdf(data).subscribe((response) => {
      saveAs(response, values.uuid + '.pdf');
      this.ngxService.stop();
    });
  }

  handleDeleteAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete ' + values.name + ' bill',
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe(
      (response) => {
        this.ngxService.start();
        this.deleteProduct(values.id);
        dialogRef.close();
      }
    );
  }

  deleteProduct(id: any) {
    this.billService.delete(id).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.tableData();
        this.responseMessage = response?.message;
        this.snackbarService.openSnackBar(this.responseMessage, 'Success');
      },
      (error: any) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }

  validate() {
    if (
      this.dateRange.controls.start.value === null ||
      this.dateRange.controls.end.value === null
    )
      return true;
    else return false;
  }


  onSubmit() {
   this.tableData();
    const start = new Date(this.dateRange.controls.start.value);
    const end = new Date(this.dateRange.controls.end.value);
    const datePipe = new DatePipe('en-US');
    const startString = datePipe.transform(start, 'yyyy-MM-dd');
    const endString = datePipe.transform(end, 'yyyy-MM-dd');
    
    if (this.dataSource instanceof MatTableDataSource) {
      // Get the data array from the MatTableDataSource
      const dataArray = this.dataSource.data;
  
      // Map the data array to format the creationDate of each object
      dataArray.forEach(item => {
        item.creationDate = datePipe.transform(item.creationDate, 'yyyy-MM-dd');
        
      });
  
      // Filter the data array based on the selected date range
      const filteredDataArray = dataArray.filter(item => {
        return item.creationDate >= startString && item.creationDate <= endString;
      });
      
      // Update the data source with the filtered data array
      this.dataSource.data = filteredDataArray;
     
    }
    this.dateRange.reset();
    console.table(this.dataSource);
    this.cd.detectChanges();
  }
  
}
