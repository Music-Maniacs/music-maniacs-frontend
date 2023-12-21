import { DirectUpload } from '@rails/activestorage';

export default class Uploader {
    file: File;
    progress = "0%";
    error: any = null;
    upload: DirectUpload;
    progressBar: HTMLProgressElement | undefined;
  
    constructor(file: File, url: string, progressBar?: HTMLProgressElement | undefined) {
      this.file = file;
      this.progressBar = progressBar;
      this.upload = new DirectUpload(file, url, this);
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
        if (this.progressBar) {
          const progress = (event.loaded / event.total) * 100;
          this.progressBar.value = progress;
        }
    }
}
