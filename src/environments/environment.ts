// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // dataServiceUri:
  //   "http://datahub-lb-442687968.us-east-1.elb.amazonaws.com/data/",
  // fileServiceUri:
  //   "http://datahub-lb-442687968.us-east-1.elb.amazonaws.com/api/files/",
  // dataServiceUri: "https://localhost:4001/data/",
  // fileServiceUri: "https://localhost:5001/api/Files/",
  dataServiceUri: "http://localhost:4000/data/",
  fileServiceUri: "http://localhost:5000/api/Files/",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
