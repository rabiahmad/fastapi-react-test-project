from sqlmodel import select
from db.session import SessionLocal
from models.book_rating import BookRating
from data.book_ratings import book_ratings_list
from sqlalchemy.exc import SQLAlchemyError


def create_db():
    try:
        # Create a session
        with SessionLocal() as session:
            # Check if data already exists in the BookRating table
            existing_data = session.query(BookRating).first()

            # If data does not exist, populate the database with initial data
            if not existing_data:
                for book_rating_data in book_ratings_list:
                    session.add(book_rating_data)

                # Commit changes
                session.commit()
                print("Database initialized with initial data.")
            else:
                print("Database already contains data. Skipping initialization.")
    except SQLAlchemyError as e:
        print(f"Error during database initialization: {e}")
