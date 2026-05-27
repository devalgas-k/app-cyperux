package com.cyperux.sample.infrastructure.primary.beer;

import static org.assertj.core.api.Assertions.*;
import static com.cyperux.BeanValidationAssertions.*;

import org.junit.jupiter.api.Test;
import com.cyperux.JsonHelper;
import com.cyperux.UnitTest;
import com.cyperux.sample.domain.beer.BeersFixture;

@UnitTest
class RestBeerToCreateTest {

  @Test
  void shouldDeserializeFromJson() {
    assertThat(JsonHelper.readFromJson(json(), RestBeerToCreate.class).toDomain())
      .usingRecursiveComparison()
      .isEqualTo(BeersFixture.beerToCreate());
  }

  private String json() {
    return """
    {
      "name": "Cloak of feathers",
      "unitPrice": 8.53
    }
    """;
  }

  @Test
  void shouldNotValidateEmptyBean() {
    assertThatBean(new RestBeerToCreate(null, null)).hasInvalidProperty("name").and().hasInvalidProperty("unitPrice");
  }
}
