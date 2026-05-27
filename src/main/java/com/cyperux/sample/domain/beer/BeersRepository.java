package com.cyperux.sample.domain.beer;

import java.util.Optional;
import com.cyperux.sample.domain.BeerId;

public interface BeersRepository {
  void save(Beer beer);

  Beers catalog();

  Optional<Beer> get(BeerId beer);
}
