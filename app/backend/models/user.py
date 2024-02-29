from typing_extensions import ReadOnly
from sqlmodel import SQLModel, Field
from pydantic import BaseModel, validator, PrivateAttr
from typing import Optional


class User(SQLModel, table=True):
    id: int = Field(primary_key=True)
    first_name: str
    last_name: str
    username: str
    email: str
    password: str


class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: Optional[str]
    password: str
    password_confirm: str

    @validator("password_confirm")
    def password_match(cls, v, values, **kwargs):
        if "password" in values and v != values["password"]:
            raise ValueError("passwords do not match")
        return v

    @validator("username", pre=True, always=True)
    def generate_username(cls, v, values):
        return f"{values.get('first_name', '')[0].lower()}.{values.get('last_name', '').lower()}"


class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    username: str
    email: str


class UpdateUserRequest(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    username: Optional[str]
    email: Optional[str]
