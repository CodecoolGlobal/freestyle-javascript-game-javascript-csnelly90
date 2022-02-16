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


# Password handling functions


def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode("utf-8"), bcrypt.gensalt())
    return hashed_bytes.decode("utf-8")


def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode("utf-8")
    return bcrypt.checkpw(plain_text_password.encode("utf-8"), hashed_bytes_password)


if __name__ == "__main__":
    app.run(debug=True)
