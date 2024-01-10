import bcrypt from 'bcrypt';
import { ILogin, ISignup, ISignupErrors } from '../interface/auth';
import { BadRequestError } from '../error';
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from '../constant';
import jwt from 'jsonwebtoken';
import config from '../config';
import { IJwtPayload } from '../interface/jwt';
import User from '../model/User.model';

const SALT_ROUNDS = 10;

class UserService {
  private static async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { email } });
      return user || null;
    } catch (error) {
      throw new BadRequestError(error + '');
    }
  }

  private static async findByUsername(username: string): Promise<User | null> {
    try {
      // const userRepository = UserService.getUserRepository();
      const user = await User.findOne({ where: { username } });
      return user || null;
    } catch (error) {
      throw new BadRequestError(error + '');
    }
  }

  private static async validateSignup(body: ISignup) {
    const errors: ISignupErrors = {
      email: [],
      username: [],
      password: [],
      confirmPassword: [],
    };

    const { username, email, password, confirmPassword } = body;

    // Check if email or username already exists
    const existingUserByEmail = await UserService.findByEmail(email);
    const existingUserByUsername = await UserService.findByUsername(username);

    if (existingUserByEmail) {
      errors.email.push('User with this email already exists');
    }
    if (existingUserByUsername) {
      errors.username.push('User with this username already exists');
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      errors.password.push('Password and confirm password do not match');
    }

    if (Object.values(errors).some((array) => array.length > 0)) {
      throw new BadRequestError(JSON.stringify(errors));
    }
  }

  static async signup(body: ISignup) {
    try {
      await UserService.validateSignup(body);

      const hashedPassword = await bcrypt.hash(body.password, SALT_ROUNDS);

      const user = User.create({ ...body, password: hashedPassword });
      await user.save();

      return {
        data: user,
        message: 'Signed up successfully!',
      };
    } catch (error) {
      throw new BadRequestError(error + '');
    }
  }

  static async login(body: ILogin) {
    // Check if email or username already exists
    const user = await UserService.findByEmail(body.email);

    if (!user) {
      throw new BadRequestError('User doesnt exist');
    }

    const passwordMatch = await bcrypt.compare(body.password, user.password);

    if (!passwordMatch) {
      throw new BadRequestError('Invalid Password');
    }

    const jwtPayload: IJwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    // We are good to go!
    const accessToken = jwt.sign(jwtPayload, config.jwt.accessTokenSecret!, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });

    const refreshToken = jwt.sign(jwtPayload, config.jwt.refreshTokenSecret!, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private static generateAccessToken(user: User) {
    const { accessTokenSecret } = config.jwt;
    const jwtPayload: IJwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const result = jwt.sign(jwtPayload, accessTokenSecret, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });
    return result;
  }

  static async refreshToken(refresh: string) {
    const { refreshTokenSecret } = config.jwt;
    const decoded = jwt.verify(refresh, refreshTokenSecret) as IJwtPayload;

    // Check if the user exists
    const user = await UserService.findByEmail(decoded.email);

    if (!user) {
      throw new BadRequestError('User not found');
    }

    const accessToken = UserService.generateAccessToken(user);

    return accessToken;
  }
}

export default UserService;
