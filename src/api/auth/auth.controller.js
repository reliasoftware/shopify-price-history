const jwt = require('jsonwebtoken');
const { secret, expire } = require('../../config').jwt;
const { User } = require('../../models');

exports.login = async ctx => {
  const { email, password } = ctx.request.body;
  ctx.assert(email, 400, 'Email is required');
  const user = await User.findOne({
    where: { email },
  });
  ctx.assert(user, 401, "The requested user doesn't exist");
  const valid = await user.verifyPassword(password);
  ctx.assert(valid, 401, 'Email or password is incorrect.');
  const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: expire });
  ctx.status = 200;
  const result = user.toJSON();
  delete result['password'];
  ctx.body = { success: true, token, user: result };
};
