from fastapi import FastAPI, Request, Query, Depends
import uvicorn
from fastapi_pagination import Page, add_pagination, paginate
import requests
import random
import plotly.graph_objects as go
from plotly.io import to_json
from figures import polynomial_plot, regression_plot, surface_plot
from models.book_rating import BookRating
from db.init_db import create_db
from db.session import get_db
from sqlmodel import Session
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Add your frontend URL here
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


Page = Page.with_custom_options(
    size=Query(3, ge=1, le=3),
)


@app.on_event("startup")
async def on_startup():
    create_db()


@app.get("/")
async def root():
    return "API ROOT"


@app.get("/quote")
async def quote():
    res = requests.get("https://zenquotes.io/api/quotes")
    json_res = res.json()
    random_number = random.randrange(0, len(json_res))
    quote = json_res[random_number]["q"]
    author = json_res[random_number]["a"]
    context = {"quote": quote, "author": author}
    return context


@app.get("/plotly_chart")
async def plotly_chart():
    fig = go.Figure(
        go.Waterfall(
            name="20",
            orientation="v",
            measure=["relative", "relative", "total", "relative", "relative", "total"],
            x=[
                "Sales",
                "Consulting",
                "Net revenue",
                "Purchases",
                "Other expenses",
                "Profit before tax",
            ],
            textposition="outside",
            text=["+60", "+80", "", "-40", "-20", "Total"],
            y=[60, 80, 0, -40, -20, 0],
            connector={"line": {"color": "rgb(63, 63, 63)"}},
        )
    )

    fig.update_layout(title="Profit and loss statement 2018", showlegend=True)

    fig_json = to_json(fig)
    return fig_json


@app.get("/polynomial_plot")
async def _polynomial_plot():
    fig = polynomial_plot.fig()
    fig_json = to_json(fig, pretty=True)
    return fig_json


@app.get("/regression_plot")
async def _regression_plot():
    fig = regression_plot.fig()
    fig_json = to_json(fig, pretty=True)
    return fig_json


@app.get("/surface-plot")
async def _surface_plot():
    fig = surface_plot.fig()
    fig_json = to_json(fig, pretty=True)
    return fig_json


# Define your route for retrieving paginated data
@app.get("/book_ratings", response_model=Page[BookRating])
async def get_all_book_ratings(
    page: int = Query(1), size: int = Query(10), db: Session = Depends(get_db)
):
    items = db.query(BookRating).all()
    return paginate(items)


@app.post("/book_ratings", response_model=BookRating)
async def create_book_rating(book_rating: BookRating, db: Session = Depends(get_db)):
    # Create a new instance of BookRating model
    new_book_rating = BookRating(**book_rating.dict())

    # Add to session and commit transaction
    db.add(new_book_rating)
    db.commit()

    # Refresh the object to get the updated values from the database
    db.refresh(new_book_rating)

    return new_book_rating


@app.post("/capitalise")
async def capitalise(request: Request):
    input_data = await request.json()
    input_str = input_data.get("input_str")
    return f"{input_str.upper()}!!!!!!!!!"


add_pagination(app)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080, log_level="debug")
