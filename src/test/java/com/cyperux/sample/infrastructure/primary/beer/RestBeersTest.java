package com.cyperux.sample.infrastructure.primary.beer;

import static org.assertj.core.api.Assertions.*;

import java.util.List;
import org.junit.jupiter.api.Test;
import com.cyperux.JsonHelper;
import com.cyperux.UnitTest;
import com.cyperux.sample.domain.beer.Beers;
import com.cyperux.sample.domain.beer.BeersFixture;

@UnitTest
class RestBeersTest {

  @Test
  void shouldSerializeToJson() {
    assertThat(JsonHelper.writeAsString(RestBeers.from(new Beers(List.of(BeersFixture.beer()))))).isEqualTo(json());
  }

  private String json() {
    return "{\"beers\":[" + RestBeerTest.json() + "]}";
  }
}
