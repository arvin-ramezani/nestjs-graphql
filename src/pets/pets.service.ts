import { Owner } from '../owners/entities/owner.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnersService } from '../owners/owners.service';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private readonly petsRepository: Repository<Pet>,
    // private readonly ownersService: OwnersService,
    @Inject(forwardRef(() => OwnersService))
    private ownersService: OwnersService,
  ) {}

  async createPet(createPetInput: CreatePetInput) {
    const newPet = this.petsRepository.create(createPetInput);

    return this.petsRepository.save(newPet);
  }

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find();
  }

  async findOne(id: number): Promise<Pet> {
    return this.petsRepository.findOneOrFail({ where: { id } });
  }

  async getOwner(id: number): Promise<Owner> {
    return this.ownersService.findOne(id);
  }

  async findPetsByOwner(id: number): Promise<Pet[]> {
    return this.petsRepository.find({ where: { ownerId: id } });
  }
}
