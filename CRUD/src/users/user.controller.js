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
  get createUser() {
    return this._createUser.bind(this);
  }

  get updateUser() {
    return this._updateUser.bind(this);
  }

  get deleteUser() {
    return this._deleteUser.bind(this);
  }

  /*
   * --> READ
   */

  getUsers(req, res, next) {
    return res.json(users);
  }

  /*
   * --> CREATE
   */

  validateCreateUser(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const result = schema.validate(req.body);

    if (result.error) {
      res.status(400).send(result.error);
      return;
    }

    next();
  }

  _createUser(req, res, next) {
    const newUser = {
      ...req.body,
      id: users.length + 1,
    };

    users.push(newUser);

    console.log("users -->", users);
    return res.send();
  }

  /*
   * UPDATE
   */

  validateUpdateUser(req, res, next) {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
    });

    const result = schema.validate(req.body);

    if (result.error) {
      res.status(400).send(result.error);
      return;
    }

    next();
  }

  _updateUser(req, res, next) {
	try {
		const targetIndex = this.findUserById(res, req.params.id);
		if (targetIndex === undefined) return;

		users[targetIndex] = {
		...users[targetIndex],
		...req.body,
		};

		return status(200).send();
	} catch (err) {
		next(err);
	}
  }

  /*
   * --> DELETE
   */

  _deleteUser(req, res, next) {
    const targetIndex = this.findUserById(res, req.params.id);

    if (targetIndex === undefined) return;

	users.splice(targetIndex, 1);

	return res.status(200).send(users);
  }

  // find user
  findUserById(res, userID) {
    const id = parseInt(userID);
    const targetIndex = users.findIndex((user) => user.id === id);

    if (targetIndex === -1) {
      res.status(404).send("User does not exist");
      return;
    }

    return targetIndex;
  }
}

module.exports = new userController();
