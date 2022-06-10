import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindPetsByOwner {
  @Field({ nullable: true })
  id?: number;
}
