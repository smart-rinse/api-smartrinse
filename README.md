# Cloud Computing
# Introduction
Welcome to this documentation

# Architechture
![alt text](https://github.com/smart-rinse/api-smartrinse/blob/cloud-computing/img/arsitektur-cloud.jpeg?raw=true)

Our application's cloud infrastructure consists of two APIs.
The first API serves as the core API for our machine learning (ML) models. This API is accessible to Node.js through Axios, enabling seamless integration of the ML models with the main API.
The second API is the main API designed specifically for Android applications. Through this API, Android application users can easily access and retrieve information from the database.
Having these two APIs allows us to separate the ML functionality from the main API, ensuring ease of maintenance and separate development. 
Furthermore, it provides flexibility for our users, allowing them to utilize the services provided by our cloud infrastructure through either Node.js or Android applications.

# Service & Framework
![alt text](https://github.com/smart-rinse/api-smartrinse/blob/cloud-computing/img/Service.jpeg?raw=true)

