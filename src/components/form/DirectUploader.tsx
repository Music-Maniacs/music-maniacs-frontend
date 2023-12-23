import { DirectUpload } from '@rails/activestorage';

export default class DirectUploader {
    file: File;
    progress = "0%";
    error: any = null;
    upload: DirectUpload;
    onProgress: Function | undefined;
  
    constructor(file: File, url: string, onProgress?: (event: ProgressEvent<XMLHttpRequest>) => void) {
      this.file = file;
      this.upload = new DirectUpload(file, url, this);
      this.onProgress = onProgress;
    }
  
    async start(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
          this.upload.create((error, blob) => {
            if (error) {
              reject(error);
            } else {
              resolve(blob.signed_id);
            }
          });
        });
      }
  
    directUploadWillStoreFileWithXHR(request: any) {
      request.upload.addEventListener('progress', (event: any) => this.directUploadDidProgress(event))
    }
  
    directUploadDidProgress(event: any) {
      if (this.onProgress) {
        this.onProgress(event)
      }
    }
}
