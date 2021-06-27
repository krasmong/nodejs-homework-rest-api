# GoIT Node.js

### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими исправлениями простых ошибок

## Домашнее задание №4

- Создаем ветку `hw04-auth` из ветки master.
- Продолжаем создание REST API для работы с коллекцией контактов. Добавляем логику аутентификации/авторизации пользователя с помощью JWT.
- В коде создаем схему и модель пользователя для коллекции `users`.
- Чтобы каждый пользователь работал и видел только свои контакты в схеме контактов добавляем свойство `owner`.
- Создаем эндпоинт: `/users/signup`, `/users/login`, `/users/logout`.
- Делаем валидацию всех обязательных полей (`email` и `password`). При ошибке валидации возвращаем `Ошибку валидации`. В случае успешной валидации в модели User создаем пользователя по данным которые прошли валидацию. Для засолки паролей используем `bcryptjs`. Если почта уже используется кем-то другим, вернем `Ошибку Conflict`. В противном случае вернем `Успешный ответ`.
- Проверка токена. Создаем мидлвар для проверки токена и добавляем его ко всем маршрутам, которые должны быть защищены.
- Делаем пагинацию с `mongoose-paginate-v2` для коллекции контактов (`GET /contacts?page=1&limit=20`).
- Делаем сортировку и фильтрацию.
- Для защиты приложения Express, задавая различные заголовки HTTP подключаем пакет `helmet`. Это не серебряная пуля, но может помочь!
- Для ограничения повторных запросов к API подключаем пакет `express-rate-limit`
- Для преобразования типа запроса из строчного в булеан для приложений Express / Connect подключаем пакет `express-query-boolean`.
- Создаем эндпоинт: `/users/current`

- Пакеты: `bcryptjs`, `jsonwebtoken`, `passport`, `passport-jwt`, `mongoose-paginate-v2`, `helmet`, `express-rate-limit`, `express-query-boolean`

==================================================================================

## Домашнее задание №3

- Создаем ветку `hw03-mongodb` из ветки master.
- Продолжаем создание `REST API` для работы с коллекцией контактов.
- Подключаем `MongoDB` при помощи `ODM Mongoose`.
- Для роута `POST /api/contacts` вносим изменения: если поле `favorite` не указали в `body`, то при сохранении в базу нового контакта, делаем поле `favorite` равным по умолчанию `false`.
- Пакеты: `mongoose`, `dotenv`.
- Добавляем дополнительное поле статуса `favorite`, которое принимает логическое значение `true` или `false`. Оно отвечает за то, что в избранном или нет находится указанный контакт.

#### Для обновления статуса контакта добавляем новый маршрут: `@ PATCH /api/contacts/:contactId/favorite`:

- Получает параметр `contactId`
- Получает `body` в json-формате c обновлением поля `favorite`
- Если `body` нет, возвращает json с ключом `{"message": "missing field favorite"}` и статусом `400`
- Если с `body` все хорошо, вызывает функцию `updateStatusContact(contactId, body)` (напиши ее) для обновления контакта в базе
- По результату работы функции возвращает обновленный объект контакта и статусом `200`. В противном случае, возвращает json с ключом `"message": "Not found"` и статусом `404`

=======================================================================

Домашнее задание №2

Создаем форк репозитория goitacademy/nodejs-homework-template в свой github аккаунт.
Создаем ветку hw02-express из ветки master.
Пишем REST API для работы с коллекцией контактов. Для работы с REST API используем Postman.
Для присвоения уникальных универсальных идентификаторов используем пакет uuid.
Для маршрутов, что принимают данные (POST, PUT, PATCH), делаем проверку (валидацию) принимаемых данных. Используем пакет–валидатор данных joi.

@ GET /api/contacts
ничего не получает
вызывает функцию listContacts для работы с json-файлом contacts.json
возвращает массив всех контактов в json-формате со статусом 200

@ GET /api/contacts/:contactId
Не получает body
Получает параметр contactId
вызывает функцию getById для работы с json-файлом contacts.json
если такой id есть, возвращает объект контакта в json-формате со статусом 200
если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404

@ POST /api/contacts
Получает body в формате {name, email, phone}
Если в body нет каких-то обязательных полей, возвращает json с ключом {"message": "missing required name field"} и статусом 400
Если с body все хорошо, добавляет уникальный идентификатор в объект контакта
Вызывает функцию addContact(body) для сохранения контакта в файле contacts.json
По результату работы функции возвращает объект с добавленным id {id, name, email, phone} и статусом 201

@ DELETE /api/contacts/:contactId
Не получает body
Получает параметр contactId
вызывает функцию removeContact для работы с json-файлом contacts.json
если такой id есть, возвращает json формата {"message": "contact deleted"} и статусом 200
если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404

@ PUT /api/contacts/:contactId
Получает параметр contactId
Получает body в json-формате c обновлением любых полей name, email и phone
Если body нет, возвращает json с ключом {"message": "missing fields"} и статусом 400
Если с body все хорошо, вызывает функцию updateContact(contactId, body) (напиши ее) для обновления контакта в файле contacts.json
По результату работы функции возвращает обновленный объект контакта и статусом 200. В противном случае, возвращает json с ключом "message": "Not found" и статусом 404
