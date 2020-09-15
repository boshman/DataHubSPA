//import { Component } from "@angular/core";
// import { AmplifyService } from "aws-amplify-angular";
import { Component, ChangeDetectorRef } from "@angular/core";
import {
  onAuthUIStateChange,
  CognitoUserInterface,
  AuthState,
} from "@aws-amplify/ui-components";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "DataHubSPA";
  // authenticated = null;
  // user = null;

  // constructor(public amplify: AmplifyService) {
  //   // handle auth state changes
  //   this.amplify.authStateChange$.subscribe((authState) => {
  //     this.authenticated = authState.state === "signedIn";
  //     if (!authState.user) {
  //       this.user = null;
  //     } else {
  //       this.user = authState.user;
  //     }
  //   });
  // }

  user: CognitoUserInterface | undefined;
  authState: AuthState;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
    });
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
