package com.cyperux.shared.pagination.infrastructure.primary;

import static org.assertj.core.api.Assertions.*;
import static com.cyperux.shared.pagination.domain.CyperuxPagesFixture.*;

import java.util.function.Function;
import org.junit.jupiter.api.Test;
import com.cyperux.JsonHelper;
import com.cyperux.UnitTest;
import com.cyperux.shared.error.domain.MissingMandatoryValueException;

@UnitTest
class RestCyperuxPageTest {

  @Test
  void shouldNotConvertWithoutSourcePage() {
    assertThatThrownBy(() -> RestCyperuxPage.from(null, source -> "test")).isExactlyInstanceOf(
      MissingMandatoryValueException.class
    );
  }

  @Test
  void shouldNotConvertWithoutMappingFunction() {
    assertThatThrownBy(() -> RestCyperuxPage.from(page(), null)).isExactlyInstanceOf(
      MissingMandatoryValueException.class
    );
  }

  @Test
  void shouldMapFromDomainPage() {
    RestCyperuxPage<String> page = RestCyperuxPage.from(page(), Function.identity());

    assertThat(page.getContent()).containsExactly("test");
    assertThat(page.getCurrentPage()).isEqualTo(2);
    assertThat(page.getPageSize()).isEqualTo(10);
    assertThat(page.getTotalElementsCount()).isEqualTo(21);
    assertThat(page.getPagesCount()).isEqualTo(3);
  }

  @Test
  void shouldGetPageCountForPageLimit() {
    RestCyperuxPage<String> page = RestCyperuxPage.from(
      pageBuilder().totalElementsCount(3).pageSize(3).build(),
      Function.identity()
    );

    assertThat(page.getPagesCount()).isEqualTo(1);
  }

  @Test
  void shouldSerializeToJson() {
    assertThat(JsonHelper.writeAsString(RestCyperuxPage.from(page(), Function.identity()))).isEqualTo(json());
  }

  private String json() {
    return """
    {"content":["test"],\
    "currentPage":2,\
    "hasNext":false,\
    "hasPrevious":true,\
    "pageSize":10,\
    "pagesCount":3,\
    "totalElementsCount":21\
    }\
    """;
  }
}
