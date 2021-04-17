const Joi = require('joi');

const users = [
	{
		id: 1,
		name: 'Mango',
		email: 'mango@email.com',
		password: 'qwerty1'
	},
	{
		id: 2,
		name: 'Poly',
		email: 'poly@email.com',
		password: 'qwerty2'
	},
	{
		id: 3,
		name: 'Ajax',
		email: 'ajax@email.com',
		password: 'qwerty3'
	},
];

class userController {
  getUsers(req, res, next) {
    return res.json(users);
  }

  createUser(req, res, next) {
	const newUser = {
		...req.body,
		id: users.length + 1
	}

	users.push(newUser );

	console.log("users -->", users);
	return res.send();
  };

  validateCreateUser(req, res, next) {
	const schema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().required(),
		password: Joi.string().required()
    });

	const result = schema.validate(req.body);

	if(result.error) return res.status(400).send(result.error);

	next();
  };

  updateUser(req, res, next) {
	  const id = parseInt(req.params.id);
	  const targetIndex = users.findIndex(user => user.id === id);

	  console.log(id);

	  if (targetIndex === -1) return res.status(404).send("User does not exist");

	  users[targetIndex] = {
      ...users[targetIndex],
      ...req.body,
    };

	  console.log(users);
  }

  validateUpdateUser(req, res, next) {
	const schema = Joi.object({
		name: Joi.string(),
		email: Joi.string()
	});

	const result = schema.validate(req.body);

    if (result.error) return res.status(400).send(result.error);

    next();
  }
}

module.exports = new userController();
