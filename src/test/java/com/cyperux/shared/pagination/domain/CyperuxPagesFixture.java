package com.cyperux.shared.pagination.domain;

import java.util.List;
import com.cyperux.shared.pagination.domain.CyperuxPage.CyperuxPageBuilder;

public final class CyperuxPagesFixture {

  private CyperuxPagesFixture() {}

  public static CyperuxPage<String> page() {
    return pageBuilder().build();
  }

  public static CyperuxPageBuilder<String> pageBuilder() {
    return CyperuxPage.builder(List.of("test")).currentPage(2).pageSize(10).totalElementsCount(21);
  }
}
