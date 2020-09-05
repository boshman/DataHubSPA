import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FilemanagerService } from "../filemanager.service";
import { DataHubFile } from "../datahubfile";
import { DATAHUB_FILES } from "../mock-files";
import { Data } from "@angular/router";

@Component({
  selector: "app-filemanager",
  templateUrl: "./filemanager.component.html",
  styleUrls: ["./filemanager.component.css"],
})
export class FilemanagerComponent implements OnInit {
  fileList: DataHubFile[];
  extendedAttributeList: DataHubFile[];
  path: string;
  svcResult: string;
  selectedFile: string;
  hoveredFile: string;
  selectedFiles: string[] = [];

  constructor(
    private cdRef: ChangeDetectorRef,
    private fileManagerSvc: FilemanagerService
  ) {}

  ngOnInit(): void {
    this.path = "1001/";
    this.getFiles(this.path);
  }

  getFiles(selPath: string): void {
    console.log("selected path = " + this.path);

    this.fileManagerSvc.getExtendedAttributes(selPath).subscribe((files) => {
      this.extendedAttributeList = files;

      this.fileManagerSvc.getFiles(selPath).subscribe((files) => {
        this.fileList = files;

        for (var i = 0; i < this.fileList.length; i++) {
          let file = this.fileList[i];
          var extendedAttribute = this.extendedAttributeList.find(
            (ea) => ea.path == file.path
          );
          if (extendedAttribute != undefined) {
            file.agencyID = extendedAttribute.agencyID;
            //file.displayName = extendedAttribute.displayName;
            file.published = extendedAttribute.published;
            file.uploadedBy = extendedAttribute.uploadedBy;
            file.uploadedDate = extendedAttribute.uploadedDate;
          }
        }

        this.cdRef.detectChanges();
      });
    });

    this.selectedFile = "";
  }

  clear(): void {
    this.fileList = null;
    this.selectedFile = "";
  }

  selectBreadcrumb(index): void {
    //alert("selected index = " + index.toString());
    //debugger;
    let parts = this.path.split("/");
    let selPath = "";
    for (var i = 0; i <= index; i++) {
      selPath += parts[i] + "/";
    }
    this.path = selPath;
    this.getFiles(selPath);
  }

  selectFolder(file: DataHubFile): void {
    this.path = file.path;
    this.getFiles(file.path);
  }

  toggleSelectedFile(filePath: string): void {
    this.selectedFile = this.selectedFile == filePath ? "" : filePath;
    if (this.selectedFile != "") {
      this.selectedFiles.push(this.selectedFile);
    } else {
      const index: number = this.selectedFiles.indexOf(this.selectedFile);
      if (index !== -1) this.selectedFiles.splice(index, 1);
    }
  }

  public highlightRow(file: DataHubFile) {
    this.hoveredFile = file.path;
  }

  upload(files): void {
    if (files.length === 0) return;

    const formData = new FormData();

    for (let f of files) {
      formData.append(f.name, f);
      formData.append("path", this.path + f.name);
    }

    this.fileManagerSvc.uploadFile(formData).subscribe((r) => {
      this.svcResult = r;

      let datahubfile: DataHubFile = {
        agencyID: 1001,
        path: this.path + files[0].name,
        uploadedBy: "boshman",
        uploadedDate: null,
        published: false,
        objectType: "FILE",
        displayName: "",
      };

      this.fileManagerSvc.addExtendedAttributes(datahubfile).subscribe((r) => {
        this.svcResult = r;

        this.getFiles(this.path);
      });
    });
  }

  deleteFile(): void {
    this.fileManagerSvc.deleteFile(this.selectedFile).subscribe((r) => {
      this.svcResult = r;

      this.fileManagerSvc
        .deleteExtendedAttributes(1001, this.selectedFile)
        .subscribe((r) => {
          this.svcResult = r;

          this.selectedFile = "";
          this.getFiles(this.path);
        });
    });
  }

  isFileSelected() {
    return this.selectedFile != "" && this.selectedFile != null;
  }
}
