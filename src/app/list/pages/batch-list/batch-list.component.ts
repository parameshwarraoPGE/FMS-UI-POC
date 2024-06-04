import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Batch, BatchListResponse, BatchListRequest } from '../../../shared/models/file.model';
import { FileManagementService } from '../../../shared/service/file-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, debounceTime, fromEvent } from 'rxjs';


@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.scss']
})
export class BatchListComponent implements OnInit, AfterViewInit, OnDestroy {

  public batchListRequest: BatchListRequest = new BatchListRequest();
  public batchListResponse: BatchListResponse = new BatchListResponse();
  public totalCount: number = 0;

  public totalPages: number[] = [];
  public currentPage: number = 1;
  public pageSize: number = 15;
  public pageIndex: number = 0;

  public PageSizeValues: number[] = [10, 15, 30, 50, 100];
  public errorMessage: string[] = ["No Records Found!", "Error Connecting Server!"];
  public errorText: string = "";
  public isError: boolean = false;

  public searchByBatchName: string = "";
  public searchByCreatedBy: string = "";

  public deleteMessageInfo:string = "";

  public batchToDeleteId:string = "";
  public batchNameTobeDeleted:string = "";

  

  public searchTextSub: Subscription = new Subscription();

  @ViewChild('batchNameSearchText', { static: false }) batchNameTextRef: ElementRef = {} as ElementRef;

  @ViewChild('batchCreatedBySearch', { static: false }) createdByTextref: ElementRef = {} as ElementRef;

  @ViewChild('deleteBatchModal', { static: false }) deleteBatchModalRef: ElementRef<any> = {} as ElementRef;

  constructor(private fileManagementService: FileManagementService, private router: Router, 
    private activatedRoute : ActivatedRoute, private renderer: Renderer2) { }
  ngOnDestroy(): void {
    if (this.searchTextSub) {
      this.searchTextSub.unsubscribe();
    }
  }
  ngAfterViewInit(): void {
    this.getBatchList();    
    this.subscribeToSearchTextEvents();
  }

  subscribeToSearchTextEvents() {
    this.searchTextSub = fromEvent(this.batchNameTextRef.nativeElement, 'keyup').pipe(debounceTime(1200)).subscribe((element) => {
      if (element) {
        this.batchListRequest.batchName = <string>(element as any).target.value;
        this.getBatchList();
      }
    });

    this.searchTextSub.add(
      fromEvent(this.createdByTextref.nativeElement, 'keyup').pipe(debounceTime(1200)).subscribe((element) => {
        if (element) {
          this.batchListRequest.createdBy = <string>(element as any).target.value;
          this.getBatchList();
        }
      })
    );
    
  }

  public clearSearch() {    
    this.searchByBatchName = "";
    this.searchByCreatedBy = "";   

    this.batchListRequest = new BatchListRequest();
    this.pageSize = this.batchListRequest.recordPerPage;
    this.getBatchList(true);
  }

  getBatchList(resetPagination: boolean = true) {
    this.isError = false;

    this.batchListRequest.recordPerPage = this.pageSize;

    if (resetPagination) {
      this.pageIndex = 0;
      this.currentPage = 1;
      this.batchListRequest.pageIndex = 0;
    }
    else {
      this.pageIndex = this.currentPage - 1;
      this.batchListRequest.pageIndex = this.pageIndex < 0 ? 0 : this.pageIndex;
    }






    this.fileManagementService.getBatchList(this.batchListRequest).subscribe({
      next: (data) => {
        this.batchListResponse = data;
        if (this.batchListResponse.batchFileData.length == 0) {
          this.isError = true;
          this.errorText = this.errorMessage[0];
          this.updatePagination(0);
        }
        else {
          this.totalCount = this.batchListResponse.totalCount[0].count;
          this.updatePagination(this.totalCount);

        }

      },
      error: (err) => {
        this.isError = true;
        this.errorText = this.errorMessage[1];
      }
    });
  }

  ngOnInit(): void {

  }

  //To split the records according to the pageSize and the totalCount of list records
  updatePagination(totalRecords: number = 0) {
    let totalPagesCount: number = 0;
    if (totalRecords == 0) {
      this.totalPages = [];
      this.currentPage = 1;
    }
    else {
      totalPagesCount = Math.ceil(
        totalRecords / this.pageSize
      );

      let pages: number[] = [];
      for (let i = 1; i <= totalPagesCount; i++) {
        pages.push(i);
      }
      this.totalPages = pages.map(page => page);

    }

  }

  pageForwardButton() {
    this.currentPage = this.currentPage + 1;
    this.getBatchList(false);

  }
  pageBackwardButton() {
    this.currentPage = this.currentPage - 1;
    this.getBatchList(false);

  }
  updatePage($event: number) {
    this.currentPage = $event;
    this.getBatchList(false);
  }

  updatePageSize($event: number) {
    this.pageSize = $event;
    this.getBatchList(false);
  }

  disableForwardButton() {

    if (this.currentPage == this.totalPages.length) {
      return true;
    }
    return false;
  }

  redirectToDetailPage(employee: Batch) {
    this.router.navigate(['/Listdetail'], { queryParams: { id: employee._id } });
  }



  public onBatchStatus(status: string) {
    this.batchListRequest.batchStatus = status;
    this.getBatchList();
  }
  public createBatch(){
    this.router.navigate(['../createBatch'],{relativeTo: this.activatedRoute });
  }
  public batchDetail(id:string){
    this.router.navigate(['../',id],{relativeTo: this.activatedRoute });
  }

  deleteBatch(batchId:string,batchName:string="") {
    this.batchToDeleteId = batchId;
    this.batchNameTobeDeleted = batchName;
    this.showDeleteModal();
  }

  showDeleteModal() {
    this.renderer.setStyle(this.deleteBatchModalRef.nativeElement,'display','block');
    this.renderer.addClass(this.deleteBatchModalRef.nativeElement,'show');
  }
  closeDeleteModal() {
    this.renderer.setStyle(this.deleteBatchModalRef.nativeElement,'display','none');
    this.renderer.removeClass(this.deleteBatchModalRef.nativeElement,'show');
  }

  confirmBatchModalClose(deleteStatus: boolean) {

    if (deleteStatus) {
      this.fileManagementService.deleteBatch(this.batchToDeleteId).subscribe({
        next: (data) => {
          this.closeDeleteModal();
          this.deleteMessageInfo = `Batch ${this.batchNameTobeDeleted} Has been deleted and Files have been removed from server!`;
          this.getBatchList();
          this.batchToDeleteId = "";
          this.batchNameTobeDeleted = "";
          
        },
        error: () => {
          this.closeDeleteModal();
          this.deleteMessageInfo = "Error Deleting Record , server Error";
          this.getBatchList();
        }
      });
    } else {
    this.batchToDeleteId = "";
    this.batchNameTobeDeleted = "";
      this.closeDeleteModal();
    }

  }

  public modifyBatch(id:string){
    this.router.navigate(['../createBatch'],{relativeTo: this.activatedRoute, queryParams:{batchId:id} });
  }




}
