from flask import Flask
from flask import render_template, redirect, url_for, request, flash, session
import bcrypt
import data_handler

app = Flask(__name__)

app.config["SECRET_KEY"] = "key"


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
            return redirect(url_for("login"))
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


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        hashed_password = data_handler.get_hashed_password(email)
        all_user_emails = data_handler.get_all_emails()
        if email in all_user_emails:
            if verify_password(password, hashed_password):
                session["email"] = email
                session["user_id"] = data_handler.get_user_id_by_email(email)
                return redirect(url_for("menu"))
            else:
                flash("Wrong password!", "warning")
                return redirect(url_for("login"))
        else:
            flash("No account with that e-mail. Please sign up first.", "warning")
            return redirect(url_for('signup'))
    else:
        if "email" in session:
            return redirect(url_for("menu"))
        return render_template("login.html")


@app.route("/logout")
def logout():
    # remove the username from the session if it's there
    if is_logged_in():
        session.clear()
        flash("You are logged out.", "info")
        return redirect(url_for("welcome"))
    else:
        flash("You are already logged out.", "info")
        return redirect(url_for("login"))


if __name__ == "__main__":
    app.run(debug=True)
