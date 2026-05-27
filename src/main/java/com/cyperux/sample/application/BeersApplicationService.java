package com.cyperux.sample.application;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import com.cyperux.sample.domain.BeerId;
import com.cyperux.sample.domain.beer.Beer;
import com.cyperux.sample.domain.beer.BeerToCreate;
import com.cyperux.sample.domain.beer.Beers;
import com.cyperux.sample.domain.beer.BeersCreator;
import com.cyperux.sample.domain.beer.BeersRemover;
import com.cyperux.sample.domain.beer.BeersRepository;

@Service
public class BeersApplicationService {

  private final BeersRepository beers;
  private final BeersCreator creator;
  private final BeersRemover remover;

  public BeersApplicationService(BeersRepository beers) {
    this.beers = beers;

    creator = new BeersCreator(beers);
    remover = new BeersRemover(beers);
  }

  @PreAuthorize("can('create', #beerToCreate)")
  public Beer create(BeerToCreate beerToCreate) {
    return creator.create(beerToCreate);
  }

  @PreAuthorize("can('remove', #beer)")
  public void remove(BeerId beer) {
    remover.remove(beer);
  }

  public Beers catalog() {
    return beers.catalog();
  }
}
