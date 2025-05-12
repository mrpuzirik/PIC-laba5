require('dotenv').config();

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send(`
    <style>
        a {
            text-decoration: none;
            color: #000;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
    <h1>Головна сторінка</h1>
    <ul>
      <li><a href="/weather">Перевірити погоду</a></li>
      <li><a href="/register">Реєстрація студента</a></li>
    </ul>
  `);
});

app.get('/weather', (req, res) => {
  if (!req.query.city) {
    res.send(`
      <style>
         a {
           text-decoration: none;
           color: #000
         }
         a:hover {
           text-decoration: underline;
         }
      </style>
      <h2>Введіть назву міста</h2>
      <form method="GET" action="/weather">
        <input name="city" placeholder="Назва міста" required />
        <button type="submit">Отримати погоду</button>
      </form>
      <a href="/">На головну</a>
    `);
  } else {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ua`)
        .then(response => {
          const data = response.data;
          res.send(`
          <style>
            a {
              text-decoration: none;
              color: #000;
            }
            a:hover {
              text-decoration: underline;
            }
          </style>
          <h2>Погода в місті ${data.name}</h2>
          <p>Температура: ${data.main.temp} °C</p>
          <p>Опис: ${data.weather[0].description}</p>
          <a href="/weather">Повернутися</a><br/>
          <a href="/">На головну</a>
        `);
        })
        .catch(error => {
          res.send(`
          <style>
            a {
              text-decoration: none;
              color: #000;
            }
            a:hover {
              text-decoration: underline;
            }
          </style>
          <p>Помилка: не вдалося отримати погоду для "${city}".</p>
          <a href="/weather">Спробувати ще</a><br/>
          <a href="/">На головну</a>
        `);
        });
  }
});

app.get('/register', (req, res) => {
  res.send(`
    <style>
      a {
        text-decoration: none;
        color: #000;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
    <h2>Реєстрація студента</h2>
    <form method="GET" action="/student">
      <label for="login">Логін Moodle:</label>
      <input type="text" id="login" name="login" required />
      <button type="submit">Показати інформацію</button>
    </form>
    <a href="/">На головну</a>
  `);
});

app.get('/student', (req, res) => {
  const login = req.query.login;

  if (!login) {
    res.send(`
      <p>Будь ласка, передайте параметр login у URL (наприклад, ?login=ivan.moodle)</p>
      <a href="/register">Назад</a>
    `);
    return;
  }

  const expectedLogin = 'is-31fiot-23-090';

  if (login !== expectedLogin) {
    res.send(`
      <style>
        a {
          text-decoration: none;
          color: #000;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
      <h2>Невірний логін</h2>
      <p>Введено логін: <strong>${login}</strong></p>
      <a href="/register">Спробувати ще раз</a><br/>
      <a href="/">На головну</a>
    `);
    return;
  }

  const lastName = 'Шевчук';
  const firstName = 'Андрій';
  const course = '2';
  const group = 'ІС-31';

  res.send(`
    <style>
      a {
        text-decoration: none;
        color: #000;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
    <h1>Особисті дані студента</h1>
    <p><strong>Логін у Moodle:</strong> ${login}</p>
    <p><strong>Прізвище:</strong> ${lastName}</p>
    <p><strong>Ім’я:</strong> ${firstName}</p>
    <p><strong>Курс:</strong> ${course}</p>
    <p><strong>Група:</strong> ${group}</p>
    <a href="/">На головну</a>
  `);
});


app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});
