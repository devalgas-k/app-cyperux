package com.cyperux.sample.application;

import org.springframework.stereotype.Component;
import com.cyperux.sample.domain.BeerId;
import com.cyperux.shared.kipe.application.AccessChecker;
import com.cyperux.shared.kipe.application.AccessContext;
import com.cyperux.shared.kipe.application.CyperuxAuthorizations;

@Component
class BeerIdAccessChecker implements AccessChecker<BeerId> {

  private final CyperuxAuthorizations authorizations;

  public BeerIdAccessChecker(CyperuxAuthorizations authorizations) {
    this.authorizations = authorizations;
  }

  @Override
  public boolean can(AccessContext<BeerId> access) {
    return authorizations.allAuthorized(access.authentication(), access.action(), BeerResource.BEERS);
  }
}
