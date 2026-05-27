package com.cyperux.shared.error.domain;

import static org.assertj.core.api.Assertions.*;

import java.util.Map;
import org.junit.jupiter.api.Test;
import com.cyperux.UnitTest;
import com.cyperux.shared.error.infrastructure.primary.CyperuxExceptionFactory;

@UnitTest
class CyperuxExceptionTest {

  @Test
  void shouldGetMinimalCyperuxExceptionFromDomain() {
    CyperuxException exception = CyperuxException.builder(null).build();

    assertThat(exception.key()).isEqualTo(StandardErrorKey.INTERNAL_SERVER_ERROR);
    assertThat(exception.status()).isEqualTo(ErrorStatus.INTERNAL_SERVER_ERROR);
    assertThat(exception.getMessage()).isEqualTo("An error occurred");
    assertThat(exception.getCause()).isNull();
    assertThat(exception.parameters()).isEmpty();
  }

  @Test
  void shouldGetMinimalCyperuxExceptionFromPrimary() {
    CyperuxException exception = CyperuxExceptionFactory.buildEmptyException();

    assertThat(exception.key()).isEqualTo(StandardErrorKey.INTERNAL_SERVER_ERROR);
    assertThat(exception.status()).isEqualTo(ErrorStatus.BAD_REQUEST);
    assertThat(exception.getMessage()).isEqualTo("An error occurred");
    assertThat(exception.getCause()).isNull();
    assertThat(exception.parameters()).isEmpty();
  }

  @Test
  void shouldGetFullCyperuxException() {
    var cause = new RuntimeException();
    CyperuxException exception = CyperuxException.builder(StandardErrorKey.BAD_REQUEST)
      .message("This is an error")
      .cause(cause)
      .addParameter("parameter", "value")
      .addParameters(Map.of("key", "value"))
      .status(ErrorStatus.BAD_REQUEST)
      .build();

    assertThat(exception.key()).isEqualTo(StandardErrorKey.BAD_REQUEST);
    assertThat(exception.status()).isEqualTo(ErrorStatus.BAD_REQUEST);
    assertThat(exception.getMessage()).isEqualTo("This is an error");
    assertThat(exception.getCause()).isEqualTo(cause);
    assertThat(exception.parameters()).containsOnly(entry("parameter", "value"), entry("key", "value"));
  }

  @Test
  void shouldGetTechnicalErrorExceptionFromMessage() {
    CyperuxException exception = CyperuxException.technicalError("This is a problem");

    assertThat(exception.getMessage()).isEqualTo("This is a problem");
    assertThat(exception.key()).isEqualTo(StandardErrorKey.INTERNAL_SERVER_ERROR);
    assertThat(exception.status()).isEqualTo(ErrorStatus.INTERNAL_SERVER_ERROR);
  }

  @Test
  void shouldGetTechnicalErrorException() {
    var cause = new RuntimeException();
    CyperuxException exception = CyperuxException.technicalError("This is a problem", cause);

    assertThat(exception.getMessage()).isEqualTo("This is a problem");
    assertThat(exception.key()).isEqualTo(StandardErrorKey.INTERNAL_SERVER_ERROR);
    assertThat(exception.getCause()).isEqualTo(cause);
    assertThat(exception.status()).isEqualTo(ErrorStatus.INTERNAL_SERVER_ERROR);
  }

  @Test
  void shouldGetInternalServerErrorShortcut() {
    CyperuxException exception = CyperuxException.internalServerError(
      StandardErrorKey.INTERNAL_SERVER_ERROR
    ).build();

    assertThat(exception.status()).isEqualTo(ErrorStatus.INTERNAL_SERVER_ERROR);
  }

  @Test
  void shouldGetBadRequestShortcut() {
    CyperuxException exception = CyperuxException.badRequest(StandardErrorKey.BAD_REQUEST).build();

    assertThat(exception.status()).isEqualTo(ErrorStatus.BAD_REQUEST);
  }
}
