import { Component } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { User } from './core/model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cartzilla';

  user: User = new User();
  _isLoggedIn: boolean = false;

  myVar: any;
  idle: any;


  constructor(
    public _authService: AuthService,
  ) {

  }

  ngOnInit(): void {

    this._isLoggedIn = this._authService.checkLogin();
    if (this._isLoggedIn) {
      this.user = this._authService.getUser();
      // this.user.username ? null : this.loadUserDetails();

      this.loadUserDetails();
      this.loadContactDetails();
    }

    this._authService.loginStatusChanged.subscribe(
      (IsLoggedIn) => {
        // console.log("testing");
        // this._logService.logMessage('on init loginStatusChanged: ' + IsLoggedIn);

        this._isLoggedIn = IsLoggedIn;
        clearTimeout(this.myVar);



        // this.isLoggedIn = this._authService.isLoggedIn();
        if (this._isLoggedIn) {
          this.loadUserDetails();
          this.loadContactDetails();
        }
        else {
          clearTimeout(this.myVar);

          this.idle ? this.idle.stop() : null;
        }
      }
    );

  }


  private async loadUserDetails() {
    console.log("loadUserDetails");
    // const msg = new Message();
    try {

      let res: any = await this._authService.userInfo();

      console.log("res:", res);

      // if (res && res.Status) {
      if (res) {
        // let obj = res && res.Result && res.Result.Data ? res.Result.Data : null;
        // let obj = res && res.success ? res.success : null;
        let obj = res ? res : null;

        let user: User = new User();

        // user.username = obj && obj.username ? obj.username || null : null;
        user.username = obj && obj.login ? obj.login || null : null;
        user.useremail = obj && obj.useremail ? obj.useremail || null : null;
        user.userdisplayname = obj && obj.userdisplayname ? obj.userdisplayname || null : null;
        // user.mobile = obj && obj.mobile ? obj.mobile || null : null;
        user.loginType = obj && obj.loginType ? obj.loginType || null : null;
        user.userType = obj && obj.userType ? obj.userType || null : null;

        this._authService.storeUser(user);

      }

    } catch (error) {
      console.log("error:", error);
    }
  }

  private async loadContactDetails() {
    console.log("loadContactDetails");
    // const msg = new Message();
    try {

      let res: any = await this._authService.contactInfo();

      console.log("res:", res);

      // if (res && res.Status) {
      if (res) {
        let obj = res && res.length > 0 ? res[0] : null;
        let socId = res && res.length > 0 ? res[0].socid : null;

        localStorage.setItem("socId", socId);
        this._authService.storeObj("contactDetail", obj);
      }

    } catch (error) {
      console.log("error:", error);
    }
  }
}
