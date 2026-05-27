package com.cyperux.shared.pagination.infrastructure.primary;

import static org.assertj.core.api.Assertions.*;
import static com.cyperux.BeanValidationAssertions.*;

import org.junit.jupiter.api.Test;
import com.cyperux.UnitTest;
import com.cyperux.shared.pagination.domain.CyperuxPageable;

@UnitTest
class RestCyperuxPageableTest {

  @Test
  void shouldConvertToDomain() {
    CyperuxPageable pageable = pageable().toPageable();

    assertThat(pageable.page()).isEqualTo(1);
    assertThat(pageable.pageSize()).isEqualTo(15);
  }

  @Test
  void shouldNotValidateWithPageUnderZero() {
    RestCyperuxPageable pageable = pageable();
    pageable.setPage(-1);

    assertThatBean(pageable).hasInvalidProperty("page");
  }

  @Test
  void shouldNotValidateWithSizeAtZero() {
    RestCyperuxPageable pageable = pageable();
    pageable.setPageSize(0);

    assertThatBean(pageable).hasInvalidProperty("pageSize").withParameter("value", 1L);
  }

  @Test
  void shouldNotValidateWithPageSizeOverHundred() {
    RestCyperuxPageable pageable = pageable();
    pageable.setPageSize(101);

    assertThatBean(pageable).hasInvalidProperty("pageSize");
  }

  private RestCyperuxPageable pageable() {
    return new RestCyperuxPageable(1, 15);
  }
}
