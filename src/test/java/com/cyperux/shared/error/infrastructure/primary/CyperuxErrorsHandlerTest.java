package com.cyperux.shared.error.infrastructure.primary;

import static org.mockito.Mockito.*;

import ch.qos.logback.classic.Level;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.context.MessageSource;
import com.cyperux.Logs;
import com.cyperux.LogsSpy;
import com.cyperux.LogsSpyExtension;
import com.cyperux.UnitTest;
import com.cyperux.shared.error.domain.CyperuxException;
import com.cyperux.shared.error.domain.StandardErrorKey;

@UnitTest
@ExtendWith(LogsSpyExtension.class)
class CyperuxErrorsHandlerTest {

  private static final CyperuxErrorsHandler handler = new CyperuxErrorsHandler(mock(MessageSource.class));

  @Logs
  private LogsSpy logs;

  @Test
  void shouldLogServerErrorAsError() {
    handler.handleCyperuxException(CyperuxException.internalServerError(StandardErrorKey.INTERNAL_SERVER_ERROR).message("Oops").build());

    logs.shouldHave(Level.ERROR, "Oops");
  }

  @Test
  void shouldLogClientErrorAsInfo() {
    handler.handleCyperuxException(CyperuxException.badRequest(StandardErrorKey.BAD_REQUEST).message("Oops").build());

    logs.shouldHave(Level.INFO, "Oops");
  }
}
