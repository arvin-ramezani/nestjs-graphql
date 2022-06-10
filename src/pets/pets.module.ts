import { OwnersModule } from '../owners/owners.module';
import { Pet } from './pet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { PetsResolver } from './pets.resolver';
import { PetsService } from './pets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pet]),
    // OwnersModule
    forwardRef(() => OwnersModule),
  ],
  providers: [PetsResolver, PetsService],
  exports: [PetsService],
})
export class PetsModule {}
