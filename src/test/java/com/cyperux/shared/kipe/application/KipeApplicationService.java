package com.cyperux.shared.kipe.application;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import com.cyperux.shared.kipe.domain.KipeDummy;

@Service
public class KipeApplicationService {

  @PreAuthorize("can('update', #dummy)")
  public void update(KipeDummy dummy) {
    // Nothing to do
  }
}
