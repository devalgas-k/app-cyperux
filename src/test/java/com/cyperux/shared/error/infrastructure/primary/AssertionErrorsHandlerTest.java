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
import com.cyperux.shared.error.domain.AssertionErrorType;
import com.cyperux.shared.error.domain.AssertionException;
import com.cyperux.shared.error_generator.domain.NullElementInCollectionExceptionFactory;

@UnitTest
@ExtendWith(LogsSpyExtension.class)
class AssertionErrorsHandlerTest {

  private static final AssertionErrorsHandler handler = new AssertionErrorsHandler(mock(MessageSource.class));

  @Logs
  private LogsSpy logs;

  @Test
  void shouldLogPrimaryAssertionExceptionInInfo() {
    handler.handleAssertionError(new DefaultAssertionException());

    logs.shouldHave(Level.INFO, "Oops");
  }

  @Test
  void shouldLogDomainAssertionExceptionInError() {
    handler.handleAssertionError(NullElementInCollectionExceptionFactory.nullElementInCollection());

    logs.shouldHave(Level.ERROR, "a null element");
  }

  private static final class DefaultAssertionException extends AssertionException {

    private DefaultAssertionException() {
      super("field", "Oops");
    }

    @Override
    public AssertionErrorType type() {
      return AssertionErrorType.MISSING_MANDATORY_VALUE;
    }
  }
}
