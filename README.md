# BYOB [Build your own backend]
#### By [Kailin Cannon](https://github.com/Kc2693) & [Aldo Mercado](https://github.com/amercado1014)

### Summary  
Yolo ipsum dolor sit amet, you see that bamboo behind me though, you see that bamboo? Ain’t nothin’ like bamboo. Bless up. YOLO, you only live once. #Swiggityswag and I ain’t stoppin until the swear jar’s full. Your chick, she so thirsty, nec consequat dui imperdiet eget. I’m ballin’ hard, I need a jersey on, walk with me through the pathway of more success. Poppin’ bottles on the ice, tristique suscipit mauris elementum tempus. The key is to have every key, the key to open every door Drop it like it’s hot, at pretium quam. Lorem Khaled Ipsum is a major key to success. Find peace, life is like a water fall, you’ve gotta flow. Life is what you make it, so let’s make it. Fan luv. In life there will be road blocks but we will over come it. The weather is amazing, walk with me through the pathway of more success.. Ten, ten, twenties on them fifties, trick, at tempus libero fermentum id. I do it big.

-------



## Available Endpoints
 #### Table of Contents  
  * Muscle Groups
    * [GET](https://github.com/Kc2693/BYOB/blob/master/README.md#get-apiv1muscle-groups)
    * [GET:ID](https://github.com/Kc2693/BYOB/blob/master/README.md#get-by-id-apiv1muscle-groupsid)
    * [POST](https://github.com/Kc2693/BYOB/blob/master/README.md#post-apiv1muscle-groups)
    * [PATCH](https://github.com/Kc2693/BYOB/blob/master/README.md#patch-apiv1muscle-groups)
    * [DELETE](https://github.com/Kc2693/BYOB/blob/master/README.md#delete-apiv1muscle-groups)
  * Exercises
    * [GET](https://github.com/Kc2693/BYOB/blob/master/README.md#get-apiv1exercises)
    * [GET:ID](https://github.com/Kc2693/BYOB/blob/master/README.md#get-by-id-apiv1exercisesid)
    * [POST](https://github.com/Kc2693/BYOB/blob/master/README.md#post-apiv1exercises)
    * [PATCH](https://github.com/Kc2693/BYOB/blob/master/README.md#patch-apiv1exercisesid)
    * [DELETE](https://github.com/Kc2693/BYOB/blob/master/README.md#delete-apiv1exercises)

---  

### Muscle Groups (GET/GET:ID/POST/PATCH/DELETE)  

#### GET `/api/v1/muscle-groups` 
  * Retrieves all muscle groups in the database. 
  * Response will contain an array of objects containing each exercise.
  
  Example response:
  ```
  [
   {
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
   }
  ]
  ```
---

#### GET by ID `api/v1/muscle-groups/:id`  
  * Retrieve a specific muscle-group by ID.
  * Response will contain an array with an object containing the specified muscle group.
  
  Example response:
  ```
  [
   {
    "id": 3,
    "muscle_group": "Abdominals",
    "targeted_area": "Total",
    "train_with": "Biceps, Triceps",
    "created_at": "2018-05-15T22:34:20.881Z",
    "updated_at": "2018-05-15T22:34:20.881Z"
   }
  ]
  ```
---

#### POST `api/v1/muscle-groups`  
 * REQUIRED parameters in the body of your request:   
   * muscle_group:  The name of the muscle group. This does not have to be unique. 
   * targeted_area: The specific area. This is a **unique** key. For muscle-groups that will only have one targeted area, it is recommended to put 'Total'.
   * train_with: Other muscle groups that are recommended to be trained with this muscle group. 
 * Response will contain the ID of the newly created group. You can view this exercise with a get request to the specific id: GET api/v1/muscle-groups/:id
  
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
  id: 34
  ```
---

#### PATCH `api/v1/muscle-groups/:id` 
 * REQUIRED to put id of muscle-group-to-patch in request URL
 * Response will contain a message telling you that the muscle group was updated.
 
  Example response:  
  ```
  Status: 200
  "Updated muscle group"
  ```
---

#### DELETE `api/v1/muscle-groups`
  * You must specify a muscle group ID in the body of your request
  * You must delete all exercises associated with the muscle group first or you will receive an error.
  * Response will contain a message telling you that the muscle group was deleted.
  
  Example response:
  ```
  Status: 200
  "Deleted exercise with id {ID HERE}"
  ```
---


### Exercises (GET/GET:ID/POST/PATCH/DELETE)  

#### GET `api/v1/exercises`  
  * Retrieves all muscle groups in the database. 
  * Response will contain an array of objects containing each exercise.  
  
  Example response:
  ```
  [
    {
      "exercise": "Full Reverse Crunch",
      "level": "Advanced",
      "method": "FW",
      "upper_lower_core": "Core",
      "joint": "M",
      "targeted_area": "Lower"
    },
    {
     "exercise": "Bent-Knee Medicine Ball Hip Rotation",
     "level": "Advanced",
     "method": "FW",
     "upper_lower_core": "Core",
     "joint": "M",
     "targeted_area": "Obliques"
    },
    {
     "exercise": "Machine Curl",
     "level": "Beginner",
     "method": "M",
     "upper_lower_core": "Upper",
     "joint": "S",
     "targeted_area": "Biceps"
    },
  ]
  ```
--- 
  
#### GET by ID `api/v1/exercises/:id`  
  * Retrieve a specific exercise by ID.
  * Response will contain an array with an object containing the specified exercise.
  
  Example response:
  ```
  [
   {
    "exercise": "Machine Curl",
    "level": "Beginner",
    "method": "M",
    "upper_lower_core": "Upper",
    "joint": "S",
    "targeted_area": "Biceps"
   },
  ]
  ```
---

#### POST `api/v1/exercises`  
  * REQUIRED parameters in the body of your request:
    * exercise: Name of the exercise
    * level: Beginner/Intermediate/Advanced
    * method: FW/C/M (Free Weights, Cables, or Machine). The method this exercise uses.
    * upper_lower_core: Upper/Lower/Core. Which part of the muscle group does this exercise target?
    * joint: M/S. M for Multi-Joint Exercise, S for Single-Joint Exercise
    * muscle_group_id: The ID of the muscle group this exercise will belong to. If none exists, you must POST to muscle-groups beforehand.
  * Response will contain the id of the newly-created exercise. You can view this exercise with a get request to the specific id: GET `api/v1/exercises/:id`
  
  Example request body: 
  ```
  {
   "exercise": "Spell Caster",
   "level": "Advanced",
   "method": "FW",
   "upper_lower_core": "Core",
   "joint": "M",
   "muscle_group_id": 1   
  }
  ```
  
  Example response:
  ```
  Status: 201,
  id: 285
  ```
---

#### PATCH `api/v1/exercises:id`
 * REQUIRED to put id of exercise-to-patch in request URL
 * Response will contain a message telling you that the exercise was updated.
 
  Example response:  
  ```
  Status: 200
  "Updated exercise"
  ```
---

#### DELETE `api/v1/exercises`
  * YOU MUST specify an exercise ID in the body of your request
  * Response will contain a message telling you that the exercise was deleted.
  
  Example response:
  ```
  Status: 200
  "Deleted exercise with id {ID HERE}"
  ```
---



[Back To Top](https://github.com/Kc2693/BYOB/blob/master/README.md#byob-build-your-own-backend)
