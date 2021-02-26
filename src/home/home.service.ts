import {Injectable} from '@nestjs/common';

@Injectable()
export class HomeService {
    async getWelcome() {
        return 'Welcome to nestjs articles api'
    }
}