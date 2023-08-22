import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => Boolean)
  healthCheck() {
    return true;
  }
}
