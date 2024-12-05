import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { ZoomMtg } from '@zoom/meetingsdk';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: false
})
export class AppComponent implements OnInit {

  authEndpoint = ''
  sdkKey = ''
  meetingNumber = '123456789'
  passWord = ''
  role = 0
  userName = 'Angular'
  userEmail = ''
  registrantToken = ''
  zakToken = ''
  leaveUrl = 'http://localhost:4200'

  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document: any, private ngZone: NgZone) {

  }

  ngOnInit() {

  }

  getSignature() {
    this.httpClient.post(this.authEndpoint, {
	    meetingNumber: this.meetingNumber,
	    role: this.role
    }).subscribe((data: any) => {
      if(data.signature) {
        console.log(data.signature)
        this.startMeeting(data.signature)
      } else {
        console.log(data)
      }
    })
  }

  startMeeting(signature: any) {

    document.getElementById('zmmtg-root')!.style.display = 'block'

    this.ngZone.runOutsideAngular(() => {
      ZoomMtg.init({
        leaveUrl: this.leaveUrl,
        patchJsMedia: true,
        leaveOnPageUnload: true,
        success: (success: any) => {
          console.log(success)
          ZoomMtg.join({
            signature: signature,
            sdkKey: this.sdkKey,
            meetingNumber: this.meetingNumber,
            passWord: this.passWord,
            userName: this.userName,
            userEmail: this.userEmail,
            tk: this.registrantToken,
            zak: this.zakToken,
            success: (success: any) => {
              console.log(success)
            },
            error: (error: any) => {
              console.log(error)
            }
          })
        },
        error: (error: any) => {
          console.log(error)
        }
      })
    })
  }
}
