package com.cyperux.sample.domain.beer;

import static org.assertj.core.api.Assertions.*;
import static com.cyperux.sample.domain.BeersIdentityFixture.*;
import static com.cyperux.sample.domain.beer.BeersFixture.*;

import java.util.List;
import org.junit.jupiter.api.Test;
import com.cyperux.UnitTest;

@UnitTest
class BeersTest {

  @Test
  void shouldSortBeersByNames() {
    Beer anteMeridiem = Beer.builder()
      .id(anteMeridiemId())
      .name(new BeerName("Ante Meridiem"))
      .unitPrice(anteMeridiemUnitPrice())
      .sellingState(BeerSellingState.SOLD)
      .build();

    var beers = new Beers(List.of(beer(), anteMeridiem));

    assertThat(beers.get()).usingRecursiveFieldByFieldElementComparator().containsExactly(anteMeridiem, beer());
  }
}
