from sqlmodel import Field, SQLModel
from typing import Optional
from typing import List


class BaseBookRating(SQLModel):
    title: str
    author: str
    rating: int = Field(None, ge=1, le=5)
    review: str


class BookRating(BaseBookRating, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class BookRatingPagination(SQLModel):
    items: List[BookRating]
    total: int
    page: int
    size: int
