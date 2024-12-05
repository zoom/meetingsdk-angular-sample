import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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

  client = ZoomMtgEmbedded.createClient();

  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document: any, private ngZone: NgZone) {

  }

  ngOnInit() {
    
  }

  getSignature() {
    this.httpClient.post(this.authEndpoint, {
	    meetingNumber: this.meetingNumber,
	    role: this.role
    }).toPromise().then((data: any) => {
      if(data.signature) {
        console.log(data.signature)
        this.startMeeting(data.signature)
      } else {
        console.log(data)
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  startMeeting(signature: any) {

    let meetingSDKElement = document.getElementById('meetingSDKElement')!;

    this.ngZone.runOutsideAngular(() => {
      this.client.init({zoomAppRoot: meetingSDKElement, language: 'en-US', patchJsMedia: true, leaveOnPageUnload: true}).then(() => {
        this.client.join({
          signature: signature,
          sdkKey: this.sdkKey,
          meetingNumber: this.meetingNumber,
          password: this.passWord,
          userName: this.userName,
          userEmail: this.userEmail,
          tk: this.registrantToken,
          zak: this.zakToken
        }).then(() => {
          console.log('joined successfully')
        }).catch((error) => {
          console.log(error)
        })
      }).catch((error) => {
        console.log(error)
      })
    })
  }
}
