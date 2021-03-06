import { Injectable } from "@angular/core";
import { DATAHUB_FILES } from "./mock-files";
import { DataHubFile } from "./datahubfile";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { encode } from "punycode";
import { environment } from "src/environments/environment";
//import { toBase64String } from "@angular/compiler/src/output/source_map";

@Injectable({
  providedIn: "root",
})
export class FilemanagerService {
  private filesUrl = ""; //= "https://localhost:5001/api/Files/"; // URL to web api - file
  private dataUrl = ""; //"https://localhost:6001/data/"; //URL to web api - data

  constructor(private http: HttpClient) {
    this.filesUrl = environment.fileServiceUri;
    this.dataUrl = environment.dataServiceUri;
  }

  getFiles(path: string): Observable<DataHubFile[]> {
    let slash = btoa("/"); // toBase64String("/");
    path = path.replace(/\//g, slash);

    let fileInfo = /*return*/ this.http
      .get<DataHubFile[]>(this.filesUrl + path)
      .pipe(catchError(this.handleError<DataHubFile[]>("getFiles", [])));

    return fileInfo;
  }

  getExtendedAttributes(path: string): Observable<DataHubFile[]> {
    let slash = btoa("/"); // toBase64String("/");
    path = path.replace(/\//g, slash);

    let dataInfo = this.http
      .get<DataHubFile[]>(this.dataUrl + "1001/" + path)
      .pipe(catchError(this.handleError<DataHubFile[]>("getFiles", [])));

    return dataInfo;
  }

  uploadFile(formData: FormData): Observable<string> {
    let result = this.http
      .post<string>(this.filesUrl, formData)
      .pipe(catchError(this.handleError<string>("uploadFile")));

    return result;
  }

  addExtendedAttributes(dataHubFile: DataHubFile): Observable<string> {
    let result = this.http
      .post<string>(this.dataUrl, dataHubFile)
      .pipe(catchError(this.handleError<string>("addExtendedAttributes")));

    return result;
  }

  deleteFile(path: string): Observable<string> {
    let slash = btoa("/"); // toBase64String("/");
    path = path.replace(/\//g, slash);

    let result = this.http
      .delete<string>(this.filesUrl + path)
      .pipe(catchError(this.handleError<string>("deleteFile")));

    return result;
  }

  deleteExtendedAttributes(agencyID: number, path: string): Observable<string> {
    let slash = btoa("/"); // toBase64String("/");
    path = path.replace(/\//g, slash);

    let result = this.http
      .delete<string>(this.dataUrl + agencyID + "/" + path)
      .pipe(catchError(this.handleError<string>("deleteExtendedAttributes")));

    return result;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
