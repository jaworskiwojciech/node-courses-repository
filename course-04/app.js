const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const contactsRouter = require("./routes/contacts");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api", contactsRouter);
app.use(authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// SCHEMAT DZIAŁANIA na danych wrażliwych
// 1. Wysyłamy zapytanie do serwera z tonemen autoryzującym (np. Bearer)
// 2. Serwer przyjmuje zapytanie i wykorzystuje posiadany klucz API do platnej usługi
// 3. Serwer zwraca wynik do frontendu ze wszystkimi informacjami potrzebnymi do wyświetlenia gotowych danych
// 4. Frontend wypluwa wynik, nie tykając klucza API, gdyż cała operacja zaszła bezpiecznie, po stronie serwera.

module.exports = app;
