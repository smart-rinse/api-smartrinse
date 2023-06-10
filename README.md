# Smartrinse-API
# How to Use

- `npm instal`
- `npm run dev`
- Local Host: Run with node js, local IP and Port:8000
  `http://localhost:8000/`

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
    - Status : 200
      ```
      {
          "success": true,
          "statusCode": 200,
          "message": "User Created"
      }
      ```
    - Status : 400
      ```
      {
          "success": false,
          "statusCode": 400,
          "message": "Please complete input data!"
      }
      ```
      ```
      {
          "success": false,
          "statusCode": 400,
          "message": "Your email has been registered!"
      }
      ```
      ```
      {
          "success": false,
          "statusCode": 400,
          "message": "Password and Confirm Password do not match!"
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
    - Status : 200
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
    - Status : 400
      ```
      {
          "success": false,
          "statusCode": 400,
          "message": "Password Wrong!"
      }
      ```
      ```
      {
          "success": false,
          "error": {
              "message": "Email Not Found",
              "uri": "/login"
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
    - `alamat` as `string`
    - `latitude` as `string`
    - `logitude` as `string`
    - `jam_buka` as `string`
    - `jam_tutup` as `string`
    - `photo` as `text`, optional

  - Response:
    - Status : 200
      ```
      {
          "success": true,
          "statusCode": 201,
          "message": "Laundry created successfully",
          "laundry": {
              "id": "laundry-xSwrKTK37V",
              "nama_laundry": "Ngelondry",
              "tanggal_berdiri": "2020-04-04",
              "alamat": "Bandung",
              "latitude": "-10.223",
              "longitude": "-17.321",
              "jam_buka": "08.00 - 22.00",
              "jam_tutup": "08.00 - 22.00",
              "photo": "",
              "userId": "user-OiniQO9tsS"
          }
      }
      ```
    - Status : 400
      ```
      {
          "success": false,
          "statusCode": 400,
          "message": "Please complete input data!"
      }
      ```
    - Status : 401
      ```
      Unauthorized
      ```
    - Status : 404
      ```
      {
          "success": false,
          "statusCode": 404,
          "message": "User not found"
      }
      ```
- ### Create Review
  - URL Route:
    `/laundry/:id_laundry/review`

  - Method:
    POST

  - Headers:
    - `Authorization` : `Bearer <token>`

  - Request Body :
    - `content` as `string`
    - `rating` as `integer`

  - Response: 
    ```
    {
        "success": true,
        "message": "Review created successfully",
        "review": {
            "id": 10,
            "content": "Jelek",
            "rating": "1",
            "laundryId": "laundry-ew5eNjjB2e",
            "userId": "user-5_3ucWmYxd",
            "userName": "Pengguna 2"
        }
    }
    ```
- ### Create Laundry Favorit
  - URL Route:
    `/favorite/:id_laundry`

  - Method:
    POST

  - Headers:
    - `Authorization` : `Bearer <token>`

  - Response: 
    - Status: 200
      ```
      {
        "success": true,
        "statusCode": 200,
        "message": "Laundry chosen as favorite successfully"
      }
      ```
    - Status: 400
      ```
      {
        success: false,
        statusCode: 400,
        message: "Laundry already chosen as favorite",
      }
      ```
    - Status: 404
      ```
      {
        success: false,
        statusCode: 404,
        message: "Laundry Not Found",
      }
      ```
- ### Create Service
  - URL Route:
    `/service/:id_laundry`

  - Method:
    POST

  - Headers:
    - `Authorization` : `Bearer <token>`

  - Request Body :
    - `jenis_service` as `string`
    - `price` as `integer`

  - Response: 
    ```
    {
        "success": true,
        "message": "Service created successfully",
        "service": {
            "id": 3,
            "jenis_service": "Cuci",
            "price": "5000",
            "userId": "user-o07qirMhHQ",
            "laundryId": "laundry-y7eXrl9d4E"
        }
    }
    ```
- ### Create Transaction
  - URL Route:
    `/transaction/:id_laundry`

  - Method:
    POST

  - Headers:
    - `Authorization` : `Bearer <token>`

  - Request Body :
    ```
    {
      "serviceData": [
        {
          "serviceId": "1",
          "quantity": 2
        }
      ]
    }
    ```
  - Response: 
    ```
    {
      "success": true,
      "message": "Transaksi berhasil dibuat",
      "transaction": {
        "id": "T-6",
        "userId": "user-0L3EQKQS4C",
        "laundryId": "laundry-6XDAOkk7RK",
        "transactionDate": "2023-06-10T07:22:52.906Z"
      }
    }
    ```

- ### Get TransactionById (Detail Transaction)

  - URL Route:
    `/transaction/:idTransaction`

  - Method:
    GET

  - Headers:
    - `Authorization` : `Bearer <token>`

  - Response:
    ```
    {
      "success": true,
      "message": "Transaksi berhasil ditemukan",
      "transaction": {
        "transactionNumber": "T-6",
        "transactionDate": "2023-06-10T07:22:52.000Z",
        "nama_laundry": "Ngelondri Kuy",
        "rekening": null,
        "owner": "Pengguna 2",
        "pembeli": "aba",
        "totalCost": 20000,
        "services": [
          {
            "serviceName": "Cuci Kiloan",
            "quantity": 2,
            "price": 10000
          }
        ]
      }
    }
    ```
- ### Get TransactionByUser

  - URL Route:
    `/transaction/`

  - Method:
    GET

  - Headers:
    - `Authorization` : `Bearer <token>`

  - Response:
    ```
    {
      "success": true,
      "statusCode": 200,
      "message": "Transaksi pengguna berhasil ditemukan",
      "userTransaction": [
        {
          "idTransaction": "T-6",
          "dateTransaction": "2023-06-10T07:22:52.000Z",
          "totalCost": 20000
        },
        {
          "idTransaction": "T-823",
          "dateTransaction": "2023-06-09T15:21:26.000Z",
          "totalCost": 20000
        }
      ]
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
    - Status : 200
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
    - Status : 401
      ```
      Unauthorized
      ```

- ### Get User By Id

  - URL Route:
    `/users/:id`

  - Method:
    GET

  - Headers:

    - `Authorization` : `Bearer <token>`

  - Response:
    - Status : 200
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
              "isLaundry": false,
              "photo": ""
          }
      }
      ```
    - Status : 401
      ```
      Unauthorized
      ```
    - Status : 404
      ```
      {
         "success": false,
         "statusCode": 404,
         "message": "User not found"
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
                "alamat": "Garut",
                "jam_buka": "08.00 - 22.00",
                "jam_tutup": "08.00 - 22.00",
                "photo": ""
            },
        ]
    }
    ```
- ### Get All Laundry By Sentiment

  - URL Route:
    `/laundry/sentiment`

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
                "alamat": "Garut",
                "jam_buka": "08.00 - 22.00",
                "jam_tutup": "08.00 - 22.00",
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
    - Status : 200
      ```
      {
          "success": true,
          "statusCode": 200,
          "message": "Laundry fetched successfully",
          "laundry": {
              "id": "laundry-a0co9b2tqd",
              "nama_laundry": "Sahabat Laundry",
              "tanggal_berdiri": "2020-01-01",
              "alamat": "Garut",
              "latitude": "-7.227906",
              "longitude": "107.908699",
              "jam_buka": "08.00 - 22.00",
              "jam_tutup": "08.00 - 22.00",
              "photo": "",
              "average_rating": 3.42857,
              "reviews": [
                {
                "id": 4,
                "content": "Cepat banget pokonya",
                "rating": 5,
                "name": "Pengguna 2",
                "photo": null
                },
              ]
          }
      }
      ```
    - Status : 404
      ```
      {
         "success": false,
         "statusCode": 404,
         "message": "User not found"
      }
      ```
- ### Fitur Search Laundry
  
  - URL Route:
    `/search`

  - Method:
    GET

  - Params:
    `keyword` as `string`

  - Response:
    ```
    {
        "success": true,
        "message": "Laundry search results",
        "keyword": "Cuy",
        "laundry": [
            {
                "id": "laundry-ew5eNjjB2e",
                "nama_laundry": "Cuy Laundry",
                "alamat": "Garut",
                "jam_buka": "07.00 - 22.00",
                "jam_tutup": "07.00 - 22.00",
                "photo": "https://storage.googleapis.com/image-upload-27/20230523-173656"
            }
        ]
    }
    ```

- ### Fitur Laundry by Rating
  - URL Route:
    `/rating`

  - Method:
    GET

  - Params:
    `rating` as `string`

  - Response:
    ```
    {
        "success": true,
        "message": "Laundry search results",
        "rating": "4",
        "laundry": [
            {
                "id": "laundry-bFU4PB2JOt",
                "nama_laundry": "Sobat Laundry",
                "alamat": "Garut",
                "jam_buka": "07.00 - 22.00",
                "jam_tutup": "07.00 - 22.00",
                "photo": "https://storage.googleapis.com/image-upload-27/20230523-143356"
            }
        ]
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
                "url": "https://www.kompasiana.com/wahyudidigital/6437e8044addee535922d0e2/inilah-langkah-membangun-bisnis-laundry-autopilot",
                "thumbnail": "https://storage.googleapis.com/image-article-27/article-3.jpg"
            },
        ]
    }
    ```
- ### FAQ

  - URL Route:
    `/faq/`

  - Method:
    GET

  - Response:
    ```
    {
        "success": true,
        "statusCode": 200,
        "message": "FAQ is ready",
        "faq": [
            {
                "id": "1",
                "question": "Bagaimana cara kerja aplikasi ini?",
                "answer": "Aplikasi ini memungkinkan Anda untuk melakukan pemesanan laundry dengan menginisiasi percakapan melalui chat dengan penyedia jasa laundry."
            },
        ]
    }
    ```
- ### Get Laundry Favorite

  - URL Route:
    `/favorite/laundry`

  - Method:
    GET

  - Headers:
    - `Authorization` : `Bearer <token>`

  - Response:
    ```
    {
        "success": true,
        "statusCode": 200,
        "message": "Favorite laundry fetched successfully",
        "laundry": [
            {
                "id": "laundry-a0co9b2tqd",
                "nama_laundry": "Sahabat Laundry",
                "alamat": "Garut",
                "jam_buka": "08.00 - 22.00",
                "jam_tutup": "08.00 - 22.00",
                "photo": ""
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

  - Request Body: - `currentPassword` as `string` - `newPassword` as `string` - `confirmPassword` as `string`

  - Response:
    - Status : 200
      ```
      {
          "success": true,
          "statusCode": 200,
          "message": "Password changed successfully"
      }
      ```
    - Status : 400
      ```
      {
          "success": false,
          "statusCode": 400,
          "message": "Current password is incorrect"
      }
      ```
      ```
      {
          "success": false,
          "statusCode": 400,
          "message": "New password and confirm password do not match"
      }
      ```
    - Status : 401
      ```
      Unauthorized
      ```

- ### Edit Data User

  - URL Route:
    `/editUser/:id`

  - Method:
    PUT

  - Headers:
    - `Authorization` : `Bearer <token>`

  - Request Body: - `telephone` as `string` - `gender` as `string` - `city` as `string`

  - Response:
    - Status : 200
      ```
      {
          "success": true,
          "statusCode": 200,
          "message": "Success"
      }
      ```
    - Status : 401
      ```
      Unauthorized
      ```
    - Status : 404
      ```
      {
         "success": false,
         "statusCode": 404,
         "message": "User not found"
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
- ### Remove Laundry Favorite

  - URL Route:
    `/favorite/delete/:idlaundry`

  - Method:
    DELETE

  - Headers:
    - `Authorization` : `Bearer <token>`

  - Response:
    - Status: 200
      ```
      {
          "success": true,
          "statusCode": 200,
          "message": "Favorite laundry removed successfully"
      }
      ```
    - Status: 404
      ```
      {
        success: false,
        statusCode: 404,
        message: 'Laundry not found',
      }
      ```
      ```
      {
        success: false,
        statusCode: 404,
        message: 'Laundry is not a favorite',
      }
      ```

