import { HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';
@Injectable()
export class UserService {

	//* Add Model user
	constructor(@InjectModel(USER.name) private readonly model:Model<IUser>){}

	//* Method hash passoword
	async hashPassword(password:string):Promise<string>{
		const salt = await bcrypt.genSalt(10);
		return await bcrypt.hash(password,salt); 
	}

	//* Method add new user to the user model
	async create(userDTO:UserDTO): Promise<IUser>{
		const hash = await this.hashPassword(userDTO.password);
		const newUSER = new this.model({...userDTO,password:hash});
		return await newUSER.save();
	}

	//* Method send all users
	async findAll(): Promise<IUser[]>{
		return await this.model.find();
	}

	//* Method send a user
	async findOne(id:string): Promise<IUser>{
		return await this.model.findById(id);
	}

	//* Method update a user by ID
	async update(id:string, userDTO:UserDTO): Promise<IUser>{
		const hash = await this.hashPassword(userDTO.password);
		const user = {...userDTO, password:hash}
		return await this.model.findByIdAndUpdate(id, user, { new: true});
	}

	//* Method delete a user by ID
	async delete(id:string){
		await this.model.findByIdAndDelete(id);
		return {status: HttpStatus.OK, msg:'Deleted'}
	}

	//* Method find a user by Username
	async findByUsername(username:string): Promise<IUser>{
		return await this.model.findOne({username});
	}

	//* Method compararison the password
	//* Send password || user.password

	async checkPassword(password:string,passwordDB:string):Promise<boolean>{
		return await bcrypt.compare(password,passwordDB);
	}
	
}
