from flask import Flask
from flask import render_template, redirect, url_for, request, flash, session
import bcrypt
import data_handler

app = Flask(__name__)


# Main functions


@app.route("/")
def menu():
    return render_template("menu.html")


@app.route("/game")
def index():
    return render_template("index.html")


@app.route("/leaderboard")
def leaderboard():
    return render_template("leaderboard.html")


if __name__ == "__main__":
    app.run(debug=True)
