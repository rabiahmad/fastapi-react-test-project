from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel, create_engine

# Create the SQLAlchemy engine
engine = create_engine(
    "sqlite:///example.db",
    echo=True,
    # required for sqlite
    connect_args={"check_same_thread": False},
)

# Create a sessionmaker factory function
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create the database tables
SQLModel.metadata.create_all(engine)


# Function to yield the db. Used for dependency injection in the API endpoints
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
