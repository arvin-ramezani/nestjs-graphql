import { PetsModule } from '../pets/pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Module, forwardRef } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersResolver } from './owners.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Owner]),
    // PetsModule
    forwardRef(() => PetsModule),
  ],
  providers: [OwnersResolver, OwnersService],
  exports: [OwnersService],
})
export class OwnersModule {}
