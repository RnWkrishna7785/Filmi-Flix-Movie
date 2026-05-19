import jwt from 'jsonwebtoken';

class TokenService {
  generate(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
  }

  verify(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return null;
    }
  }
}

export default new TokenService();
