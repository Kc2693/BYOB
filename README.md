# BYOB [Build your own backend]
#### By [Kailin Cannon](https://github.com/Kc2693) & [Aldo Mercado](https://github.com/amercado1014)

### Summary  
dfkhdsdjfhskdjfhsdjkfsjdhfskdjhfsdhfksdjhf

-------



## Available Endpoints
### Muscle Groups (GET/POST/PATCH/DELETE)  

#### GET `/api/v1/muscle-groups` 
Example response:
```
[{
"id": 1,
"muscle_group": "Abdominals",
"targeted_area": "Lower",
"train_with": "Biceps, Triceps",
"created_at": "2018-05-15T22:34:20.881Z",
"updated_at": "2018-05-15T22:34:20.881Z"
},
{
"id": 2,
"muscle_group": "Abdominals",
"targeted_area": "Obliques",
"train_with": "Biceps, Triceps",
"created_at": "2018-05-15T22:34:20.881Z",
"updated_at": "2018-05-15T22:34:20.881Z"
},
{
"id": 3,
"muscle_group": "Abdominals",
"targeted_area": "Total",
"train_with": "Biceps, Triceps",
"created_at": "2018-05-15T22:34:20.881Z",
"updated_at": "2018-05-15T22:34:20.881Z"
}]
```
#### POST `api/v1/muscle-groups`  
 * REQUIRED parameters in the body of your response:   
   * muscle_group:  The name of the muscle group. This does not have to be unique. 
   * targeted_area: The specific area. This is a **unique** key. For muscle-groups that will one have one targeted area, it is recommended to put 'Total'.
   * train_with: Other muscle groups that are recommended to be trained with this muscle group. 
 * Response will give you back the ID of the newly created group.
  
Example request body: 
```
{
  "muscle_group": "Abdominals",
  "targeted_area": "Lower",
  "train_with": "Biceps, Triceps"
}
```
Example response:
```
Status: 201
ID: 34
```

#### PATCH `api/v1/muscle-groups`  
Example response:  
```
Example response here
```


#### DELETE `api/v1/muscle-groups`
  * You must specify a muscle group ID in the body of your request
  * You must delete all exercises associated with the muscle group first or you will receive an error.
  
Example response:
```
Example response here
```
---
### Exercises (GET/POST/PATCH/DELETE)  

#### GET `api/v1/exercises`
Example response:
```
Example response here
```

#### POST `api/v1/exercises`
Example response:
```
Example response here
```

#### PATCH `api/v1/exercises:id`
Example response:
```
Example response here
```

#### DELETE `api/v1/exercises`
  * You must specify an exercise ID in the body of your request  
  
Example response:
```
Example response here
```
