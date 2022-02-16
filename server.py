from flask import Flask
from flask import render_template, redirect, url_for, request, flash, session
import bcrypt
import data_handler

app = Flask(__name__)


# Main functions


@app.route("/")
def welcome():
    return render_template("welcome.html")


@app.route("/menu")
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


# Login related functions


def is_logged_in():
    if "email" in session:
        return True
    else:
        return False


@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        all_user_emails = data_handler.get_all_emails()
        email = request.form["email"]
        username = request.form["username"]
        password = hash_password(request.form["password"])
        if email in all_user_emails:
            flash("An account already exists with this email.", "warning")
            # return redirect(url_for("login"))
        else:
            data_handler.add_new_user(email, password, username)
            session["user_id"] = data_handler.get_user_id_by_email(email)
            session["email"] = email
            return redirect(url_for("menu"))
    else:
        if "email" in session:
            flash("You are already logged in.", "warning")
            return redirect(url_for("menu"))
        return render_template("signup.html")


if __name__ == "__main__":
    app.run(debug=True)
