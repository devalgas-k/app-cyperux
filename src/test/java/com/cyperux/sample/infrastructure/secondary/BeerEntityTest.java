package com.cyperux.sample.infrastructure.secondary;

import static org.assertj.core.api.Assertions.*;
import static com.cyperux.sample.domain.beer.BeersFixture.*;

import org.junit.jupiter.api.Test;
import com.cyperux.UnitTest;

@UnitTest
class BeerEntityTest {

  @Test
  void shouldConvertFromAndToDomain() {
    assertThat(BeerEntity.from(beer()).toDomain()).usingRecursiveComparison().isEqualTo(beer());
  }
}
