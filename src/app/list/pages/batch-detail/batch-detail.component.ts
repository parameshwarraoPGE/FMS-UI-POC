import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileManagementService } from '../../../shared/service/file-management.service';
import { Batch, FileObject } from '../../../shared/models/file.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-batch-detail',  
  templateUrl: './batch-detail.component.html',
  styleUrl: './batch-detail.component.scss'
})
export class BatchDetailComponent implements AfterViewInit {
  
  batchDetail:Batch = new Batch();
  selectedFile:FileObject = new FileObject();

  constructor(
    private fileManagementService: FileManagementService, 
    private router: Router, 
    private activatedRoute : ActivatedRoute,
    private location: Location, 
    private renderer: Renderer2) {

    }
  ngAfterViewInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    if(id){
      this.getBatchDetails(id);
    }
  }

  public getBatchDetails(batchId:string){
    this.fileManagementService.getBatchDetail(batchId).subscribe({
      next: (data) => {
       this.batchDetail = data as unknown as Batch;                
      },
      error: (err) => {
      }
    }
    );

  }

  public goBack(){
    this.location.back();
  }


  public createNewBatch(){
    this.router.navigate(['../createBatch'],{relativeTo: this.activatedRoute });
  
  }

  public getFileClass(fileObj:FileObject){
    if( fileObj== this.selectedFile) {
      return "active";
    }
    return "";
  }

  public onFileSelect(fileObj:FileObject){
    this.selectedFile = fileObj;
  }

}
