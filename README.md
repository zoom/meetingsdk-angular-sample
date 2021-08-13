# Zoom Meeting SDK Sample Angular

Use of this sample app is subject to our [Terms of Use](https://zoom.us/docs/en-us/zoom_api_license_and_tou.html).

This repo is an [Angular](https://angular.io/) app generated via the [Angular CLI](https://cli.angular.io/) that uses the [Zoom Meeting SDK](https://marketplace.zoom.us/docs/sdk/native-sdks/web) to start and join Zoom meetings and webinars.

## Installation

To get started, clone the repo:

`$ git clone https://github.com/zoom/meetingsdk-sample-angular.git`

## Setup

1. Once cloned, navigate to the `meetingsdk-sample-angular` directory:

   `$ cd meetingsdk-sample-angular`

1. Then install the dependencies:

   `$ npm install`

1. Open the `meetingsdk-sample-angular` directory in your code editor.

1. Open the `src/app/app.component.ts` file, and enter values for the variables:

   | Variable                   | Description |
   | -----------------------|-------------|
   | signatureEndpoint          | Required, the endpoint url that returns a signature. [Get a signature endpoint here.](https://github.com/zoom/meetingsdk-sample-signature-node.js) |
   | apiKey                   | Required, your Zoom JWT App API Key. [You can get yours here](https://marketplace.zoom.us/develop/create). |
   | meetingNumber                   | The Zoom Meeting / webinar number. |
   | role                   | Required, 0 to join the meeting / webinar, 1 to start the meeting. |
   | leaveUrl                   | Required, the url the user is taken to once the meeting is over. |
   | userName                   | Required, A name for the user joining / starting the meeting / webinar. |
   | userEmail                   | Optional, the user joining / starting the meeting / webinar. |
   | passWord                   | Optional, meeting password. Leave as empty string if the meeting does not require a password. |

   Example:

   ```js
   signatureEndpoint = 'http://localhost:4000'
   apiKey = 'xu3asdfaJPaA_RJW2-9l5_HAaLA'
   meetingNumber = '123456789'
   role = 0
   leaveUrl = 'http://localhost:4200'
   userName = 'Angular'
   userEmail = ''
   password = ''
   ```

1. Save `app.component.ts`.

1. Run the app:

   `$ ng serve --open`

## Usage

1. Navigate to http://localhost:4200.

   ![Zoom Angular Meeting SDK](https://s3.amazonaws.com/user-content.stoplight.io/19808/1583789057929)

1. Click "Join Meeting" to join the meeting number specified in `src/app/app.component.ts`.

   ![Zoom Angular Meeting SDK](https://s3.amazonaws.com/user-content.stoplight.io/19808/1583789069218)

## Deployment

The Angular Sample App can be easily deployed to [GitHub Pages](#github-pages), or [another static web hosting service](#other-static-web-hosting), like an AWS S3 bucket.

### GitHub Pages

1. Create a repo on [GitHub](https://github.com).

1. Add the remote to your project:

   `$ git remote add origin GITHUB_URL/GITHUB_USERNAME/GITHUB_REPO_NAME.git`

1. Open the `angular.json` file and replace the value for `"baseHref"` with your GitHub repo name surrounded by slashes like this: `/GITHUB_REPO_NAME/`. Example: `"baseHref": "/GITHUB_REPO_NAME/"`

1. Build your project:

   `$ ng build --prod`

1. Git add, commit, and push your project:

   `$ git add -A`

   `$ git commit -m "deploying to github"`

   `$ git push origin master`

1. On GitHub, in your repo, navigate to the "settings" page, scroll down to the "GitHub Pages" section, and choose the "master branch /docs folder" for the source.

1. Now your project will be deployed to https://GITHUB_USERNAME.github.io/GITHUB_REPO_NAME.

### Other Static Web Hosting

1. Build your project:

   `$ ng build --prod`

1. Deploy the complied `/docs` directory to a static web hosting service, like an AWS S3 bucket.

### Advanced Deployment

For more advanced instructions on deployment, [see the Angular Deployment docs](https://angular.io/guide/deployment).

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us) or our [Developer Forum](https://devforum.zoom.us). Priority support is also available with [Premier Developer Support](https://zoom.us/docs/en-us/developer-support-plans.html) plans.
