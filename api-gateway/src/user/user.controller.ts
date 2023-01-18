import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { jwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserMSG } from 'src/common/constants';
import { IUser } from 'src/common/interfaces/user.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { UserDTO } from './dto/user.dto';

@ApiTags('users')
@UseGuards(jwtAuthGuard)
@Controller('api/v2/user')
export class UserController {
	constructor(private readonly clientProxy:ClientProxySuperFlights){}
	private _ClientProxyUser = this.clientProxy.ClientProxyUsers();

	@Post()
	create(@Body() userDTO:UserDTO):Observable<IUser>{
		return this._ClientProxyUser.send(UserMSG.CREATE, userDTO);
	}

	@Get()
	findAll():Observable<IUser[]>{
		return this._ClientProxyUser.send(UserMSG.FIND_ALL, '');
	}

	@Get(':id')
	findOne(@Param('id') id:string):Observable<IUser>{
		return this._ClientProxyUser.send(UserMSG.FIND_ONE,id);
	}

	@Put(':id')
	update(@Param('id') id:string, @Body() userDTO:UserDTO):Observable<IUser>{
		return this._ClientProxyUser.send(UserMSG.UPDATE,{id,userDTO});
	}

	@Delete(':id')
	delete(@Param('id') id:string):Observable<any>{
		return this._ClientProxyUser.send(UserMSG.DELETE,id);
	}
}
