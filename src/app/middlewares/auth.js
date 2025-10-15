import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

function authMiddleware(request, response, next) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ error: 'Token not provided' });
  }

  const token = authToken.split(' ')[1]; // pega a segunda parte do "Bearer TOKEN"

  try {
    const decoded = jwt.verify(token, authConfig.secret);

    request.userId = decoded.id;
    request.userName = decoded.name;

    return next();
  } catch (err) {
    console.error('JWT error:', err.message);
    return response.status(401).json({ error: 'Token is invalid' });
  }
}

export default authMiddleware;
