import { Pet } from '../pets/pet.entity';
import { Owner } from './entities/owner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Repository } from 'typeorm';
import { PetsService } from '../pets/pets.service';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
    @Inject(forwardRef(() => PetsService))
    private petsService: PetsService, // private readonly petsService: PetsService,
  ) {}

  create(createOwnerInput: CreateOwnerInput) {
    const newOwner = this.ownerRepository.create(createOwnerInput);
    return this.ownerRepository.save(newOwner);
  }

  findAll(): Promise<Owner[]> {
    return this.ownerRepository.find();
  }

  findOne(id: number): Promise<Owner> {
    return this.ownerRepository.findOneOrFail({ where: { id } });
  }

  ownerPets(id: number): Promise<Pet[]> {
    return this.petsService.findPetsByOwner(id);
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
