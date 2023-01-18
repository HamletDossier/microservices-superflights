import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { jwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PassengerMSG } from 'src/common/constants';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { PassengerDTO } from './dto/passenger.dto ';

@ApiTags('passenger')
@UseGuards(jwtAuthGuard)
@Controller('api/v2/passenger')
export class PassengerController {
	constructor(private readonly clientProxy: ClientProxySuperFlights){}
	private _ClientProxyPassenger = this.clientProxy.ClientProxyPassengers();

	@Post()
	create(@Body() passengerDTO:PassengerDTO):Observable<IPassenger>{
		return this._ClientProxyPassenger.send(PassengerMSG.CREATE,passengerDTO);
	}

	@Get()
	findAll():Observable<IPassenger[]>{
		return this._ClientProxyPassenger.send(PassengerMSG.FIND_ALL,'');
	}

	@Get(':id')
	findOne(@Param('id') id:string):Observable<IPassenger>{
		return this._ClientProxyPassenger.send(PassengerMSG.FIND_ONE,id);
	}

	@Put(':id')
	update(@Param('id') id:string, @Body() passengerDTO:PassengerDTO ):Observable<IPassenger>{
		return this._ClientProxyPassenger.send(PassengerMSG.UPDATE,{id,passengerDTO});
	}

	@Delete(':id')
	delete(@Param('id') id:string){
		return this._ClientProxyPassenger.send(PassengerMSG.DELETE,id);
	}

}
