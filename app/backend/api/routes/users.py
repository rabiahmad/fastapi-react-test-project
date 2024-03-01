from multiprocessing import Value
from fastapi import APIRouter, Depends
from fastapi.utils import deep_dict_update
from models.user import User, UserCreate, UpdateUserRequest
from crud.user import UserCRUD
from db.session import get_db
from sqlmodel import Session

router = APIRouter()


@router.post("/users/")
async def create_user(user_data: UserCreate, db: Session = Depends(get_db)):
    try:
        # Create a User object from the request data
        user = User(
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            username=user_data.username,
            email=user_data.email,
            password=user_data.password,
        )

        # Call the create method from the UserCRUD class to add the user to the database
        created_user = UserCRUD.create(user, db)

        # Return the created user
        return created_user
    except Exception as e:
        # Handle any exceptions that might occur during user creation
        return {"error": str(e)}


@router.get("/users/")
async def get_users(db: Session = Depends(get_db)):
    """Get all users"""
    # Your logic here to get users
    users = UserCRUD.get_many(db)
    return {"users": users}


@router.get("/users/{id}")
async def get_user(id: int, db: Session = Depends(get_db)):
    """Get single user"""
    user = UserCRUD.get(id, db)
    return user


@router.put("/user/{id}")
async def update_user(id: int, data: UpdateUserRequest, db: Session = Depends(get_db)):
    """Update a user information"""
    updated_user = UserCRUD.update(id, data, db)
    return updated_user


@router.delete("/user/{id}")
async def delete_user(id: int, db: Session = Depends(get_db)):
    """Delete a user for a given user id"""
    try:
        deleted_user = UserCRUD.delete(id, db)
        return deleted_user, "successfully deleted"
    except Exception as error_message:
        return f"{error_message}"
