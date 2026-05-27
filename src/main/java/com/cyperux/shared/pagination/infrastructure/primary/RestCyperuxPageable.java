package com.cyperux.shared.pagination.infrastructure.primary;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import com.cyperux.shared.generation.domain.ExcludeFromGeneratedCodeCoverage;
import com.cyperux.shared.pagination.domain.CyperuxPageable;

@Schema(name = "CyperuxPageable", description = "Pagination information")
public class RestCyperuxPageable {

  private int page;
  private int pageSize = 10;

  @ExcludeFromGeneratedCodeCoverage
  public RestCyperuxPageable() {}

  public RestCyperuxPageable(int page, int pageSize) {
    this.page = page;
    this.pageSize = pageSize;
  }

  @Min(value = 0)
  @Schema(description = "Page to display (starts at 0)", example = "0")
  public int getPage() {
    return page;
  }

  public void setPage(int page) {
    this.page = page;
  }

  @Min(value = 1)
  @Max(value = 100)
  @Schema(description = "Number of elements on each page", example = "10")
  public int getPageSize() {
    return pageSize;
  }

  public void setPageSize(int pageSize) {
    this.pageSize = pageSize;
  }

  public CyperuxPageable toPageable() {
    return new CyperuxPageable(page, pageSize);
  }
}
