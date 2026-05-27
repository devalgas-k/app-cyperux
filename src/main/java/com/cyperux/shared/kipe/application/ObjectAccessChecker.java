package com.cyperux.shared.kipe.application;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import com.cyperux.shared.generation.domain.ExcludeFromGeneratedCodeCoverage;

@Component
class ObjectAccessChecker implements AccessChecker<Object> {

  private static final Logger log = LoggerFactory.getLogger(ObjectAccessChecker.class);

  @Override
  @ExcludeFromGeneratedCodeCoverage(reason = "Ignored log conditional")
  public boolean can(AccessContext<Object> access) {
    if (log.isWarnEnabled()) {
      log.warn("No access checker found for {}, using default for action {}", getElementClass(access.element()), access.action());
    }

    return false;
  }

  private String getElementClass(Object item) {
    if (item == null) {
      return "unknown";
    }

    return item.getClass().getName();
  }
}
