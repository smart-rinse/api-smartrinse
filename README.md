# Cloud Computing

## Introduction
<h3>Welcome to this documentation 👋</h3>
You can visit the link below directly to view the SmartRinse API documentation.
- ### Link REST API = https://github.com/smart-rinse/api-smartrinse/tree/api-v2 
- ### Link ML API = https://github.com/smart-rinse/api-smartrinse/tree/api-prod-ml

## Architecture
![alt text](https://github.com/smart-rinse/api-smartrinse/blob/cloud-computing/img/arsitektur-cloud.jpeg?raw=true)
Our application's cloud infrastructure consists of two APIs.
The first API serves as the core API for our machine learning (ML) models. This API is accessible to Node.js through Axios, enabling seamless integration of the ML models with the main API.
The second API is the main API designed specifically for Android applications. Through this API, Android application users can easily access and retrieve information from the database.
Having these two APIs allows us to separate the ML functionality from the main API, ensuring ease of maintenance and separate development. 
Furthermore, it provides flexibility for our users, allowing them to utilize the services provided by our cloud infrastructure through either Node.js or Android applications.

## Service & Framework
<p align="center">
  <img src="https://github.com/smart-rinse/api-smartrinse/blob/cloud-computing/img/Service.jpeg?raw=true" alt="Service Image">
</p>
For data services, we use Cloud Storage and Cloud SQL to store and manage files and databases. For deployment, we rely on Cloud Run, Container Registry, and Cloud Build to create a scalable and efficient deployment environment. On the network services side, we utilize Serverless VPC Connector and Secret Manager. Ultimately, we leverage Express Node.js, Axios, and FastAPI to build a robust and efficient REST API.

## Deploying to Cloud Run
- ### Preconditions
  Before deploying your app to Google Cloud Run, ensure that you meet the following prerequisites:
  - Create a Google Cloud Platform (GCP) account and manage projects.
  - Install and configure the Google Cloud SDK on your local machine.
  Please note that "prerequisites" is a plural noun, so it is more appropriate to use "meet the following prerequisites" instead of "meet the following prerequisite" in this context.

- ### Steps
  - Prepare the application
    Ensure that your application is ready for deployment on Google Cloud Run. This involves conducting local testing and ensuring that the necessary configuration is in place.
  - Create a container image
    Google Cloud Run requires the application to be packaged as a distributable container image. Build container images of your applications using tools like Docker.
  - Upload the container image
    Upload the container image you created to the Google Container Registry (GCR) using the gcloud command. Before proceeding, ensure that you are signed in to the correct Google Cloud Platform (GCP) account.
    Example command to upload a container image:
    ```
    gcloud builds submit --tag gcr.io/[PROJECT-ID]/[IMAGE-NAME]
    ```
  - Deploy to Google Cloud Run
    Use the gcloud run deploy command to deploy your application to Google Cloud Run. Specify the service name, select the uploaded container image, and configure any additional options as necessary.
    Example command to deploy an application to Google Cloud Run:
    ```
    gcloud run deploy [SERVICE-NAME] --image gcr.io/[PROJECT-ID]/[IMAGE-NAME] --platform managed
    ```
  - Accessing the application
    After the deployment process is complete, you will receive a URL that provides access to the deployed application. Utilize this URL to access the app through a web browser or by employing an API testing tool such as cURL or Postman.



