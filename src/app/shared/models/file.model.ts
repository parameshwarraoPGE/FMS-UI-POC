

export class BatchListRequest {
  batchName: string = "";
  batchStatus: string = "";
  createdBy: string = "";  
  pageIndex: number = 0;
  recordPerPage: number = 15;

}


export class BatchListResponse {
  batchFileData: Batch[] = [];
  totalCount: TotalCount[] = [];
}

export class Batch {
  _id: string = "";
  batchName: string = "";
  batchId: string = "";
  createdBy: string = "";
  batchStatus: string = ""  
  fileList: Array<FileObject> = [];  
}

export class FileObject{
  fileName: string = "";
  isTextExtractScanned: boolean = false;
  fileStatus: Array<FileScannedData> = [];
}

export class FileScannedData{
  pageNumber: number = 0;
  dataExtracted: Array<FilePageData> = [];
}

export class FilePageData {
  feildName: string = "";
  feildKey: string = "";
  feildValue: string = "";
  inputType: string = "";
  inputOptions: Array<SelectInputOptions> = [];
}

export class SelectInputOptions{
  feildName: string ="";
  feildValue: string = "";
}


export class detailResponse extends Batch {
  constructor() {
    super();
  }
}

export class TotalCount {
  _id: any;
  count: number = 0;
}

export class FileBase64Reponse{
  convertedBase64String:string ="";
}




