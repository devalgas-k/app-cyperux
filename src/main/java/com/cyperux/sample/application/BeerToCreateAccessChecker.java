package com.cyperux.sample.application;

import org.springframework.stereotype.Component;
import com.cyperux.sample.domain.beer.BeerToCreate;
import com.cyperux.shared.kipe.application.AccessChecker;
import com.cyperux.shared.kipe.application.AccessContext;
import com.cyperux.shared.kipe.application.CyperuxAuthorizations;

@Component
class BeerToCreateAccessChecker implements AccessChecker<BeerToCreate> {

  private final CyperuxAuthorizations authorizations;

  public BeerToCreateAccessChecker(CyperuxAuthorizations authorizations) {
    this.authorizations = authorizations;
  }

  @Override
  public boolean can(AccessContext<BeerToCreate> access) {
    return authorizations.allAuthorized(access.authentication(), access.action(), BeerResource.BEERS);
  }
}
