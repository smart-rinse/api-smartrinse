# Smartrinse-API

Smartrinse REST-API: App to Database

# How to Use

- Local Host: Run with node js, local IP and Port:3000
  `http://localhost:3000/`
- Online Domain:

# Endpoint Route

- ### Register

    - URL Route:
        `/register/`

    - Method:
        POST

    - Request Body:
        - `name` as `string`
        - `email` as `string`, must be uniqe
        - `password` as `string`
        - `confPassword` as `string`

    - Response:
        ```
        {
            "success": true,
            "statusCode": 200,
            "message": "User Created"
        }
        ```

- ### Login

    - URL Route:
        `/login/`

    - Method:
        POST

    - Request Body:
        - `email` as `string`, must be uniqe
        - `password` as `string`

    - Response:
        ```
        {
        "success": true,
        "statusCode": 200,
        "message": "success",
        "data": {
            "userId": "user-OiniQO9tsS",
            "isLaundry": false,
            "name": "Pengguna 1",
            "email": "pengguna1@gmail.com",
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLU9pbmlRTzl0c1MiLCJuYW1lIjoiUGVuZ2d1bmEgMSIsImVtYWlsSWQiOiJwZW5nZ3VuYTFAZ21haWwuY29tIiwiaWF0IjoxNjg0NTU2ODgzLCJleHAiOjE2ODQ1OTI4ODN9.iRL0Y6PL88e_RoCSTJ2IrpOkJ_AHIw4X3VmQEcAJzJ"
        }
        }
        ```
- ### Create Laundry

    - URL Route:
        `/laundry/create`

    - Method:
        POST

    - Headers:
        - `Authorization` : `Bearer <token>`

    - Request Body:
        - `nama_laundry` as `string`
        - `tanggal_berdiri` as `date`, 
        - `kota` as `string`
        - `latitude` as `string`
        - `logitude` as `string`
        - `jam_operasional` as `string`
        - `photo` as `text`, optional 

    - Response:
        ```
        {
            "success": true,
            "statusCode": 201,
            "message": "Laundry created successfully",
            "laundry": {
                "id": "laundry-xSwrKTK37V",
                "nama_laundry": "Ngelondry",
                "tanggal_berdiri": "2020-04-04",
                "kota": "Bandung",
                "latitude": "-10.223",
                "longitude": "-17.321",
                "jam_operasional": "08.00 - 22.00",
                "photo": "",
                "userId": "user-OiniQO9tsS"
            }
        }
        ```
- ### Get All Users

    - URL Route:
        `/users/`

    - Method:
        GET

    - Headers:
        - `Authorization` : `Bearer <token>`

    - Response:
        ```
        {
            "success": true,
            "statusCode": 200,
            "message": "Users fetched successfully",
            "users": [
                {
                    "id": "user-OiniQO9tsS",
                    "name": "Pengguna 1",
                    "email": "pengguna1@gmail.com",
                    "isLaundry": true
                },
            ]
        }
        ```

- ### Get User By Id

    - URL Route:
        `/users/:id`

    - Method:
            GET

    - Headers:
        - `Authorization` : `Bearer <token>`

    - Response:
        ```
        {
            "success": true,
            "statusCode": 200,
            "message": "Users fetched successfully",
            "user": {
                "id": "user-OiniQO9tsS",
                "name": "Pengguna 1",
                "email": "pengguna1@gmail.com",
                "telephone": null,
                "gender": null,
                "city": null,
                "isLaundry": true, (nilai default is false)
            }
        }
        ```

- ### Get All Laundry

    - URL Route:
        `/laundry/`

    - Method:
        GET

    - Response:
        ```
        {
            "success": true,
            "statusCode": 200,
            "message": "Users fetched successfully",
            "laundry": [
                {
                    "id": "laundry-a0co9b2tqd",
                    "nama_laundry": "Sahabat Laundry",
                    "kota": "Garut",
                    "jam_operasional": "08.00 - 22.00",
                    "photo": ""
                },
            ]
        }
        ```

- ### Detail Laundry

    - URL Route:
        `/laundry/:id`

    - Method:
        GET


    - Response:
        ```
        {
            "success": true,
            "statusCode": 200,
            "message": "Laundry fetched successfully",
            "laundry": {
                "id": "laundry-a0co9b2tqd",
                "nama_laundry": "Sahabat Laundry",
                "tanggal_berdiri": "2020-01-01",
                "kota": "Garut",
                "latitude": "-7.227906",
                "longitude": "107.908699",
                "jam_operasional": "08.00 - 22.00",
                "photo": ""
            }
        }
        ```

- ### Article

    - URL Route:
        `/article/`

    - Method:
        GET

    - Response:
        ```
        {
            "success": true,
            "statusCode": 200,
            "message": "Laundry fetched successfully",
            "article": [
                {
                    "id": "article-08Aqv",
                    "author": "Wahyudi",
                    "date": "13 april 2023",
                    "title": "Inilah Langkah Membangun Bisnis Laundry Autopilot",
                    "sinopsis": "Karyawan menjadi aspek terpenting untuk mewujudkan bisnis laundry autopilot karena menjadi aspek roda penggerak bisnis agar profit tetap terjaga",
                    "url": "https://www.kompasiana.com/wahyudidigital/6437e8044addee535922d0e2/inilah-langkah-membangun-bisnis-laundry-autopilot"
                },
            ]
        }
        ```

- ### Refresh Token

    - URL Route:
        `/token/`
    
    - Method:
        GET
    
    - Response:
        ```
        {
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLU9pbmlRTzl0c1MiLCJuYW1lIjoiUGVuZ2d1bmEgMSIsImVtYWlsIjoicGVuZ2d1bmExQGdtYWlsLmNvbSIsImlhdCI6MTY4NDU1ODU3NiwiZXhwIjoxNjg0NjQ0OTc2fQ.aKsvEOofnJ_cPWtv3Mx4eRnOJu0mjDxw7W7PHlpmBYg"
        }
        ```

- ### Edit Password User

    - URL Route:
        `/editPassword/:id`

    - Method:
        PUT

    - Headers:
        - `Authorization` : `Bearer <token>`

    - Request Body:
          - `currentPassword` as `string`
          - `newPassword` as `string`
          - `confirmPassword` as `string`

    - Response:
        ```
        {
            "success": true,
            "statusCode": 200,
            "message": "Password changed successfully"
        }
        ```

- ### Edit Data User

    - URL Route:
        `/editUser/:id`

    - Method:
        PUT

    - Headers:
        - `Authorization` : `Bearer <token>`

    - Request Body:
          - `telephone` as `string`
          - `gender` as `string`
          - `city` as `string`

    - Response:
        ```
        {
            "success": true,
            "statusCode": 200,
            "message": "Success"
        }
        ```

- ### Logout

    - URL Route:
        `/logout`

    - Method:
        DELETE

    - Response:
        ```
        {
            "success": true,
            "statusCode": 200,
            "message": "Logout success"
        }
        ```


