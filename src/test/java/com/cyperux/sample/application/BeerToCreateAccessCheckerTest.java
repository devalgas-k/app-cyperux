package com.cyperux.sample.application;

import static org.assertj.core.api.Assertions.*;
import static com.cyperux.sample.domain.beer.BeersFixture.*;
import static com.cyperux.shared.kipe.application.TestAuthentications.*;

import java.util.List;
import org.junit.jupiter.api.Test;
import com.cyperux.UnitTest;
import com.cyperux.shared.kipe.application.AccessContext;
import com.cyperux.shared.kipe.application.CyperuxAuthorizations;

@UnitTest
class BeerToCreateAccessCheckerTest {

  private static final BeerToCreateAccessChecker checker = new BeerToCreateAccessChecker(
    new CyperuxAuthorizations(List.of(new BeersAccessesConfiguration().beersAccesses()))
  );

  @Test
  void shouldNotAuthorizedUnauthorizedAction() {
    assertThat(checker.can(AccessContext.of(admin(), "unauthorized", beerToCreate()))).isFalse();
  }

  @Test
  void shouldAuthorizedAuthorizedAction() {
    assertThat(checker.can(AccessContext.of(admin(), "create", beerToCreate()))).isTrue();
  }
}
