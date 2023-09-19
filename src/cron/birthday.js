const checkBirthdayMonthAndDay = async () => {
        try {
            // Обращаемся к базе данных, чтобы получить users, в нашем случае будем использовать тестовые данные
            const users = [
                {"name": "Anton", "birthday": "19.09.2003", "age" : 18, "email": "kashirin.antosha@mail.ru"},
                {"name": "Arslan", "birthday": "13.09.2002", "age" : 18, "email": "arslan@example.com"},
                {"name": "Valera", "birthday": "13.09.2003", "age" : 18, "email": "valera@example.com"},
                {"name": "Vasya", "birthday": "13.09.2003", "age" : 18, "email": "vasya@example.com"}
            ];

            // Получить текущую дату
            const currentDate = new Date();
            const currentDay = currentDate.getDate();
            const currentMonth = currentDate.getMonth() + 1; // Месяцы в JavaScript начинаются с 0 (январь) до 11 (декабрь)

            // Форматировать текущую дату в "дд.мм"
            const currentDateString = `${currentDay < 10 ? '0' : ''}${currentDay}.${currentMonth < 10 ? '0' : ''}${currentMonth}`;

            // Найти пользователей с совпадающими днями и месяцами рождения
            const matchingUsers = users.filter((user) => {
                const userBirthday = user.birthday.split('.'); // Разбиваем дату рождения пользователя
                const userBirthdayString = `${userBirthday[0]}.${userBirthday[1]}`; // Форматируем в "дд.мм"
                return userBirthdayString === currentDateString;
            });

            // Получить email-ы совпадающих пользователей
            // const matchingEmails = matchingUsers.map((user) => user.email); // Здесь много массивов email
            const modifiedUsers = matchingUsers.map(user => ({
                name: user.name,
                email: user.email
            }));

            return modifiedUsers;
        } catch (err) {
            console.log(666, err);
        }
    };

module.exports = {checkBirthdayMonthAndDay}