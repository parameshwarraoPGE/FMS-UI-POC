import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileManagementService } from '../../../shared/service/file-management.service';
import { Batch } from '../../../shared/models/file.model';

@Component({
  selector: 'app-batch-detail',  
  templateUrl: './batch-detail.component.html',
  styleUrl: './batch-detail.component.scss'
})
export class BatchDetailComponent implements AfterViewInit {
  
  batchDetail:Batch = new Batch();

  constructor(private fileManagementService: FileManagementService, private router: Router, 
    private activatedRoute : ActivatedRoute, private renderer: Renderer2) {

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

}
