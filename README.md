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
 * **REQUIRED parameters in the body of your response:**  
  * 'muscle_group'
  * 'targeted_area'
  * 'train_with'
  
  
Example response:
```
Example response here
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
