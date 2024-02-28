import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures


def format_coefs(coefs):
    equation_list = [f"{coef}x^{i}" for i, coef in enumerate(coefs)]
    equation = "$" + " + ".join(equation_list) + "$"

    replace_map = {"x^0": "", "x^1": "x", "+ -": "- "}
    for old, new in replace_map.items():
        equation = equation.replace(old, new)

    return equation


def fig():
    df = px.data.tips()
    X = df.total_bill.values.reshape(-1, 1)
    x_range = np.linspace(X.min(), X.max(), 100).reshape(-1, 1)

    fig = px.scatter(df, x="total_bill", y="tip", opacity=0.65)
    for degree in [1, 2, 3, 4]:
        poly = PolynomialFeatures(degree)
        poly.fit(X)
        X_poly = poly.transform(X)
        x_range_poly = poly.transform(x_range)

        model = LinearRegression(fit_intercept=False)
        model.fit(X_poly, df.tip)
        y_poly = model.predict(x_range_poly)

        equation = format_coefs(model.coef_.round(2))
        fig.add_traces(go.Scatter(x=x_range.squeeze(), y=y_poly, name=equation))

    return fig
