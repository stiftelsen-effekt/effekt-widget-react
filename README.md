# Effect Foundation Donation Widget

The Effect Foundation Donation Widget is the payment user interface for donations via gieffektivt.no, the app stored in a Google Cloud Storage bucket and is embedded into the website using an iframe. The widget is created with React and is written in TypeScript.

---

**Table of contents**

* [Get started developing](#get-started-developing)
  * [Cloning the repository and downloading software](#cloning-the-repository-and-downloading-software)
  * [Installing packages and running the project](#installing-packages-and-running-the-project)
  * [Connecting to the API](#connecting-to-the-api)
  * [Testing](#testing)
* [Build and deployment](#build-and-deployment)
  * [Google cloud build](#google-cloud-build)
  * [Environments](#environments)
* [Code structure (TBD)](#code-structure)
* [Payment processing (TBD)](#payment-processing)
  * [Bank](#bank)
  * [Vipps](#vipps)
  * [PayPal](#paypal)

---

## Get started developing

To run the Widget locally and start developing, follow the steps below.

### Cloning the repository and downloading software
Before proceeding, make sure [https://git-scm.com/downloads](Git), [https://nodejs.org/en/download/](Node.js) and [https://www.npmjs.com/](npm) is installed on your machine.

Finally, we are ready to start the application. Clone this repository to your local machine.

```
git clone https://github.com/stiftelsen-effekt/effekt-widget-react.git
```

> **Note** To clone the repository, you must have access and be part of the [Stiftelsen Effekt github organization](https://github.com/stiftelsen-effekt). You must also be logged in on git on your local machine. If you do not have access to clone the repository, enquire on our [tech](https://effektteam.slack.com/archives/G011BE3BG3H) channel.

### Installing packages and running the project

After cloning the repository, install the requisite packages with the command 

```
npm install
```

in the root folder of the cloned repository. After the installer has finished, you are ready to run the application with the command

```
npm start
```

This will start an instance of the application running on localhost:3000 as long as the port is not occupied by another running instance.

### Connecting to the API

The Widget is configured to use [https://dev.data.gieffektivt.no](https://dev.data.gieffektivt.no) for all requests by default. To use the stage or production API instead, you need to define the environment variable `REACT_APP_EFFEKT_API_URL` with the api url as its value, e.g. [https://stage.data.gieffektivt.no](https://stage.data.gieffektivt.no).

Code editors and IDEs need to be restarted after changing environment variables for the changes to take place.

### Testing

We use Cypress for end-to-end testing. For the test suite to run correctly, the widget needs to be running on localhost:3000. To run the test suite, use the command

```
npm run cypress
```

Cypress automatically installs itself the first time you run the test suite, which can take a couple of minutes.

## Build and deployment

### Google Cloud Build

We have three main branches in the repository, `master`, `stage` and `dev`. Any commit to any of these branches will be automatically deployed to their respective [Google Cloud Storage buckets](https://cloud.google.com/storage/docs/key-terms#buckets) available on public urls, given that the build pipeline succeeds. After a successful deployment, it usually takes a few minutes for the url to update with the new version of the application, in rare cases it can take as long as an hour, the reason for this is unknown.

### Environments

**Production** or live is deployed from the `master` branch. The url for the deployment is https://storage.googleapis.com/effekt-widget-react-prod/index.html. This is the environment used by our actual donors.

**Stage** is deployed from the `stage` branch. The url for the deployment is https://storage.googleapis.com/effekt-widget-react-stage/index.html. This environment is identical to production in terms of configuration, and uses the live production database. The intended usecase is to test new functionality in the same environment as the production api, without having to deploy the code to our users.

**Dev** is deployed from the `dev` branch. The url for the deployment is https://storage.googleapis.com/effekt-widget-react-dev/index.html. This environment uses the development database, and is used for testing new functionality to make sure it works correctly without affecting the production database.
