package com.cyperux.sample.infrastructure.secondary;

import java.util.Optional;
import org.springframework.stereotype.Repository;
import com.cyperux.sample.domain.BeerId;
import com.cyperux.sample.domain.beer.Beer;
import com.cyperux.sample.domain.beer.BeerSellingState;
import com.cyperux.sample.domain.beer.Beers;
import com.cyperux.sample.domain.beer.BeersRepository;
import com.cyperux.shared.error.domain.Assert;

@Repository
class SpringDataBeersRepository implements BeersRepository {

  private final JpaBeersRepository beers;

  public SpringDataBeersRepository(JpaBeersRepository beers) {
    this.beers = beers;
  }

  @Override
  public void save(Beer beer) {
    Assert.notNull("beer", beer);

    beers.save(BeerEntity.from(beer));
  }

  @Override
  public Beers catalog() {
    return new Beers(beers.findBySellingState(BeerSellingState.SOLD).stream().map(BeerEntity::toDomain).toList());
  }

  @Override
  public Optional<Beer> get(BeerId beer) {
    Assert.notNull("beer", beer);

    return beers.findById(beer.get()).map(BeerEntity::toDomain);
  }
}
