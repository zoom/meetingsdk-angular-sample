import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import ZoomMtgEmbedded from '@zoomus/websdk/embedded';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // setup your Meeting SDK auth endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
  authEndpoint = ''
  // This sample app has been updated to use Meeting SDK credentials https://marketplace.zoom.us/docs/guides/build/sdk-app
  sdkKey = ''
  meetingNumber = '123456789'
  passWord = ''
  role = 0
  userName = 'Angular'
  userEmail = ''
  // pass in the registrant's token if your meeting or webinar requires registration. More info here:
  // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/component-view/meetings#join-registered
  // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/component-view/webinars#join-registered
  registrantToken = ''
  zakToken = ''

  client = ZoomMtgEmbedded.createClient();

  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document) {

  }

  ngOnInit() {
    let meetingSDKElement = document.getElementById('meetingSDKElement');

    this.client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: 'en-US',
      customize: {
        meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
        toolbar: {
          buttons: [
            {
              text: 'Custom Button',
              className: 'CustomButton',
              onClick: () => {
                console.log('custom button');
              }
            }
          ]
        }
      }
    });
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

  startMeeting(signature) {

    this.client.join({
      signature: signature,
    	sdkKey: this.sdkKey,
    	meetingNumber: this.meetingNumber,
    	password: this.passWord,
    	userName: this.userName,
      userEmail: this.userEmail,
      tk: this.registrantToken,
      zak: this.zakToken
    })
  }
}
