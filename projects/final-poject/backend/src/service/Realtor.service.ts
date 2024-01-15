import bcrypt from 'bcrypt';
import { ILogin } from '../interface/auth';
import { BadRequestError } from '../error';
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from '../constant';
import jwt from 'jsonwebtoken';
import config from '../config';
import { IJwtPayload } from '../interface/jwt';
import Realtor from '../model/Realtor.model';
import {
  GetAllRealtorsQuery,
  GetSearchRealtorsQuery,
  IRealtorSignup,
} from '../interface/realtor';
import { buildMeta, getPaginationOptions } from '../util/pagination';
import { Like } from 'typeorm';

const SALT_ROUNDS = 10;

class RealtorService {
  private static async findByEmail(email: string): Promise<Realtor | null> {
    try {
      const user = await Realtor.findOne({ where: { email } });
      return user || null;
    } catch (error) {
      throw new BadRequestError(error + '');
    }
  }

  private static async findByUsername(
    username: string,
  ): Promise<Realtor | null> {
    try {
      const user = await Realtor.findOne({ where: { username } });
      return user || null;
    } catch (error) {
      throw new BadRequestError(error + '');
    }
  }

  private static async validateSignup(body: IRealtorSignup) {
    const { username, email, password, confirmPassword } = body;

    // Check if email or username already exists
    const existingUserByEmail = await RealtorService.findByEmail(email);
    const existingUserByUsername =
      await RealtorService.findByUsername(username);

    if (existingUserByEmail) {
      throw new BadRequestError('User with this email already exists');
    }
    if (existingUserByUsername) {
      throw new BadRequestError('User with this username already exists');
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      throw new BadRequestError('Password and confirm password do not match');
    }
  }

  static async signup(body: IRealtorSignup) {
    try {
      await RealtorService.validateSignup(body);

      const hashedPassword = await bcrypt.hash(body.password, SALT_ROUNDS);

      // Create Photo

      // Create user and pass photo created
      const realtor = Realtor.create({
        ...body,
        password: hashedPassword,
      });

      // Save photo
      await realtor.save();

      return {
        data: realtor,
        message: 'Signed up successfully!',
      };
    } catch (error) {
      throw new BadRequestError(error + '');
    }
  }

  static async login(body: ILogin) {
    // Check if email or username already exists
    const user = await RealtorService.findByEmail(body.email);

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

  private static generateAccessToken(realtor: Realtor) {
    const { accessTokenSecret } = config.jwt;
    const jwtPayload: IJwtPayload = {
      id: realtor.id,
      email: realtor.email,
      username: realtor.username,
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
    const realtor = await RealtorService.findByEmail(decoded.email);

    if (!realtor) {
      throw new BadRequestError('User not found');
    }

    const accessToken = RealtorService.generateAccessToken(realtor);

    return accessToken;
  }

  static async getAll(query: GetAllRealtorsQuery) {
    const { page, size } = query;

    // Calculate skip and limit based on page and size
    const { limit, offset } = getPaginationOptions({ page, size });

    try {
      // Query the database with skip and limit
      const realtors = await Realtor.createQueryBuilder('realtor')
        .offset(offset)
        .limit(limit)
        .getMany();
      const total = await Realtor.count();

      const meta = buildMeta(total, size, page);

      return {
        data: realtors,
        meta,
      };
    } catch (error) {
      throw new BadRequestError(error + '');
    }
  }

  static async getById(realtorId: number) {
    try {
      const realtor = await Realtor.findOneBy({ id: realtorId });
      if (!realtor) {
        throw new BadRequestError('Realtor not found');
      }
      return realtor;
    } catch (error) {
      throw new BadRequestError('Error fetching realtor: ' + error);
    }
  }

  static async search(query: GetSearchRealtorsQuery) {
    const { page, size, username } = query;

    // Calculate skip and limit based on page and size
    const { limit, offset } = getPaginationOptions({ page, size });

    try {
      // Start building the query with offset and limit

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const whereClause: any = {};

      if (username !== '') {
        whereClause.username = Like(`%${username}%`);
      }

      const [realtors, total] = await Realtor.findAndCount({
        where: whereClause,
        take: limit,
        skip: offset,
      });

      // Build meta information for pagination
      const meta = buildMeta(total, size, page);

      return {
        data: realtors,
        meta,
      };
    } catch (error) {
      throw new BadRequestError(error + '');
    }
  }

  static async getUserInfoFromToken(accessToken: string) {
    try {
      const decoded = jwt.verify(
        accessToken,
        config.jwt.accessTokenSecret,
      ) as IJwtPayload;

      // Check if the user exists
      const user = await RealtorService.findByEmail(decoded.email);

      if (!user) {
        throw new BadRequestError('User not found');
      }

      return {
        id: user.id,
        email: user.email,
        username: user.username,
        // Add any other user information you want to include
      };
    } catch (error) {
      throw new BadRequestError('Invalid access token');
    }
  }
}

export default RealtorService;
