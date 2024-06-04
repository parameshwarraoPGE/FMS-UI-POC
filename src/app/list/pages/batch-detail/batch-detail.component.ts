import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileManagementService } from '../../../shared/service/file-management.service';
import { Batch, FileBase64Reponse, FileDownloadURL, FileObject } from '../../../shared/models/file.model';
import { Location } from '@angular/common';

declare const PDFObject: any;

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

  public async downloadSelectedFile(){
    if(this.selectedFile){
      this.fileManagementService.singleFileDownload(this.batchDetail.batchId,this.selectedFile.fileName).subscribe({
        next: (data) => {
          let blob = new Blob([data.body], { type: 'application/octet-stream' });       
         

          var downloadURL = window.URL.createObjectURL(blob);
          var link = document.createElement('a');
          link.setAttribute('style', 'display:none;');
          document.body.appendChild(link);
          link.href = downloadURL;
          link.download = `${this.selectedFile.fileName}`;
          link.target = '_blank';
          link.click();
          document.body.removeChild(link);        
        },
        error: (err) => {
          
        }
      });
    }
  }

  public displayPdf(){
    if(this.selectedFile.fileName && this.batchDetail.batchId){
      this.fileManagementService.getFileBase64String(this.batchDetail.batchId,this.selectedFile.fileName).subscribe({
        next: (data:FileBase64Reponse) => {
                const { convertedBase64String } = data;
                if(convertedBase64String){
                  this.handleRenderPdf(convertedBase64String);
                }
        },
        error: (err) => {
          
        }
      });

    }
  }

  public displayPdfUsingFileUrl(){
    if(this.selectedFile.fileName && this.batchDetail.batchId){
      this.fileManagementService.getFileBucketDownloadUrl(this.batchDetail.batchId,this.selectedFile.fileName).subscribe({
        next: (data:FileDownloadURL) => {
                const { bucketPdfUrl } = data;
                if(bucketPdfUrl){
                  this.handleRenderPdf(bucketPdfUrl);
                }
        },
        error: (err) => {
          
        }
      });

    }
  }



  handleRenderPdf(data:string) {
    

  /**needs to be same orign if pdf js needs to be used, currently disconnected! */
    const pdfObject = PDFObject.embed(data, '#pdfContainer');
  }

}
