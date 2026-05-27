package com.cyperux.shared.error_generator.infrastructure.primary;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cyperux.shared.error.domain.CyperuxException;
import com.cyperux.shared.error.domain.StandardErrorKey;

@RestController
@RequestMapping("/api/errors")
class CyperuxErrorsResource {

  @GetMapping("bad-request")
  void getBadRequest() {
    throw CyperuxException.badRequest(StandardErrorKey.BAD_REQUEST).addParameter("code", "400").build();
  }
}
