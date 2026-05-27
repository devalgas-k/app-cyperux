package com.cyperux.shared.kipe.application;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import ch.qos.logback.classic.Level;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.security.core.Authentication;
import com.cyperux.Logs;
import com.cyperux.LogsSpy;
import com.cyperux.LogsSpyExtension;
import com.cyperux.UnitTest;

@UnitTest
@ExtendWith(LogsSpyExtension.class)
class ObjectAccessCheckerTest {

  private static final ObjectAccessChecker checker = new ObjectAccessChecker();

  @Logs
  private LogsSpy logs;

  @Test
  void shouldNotAuthorizeActionsOnNullElement() {
    assertThat(checker.can(new NullElementAccessContext<>(mock(Authentication.class), "dummy-action"))).isFalse();
    logs.shouldHave(Level.WARN, "dummy-action").shouldHave(Level.WARN, "access checker found").shouldHave(Level.WARN, "unknown");
  }

  @Test
  void shouldNotAuthorizeActionsOnElement() {
    assertThat(checker.can(new ElementAccessContext<>(mock(Authentication.class), "dummy-action", "element"))).isFalse();
    logs.shouldHave(Level.WARN, "dummy-action").shouldHave(Level.WARN, "access checker found").shouldHave(Level.WARN, "String");
  }
}
