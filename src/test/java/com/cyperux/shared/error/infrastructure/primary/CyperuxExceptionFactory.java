package com.cyperux.shared.error.infrastructure.primary;

import com.cyperux.shared.error.domain.CyperuxException;

public final class CyperuxExceptionFactory {

  private CyperuxExceptionFactory() {}

  public static CyperuxException buildEmptyException() {
    return CyperuxException.builder(null).build();
  }
}
