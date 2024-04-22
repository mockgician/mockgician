# Documentation

---

## Table of Contents
1. [Authorization](#auth)
2. [Get Service Types](#service_types)
3. [Get HTTP Methods](#http_methods)
4. [Get Services](#get_services)
5. [Delete Services](#delete_services)

---

## <a id="auth">Authorization</a>
### Description
The method is intended to obtain an authorization token (JWT).
### Address
`
{{host}}/token/
`
### HTTP-Method
`
POST
`
### Headers
| Key          | Value                              |
|--------------|------------------------------------|
| Content-Type | application/x-www-form-urlencoded  |

### Request Body
| Key      | Value        |
|----------|--------------|
| username | {{username}} |
| password | {{password}} |
### Response Example
```json
{
   "access_token": "eyJhbGciOiJ.IUzI1NiIsInR5cCI6IkpXVC_", 
   "token_type": "bearer"
}
```

---

## <a id="service_types">Get Service Types</a>

### Description
Method is intended to obtain a list of service-types that can be configured.
### Address
`
{{host}}/service_types/
`
### HTTP-Method
`
GET
`
### Headers
| Key           | Value            |
|---------------|------------------|
| Authorization | Bearer {{token}} |
### Request Body
`
none
`
### Response Example
```json
[
    "REST",
    "SOAP"
]
```

---

## <a id="http_methods">Get HTTP Methods</a>

### Description
Method is intended to obtain a list of HTTP-methods that can be configured.
### Address
`
{{host}}/http_methods/
`
### HTTP-Method
`
GET
`
### Headers
| Key           | Value            |
|---------------|------------------|
| Authorization | Bearer {{token}} |
### Request Body
`
none
`
### Response Example
```json
[
    "POST",
    "GET",
    "PUT",
    "PATCH",
    "DELETE"
]
```

---

## <a id="get_services">Get Services</a>

### Description
Method is intended to obtain information on configured mock-services.
### Address
`
{{host}}/services/?page={int}&page_size={int}&name={input_name}
`
### HTTP-Method
`
GET
`
### Headers
| Key           | Value            |
|---------------|------------------|
| Authorization | Bearer {{token}} |
### Path Params
| Key       | Value                  |
|-----------|------------------------|
| page      | page number            |
| page_size | page count on the page |
| name      | input name for search  |
### Request Body
`
none
`
### Response Example
```json
{
    "total": 15,
    "pages": 3,
    "services": [
        {
            "id": 1,
            "type": "REST",
            "name": "test",
            "endpoint": "GET",
            "description": "123"
        },
        {
            "id": 2,
            "type": "REST",
            "name": "test",
            "endpoint": "GET",
            "description": "123"
        }
    ]
}
```

---

## <a id="delete_services">Delete Services</a>

### Description
Method is intended to delete a previously configured service.
### Address
`
{{host}}/delete_services/
`
### HTTP-Method
`
DELETE
`
### Headers
| Key           | Value            |
|---------------|------------------|
| Authorization | Bearer {{token}} |
### Request Body
| Key          | Value      |
|--------------|------------|
| services_ids | Array[int] |
### Request Example
```json
{
    "services_ids": [
        4,
        5
    ]
}
```
### Response Example
```json
{
    "message": "Services successfully deleted",
    "deleted_services": 2
}
```