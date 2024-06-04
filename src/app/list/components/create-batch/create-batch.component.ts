import { AfterViewInit, Component } from '@angular/core';
import { FileManagementService } from '../../../shared/service/file-management.service';
import { Batch } from '../../../shared/models/file.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-batch',
  templateUrl: './create-batch.component.html',
  styleUrl: './create-batch.component.scss'
})
export class CreateBatchComponent implements AfterViewInit {
  batchName: string = "";
  batchId: string = "";
  uploadedFiles: Array<string> = [];
  pageTitle = "Create Batch!"

  constructor(
    private fileManagementService: FileManagementService,
    private activatedRoute: ActivatedRoute,
  ) {

  }
  ngAfterViewInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params && params['batchId']) {
        this.batchId = params['batchId'];
        this.pageTitle = "Add Files To Batch!"
        this.getUploadedBatchFiles();
      }
    });
  }

 
  public create() {
    if (this.batchName) {
      this.fileManagementService.createBatch(this.batchName).subscribe({
        next: (data) => {

          const batchCreate = data as unknown as Batch;
          let { batchId } = batchCreate;
          this.batchId = batchId;
        },
        error: (err) => {
          //get updated list from firebase storage
          this.getUploadedBatchFiles();
        }
      });
    }

  }

  //file upload

  public onFileSubmit($event: any) {
    let { target: { files } } = $event;
    let valid_files: Array<File> = files;
    this.sendFilesToGCPStorage(valid_files);
  }

  public onFileDragAndDrop(filesList: Array<File>) {
    this.sendFilesToGCPStorage(filesList);
  }

  public sendFilesToGCPStorage(files: Array<File>) {
    if (this.batchId) {

      this.fileManagementService.uploadFiles(this.batchId, files).subscribe({
        next: (data) => {

          //get updated list from firebase storage
          this.getUploadedBatchFiles();
        },
        error: (err) => {
          //get updated list from firebase storage
          this.getUploadedBatchFiles();
        }
      });
    }
  }

  public getUploadedBatchFiles() {
    if (this.batchId) {
      this.fileManagementService.getBatchDetail(this.batchId).subscribe({
        next: (data) => {

          const batchCreate = data as unknown as Batch;
          let { fileList,batchName } = batchCreate;
          this.batchName = batchName;          
          this.uploadedFiles = fileList.map(file => file.fileName);          
        },
        error: (err) => {

        }
      }
      );
    }

  }

}
