const user = (user) => {
	user.password = null;
	return user;
};
const users = (users) => {
	users.forEach((v) => {
		users(v);
	});
	return users;
};

module.exports = {
	user,
	users
}