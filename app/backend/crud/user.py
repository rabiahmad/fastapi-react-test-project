from models.user import User, UserResponse, UpdateUserRequest
from typing import List, Optional
from sqlmodel import Session
from sqlalchemy.exc import OperationalError


class UserCRUD:
    @staticmethod
    def get(user_id: int, db: Session) -> Optional[UserResponse]:
        with db as session:
            user = session.get(User, user_id)
            user_response = UserResponse(**user.__dict__)
            return user_response

    @staticmethod
    def get_many(db: Session, skip: int = 0, limit: int = 10) -> List[UserResponse]:
        with db as session:
            users = session.query(User).offset(skip).limit(limit).all()
            user_responses = [UserResponse(**user.__dict__) for user in users]
            return user_responses

    @staticmethod
    def create(user: User, db: Session) -> User:
        with db as session:
            session.add(user)
            try:
                session.commit()
            except OperationalError:
                # Rollback the session to clear any failed transactions
                session.rollback()
                # Create table if it doesn't exist
                User.__table__.create(session.get_bind(), checkfirst=True)
                session.commit()
                session.refresh(user)
            return user

    @staticmethod
    def update(
        user_id: int, user: UpdateUserRequest, db: Session
    ) -> Optional[UserResponse]:
        with db as session:
            db_user = session.get(User, user_id)
            if db_user:
                for attr, value in user.model_dump(exclude_unset=True).items():
                    setattr(db_user, attr, value)
                session.commit()
                session.refresh(db_user)
                user_response = UserResponse(**db_user.__dict__)
                return user_response
            else:
                raise ValueError("User does not exist")

    @staticmethod
    def delete(user_id: int, db: Session) -> Optional[UserResponse]:
        with db as session:
            db_user = session.get(User, user_id)
            if db_user:
                session.delete(db_user)
                session.commit()
                user_response = UserResponse(**db_user.__dict__)
                return user_response
            else:
                raise ValueError("User does not exist")
